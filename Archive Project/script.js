document.addEventListener("DOMContentLoaded", function() {
    const arenaContent = document.getElementById('arenaContent');
    const lightboxContainer = document.getElementById('lightboxContainer');
    const lightboxImg = document.getElementById('lightboxImg');
    const toggleLayoutBtn = document.getElementById('toggleLayoutBtn');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const classInput = document.getElementById('classInput');
    const searchBtn = document.getElementById('searchBtn');

    let scattered = false;
    let scale = 1;
    let mapOffset = { x: 0, y: 0 };
    let dragStart = { x: 0, y: 0 };
    let dragging = false;
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    function setScale(newScale, resetPosition) {
        const menuWidthRem = 12.5;
        const menuWidthPx = menuWidthRem * rem;

        const mapWidthPx = window.innerWidth - menuWidthPx;
        const mapHeightPx = window.innerHeight;

        const viewportCenterX = menuWidthPx + mapWidthPx / 2;
        const viewportCenterY = mapHeightPx / 2;

        const arenaRect = arenaContent.getBoundingClientRect();

        const centerXInArena = (viewportCenterX - arenaRect.left) / scale;
        const centerYInArena = (viewportCenterY - arenaRect.top) / scale;

        if (resetPosition === true) {
            mapOffset = { x: 0, y: 0 };
        } else {
            mapOffset.x -= (centerXInArena * (newScale - scale));
            mapOffset.y -= (centerYInArena * (newScale - scale));
        }

        scale = newScale;

        arenaContent.style.transformOrigin = "top left";
        arenaContent.style.transform = `translate(${mapOffset.x / rem}rem, ${mapOffset.y / rem}rem) scale(${scale})`;
    }


    function openLightbox(img) {
        lightboxContainer.style.display = 'flex';
        lightboxImg.src = img.src;
    }

    function closeLightbox() {
        lightboxContainer.style.display = 'none';
        lightboxImg.src = '';
    }

    fetch('https://api.are.na/v2/channels/superhero-junk?per=100&t=' + Date.now())
        .then(function(r) { return r.json(); })
        .then(function(data) {
            let html = '';
            for (let i = 0; i < data.contents.length; i = i + 1) {
                let block = data.contents[i];
                let imageUrl = null;

                if (block.image && block.image.display && block.image.display.url) {
                    imageUrl = block.image.display.url;
                } else if (block.image && block.image.large && block.image.large.url) {
                    imageUrl = block.image.large.url;
                } else if (block.image && block.image.original && block.image.original.url) {
                    imageUrl = block.image.original.url;
                } else if (block.attachment && block.attachment.url) {
                    imageUrl = block.attachment.url;
                } else if (block.source && block.source.url && block.source.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    imageUrl = block.source.url;
                }

                if (imageUrl == null) {
                    console.log('Skipped block (not an image):', block);
                    continue;
                }

                let altText = '';
                if (block.title && block.title.trim() !== '') {
                    altText = block.title;
                } else {
                    altText = 'untitled';
                }
                if (Math.random() < .5){
                    html += '<img src="' + imageUrl + '" loading="lazy">';
                }
                else{
                    html = '<img src="' + imageUrl + '" loading="lazy">' + html;
                }
            }

            arenaContent.innerHTML = html;

            const imgs = arenaContent.querySelectorAll('img');
            for (let i = 0; i < imgs.length; i = i + 1) {
                imgs[i].style.height = '14rem';
                imgs[i].addEventListener('click', function() {
                    openLightbox(imgs[i]);
                });
            }
        })
        .catch(function() {});

    lightboxContainer.addEventListener('click', function(e) {
        if (e.target == lightboxContainer) {
            closeLightbox();
        }
    });

    toggleLayoutBtn.addEventListener('click', function() {
        scattered = !scattered;
        const imgs = arenaContent.querySelectorAll('img');

        if (scattered == true) {
            arenaContent.style.display = 'block';
            arenaContent.style.width = 'calc(100vw - 12.5rem)';
            arenaContent.style.height = '100vh';
            arenaContent.style.position = 'relative';
            scale = 1;
            mapOffset = { x: 0, y: 0 };
            arenaContent.style.transform = "translate(0rem, 0rem) scale(" + scale + ")";

            const containerWidthRem = arenaContent.offsetWidth / rem;
            const containerHeightRem = arenaContent.offsetHeight / rem;

            for (let i = 0; i < imgs.length; i = i + 1) {
                imgs[i].classList.add('scattered');
                imgs[i].style.height = '4rem';
                imgs[i].style.left = (Math.random() * (containerWidthRem - 4)) + 'rem';
                imgs[i].style.top = (Math.random() * (containerHeightRem - 4)) + 'rem';
            }
            arenaContent.style.cursor = 'grab';
        } else {
            arenaContent.style.display = 'flex';
            arenaContent.style.width = '';
            arenaContent.style.height = '';
            arenaContent.style.position = 'relative';
            scale = 1;
            mapOffset = { x: 0, y: 0 };
            arenaContent.style.transform = "translate(0rem, 0rem) scale(" + scale + ")";

            for (let i = 0; i < imgs.length; i = i + 1) {
                imgs[i].classList.remove('scattered');
                imgs[i].style.height = '14rem';
                imgs[i].style.left = '';
                imgs[i].style.top = '';
            }
        }
    });


    arenaContent.addEventListener('mousedown', function(event) {
        if (scattered == false) {
            return;
        }
        dragging = true;
        dragStart.x = event.clientX - mapOffset.x;
        dragStart.y = event.clientY - mapOffset.y;
        arenaContent.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(event) {
        if (dragging == false) {
            return;
        }
        mapOffset.x = event.clientX - dragStart.x;
        mapOffset.y = event.clientY - dragStart.y;
        arenaContent.style.transform = "translate(" + (mapOffset.x / rem) + "rem, " + (mapOffset.y / rem) + "rem) scale(" + scale + ")";
    });

    document.addEventListener('mouseup', function() {
        dragging = false;
        if (scattered == true) {
            arenaContent.style.cursor = 'grab';
        }
    });

    zoomInBtn.addEventListener('click', function() {
        if (scattered == false) {
            return;
        }
        setScale(scale * 1.5);
    });

    zoomOutBtn.addEventListener('click', function() {
        if (scattered == false) {
            return;
        }
        setScale(1, true);
    });

    const overlay = document.getElementById("startupOverlay");

    overlay.addEventListener("click", () => {
        overlay.style.display = "none";
    });
});
