document.addEventListener("DOMContentLoaded", function() {
    const arenaContent = document.getElementById('arenaContent');
    const lightboxContainer = document.getElementById('lightboxContainer');
    const lightboxImg = document.getElementById('lightboxImg');
    const toggleLayoutBtn = document.getElementById('toggleLayoutBtn');
    const zoomInBtn = document.getElementById('zoomInBtn');
    const zoomOutBtn = document.getElementById('zoomOutBtn');
    const overlay = document.getElementById("startupOverlay");
    const classInput = document.getElementById('classInput');
    const searchBtn = document.getElementById('searchBtn');

    let scattered = false;
    let scale = 1;
    let offset = { x: 0, y: 0 };
    let dragging = false;
    let lastMouse = { x: 0, y: 0 };
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

    fetch('https://api.are.na/v2/channels/superhero-junk?per=100&t=' + Date.now())
        .then(r => r.json())
        .then(data => {
            arenaContent.innerHTML = '';

            data.contents.forEach(block => {
                let imageUrl = block.image?.display?.url || block.image?.large?.url || block.image?.original?.url || block.attachment?.url || (block.source?.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i) && block.source.url);
                if (!imageUrl){
                    return;
                }

                const img = document.createElement('img');
                img.src = imageUrl;
                img.loading = 'lazy';
                img.style.height = '14rem';

                var blockDescription = block.description || '';
                var words = blockDescription.split(/\s+/);
                for (var j = 0; j < words.length; j++) {
                    var newClass = words[j];
                    if (newClass) {
                        img.classList.add(newClass);
                    }
                }

                img.addEventListener('click', () => {
                    lightboxContainer.style.display = 'flex';
                    lightboxImg.src = img.src;
                });

                if (Math.random() < 0.5){
                    arenaContent.appendChild(img);
                }
                else{
                    arenaContent.insertBefore(img, arenaContent.firstChild);
                }
            });
        })
        .catch(() => {});
        // Getting the images from Are.na was taken from class drive and stamped out with ChatGPT

    searchBtn.addEventListener('click', () => {
        const imgs = document.querySelectorAll('#arenaContent img');
        let matched = false;
        imgs.forEach(img => {
            if (img.classList.contains(classInput.value.toLowerCase().replace(/\s+/g,'_'))) {
                img.style.display = '';
                matched = true;
            } else {
                img.style.display = 'none';
            }
        });
        if (!matched){
            imgs.forEach(img => img.style.display = '');
        }
    });

    lightboxContainer.addEventListener('click', () => {
        lightboxContainer.style.display = 'none';
        lightboxImg.src = '';
    });

    toggleLayoutBtn.addEventListener('click', () => {
        scattered = !scattered;
        const imgs = arenaContent.querySelectorAll('img');
        if (scattered) {
            arenaContent.style.display = 'block';
            arenaContent.style.width = 'calc(100vw - 12.5rem)';
            arenaContent.style.height = '100vh';
            arenaContent.style.position = 'relative';
            scale = 1;
            offset = { x: 0, y: 0 };
            arenaContent.style.transform = `translate(0rem, 0rem) scale(${scale})`;
            const containerWidthRem = arenaContent.offsetWidth / rem;
            const containerHeightRem = arenaContent.offsetHeight / rem;
            imgs.forEach(img => {
                img.classList.add('scattered');
                img.style.height = '4rem';
                img.style.left = (Math.random() * (containerWidthRem - 4)) + 'rem';
                img.style.top = (Math.random() * (containerHeightRem - 4)) + 'rem';
            });
            arenaContent.style.cursor = 'grab';
        } else {
            arenaContent.style.display = 'flex';
            arenaContent.style.width = '';
            arenaContent.style.height = '';
            arenaContent.style.position = 'relative';
            scale = 1;
            offset = { x: 0, y: 0 };
            arenaContent.style.transform = `translate(0rem, 0rem) scale(${scale})`;
            imgs.forEach(img => {
                img.classList.remove('scattered');
                img.style.height = '14rem';
                img.style.left = '';
                img.style.top = '';
            });
        }
    });

    arenaContent.addEventListener('mousedown', event => {
        if (scattered){
            dragging = true;
            lastMouse.x = event.clientX;
            lastMouse.y = event.clientY;
            arenaContent.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', event => {
        if (dragging){
            offset.x += event.clientX - lastMouse.x;
            offset.y += event.clientY - lastMouse.y;
            lastMouse.x = event.clientX;
            lastMouse.y = event.clientY;
            arenaContent.style.transform = `translate(${offset.x / rem}rem, ${offset.y / rem}rem) scale(${scale})`;
        }
    });

    document.addEventListener('mouseup', () => {
        dragging = false;
        if (scattered){
            arenaContent.style.cursor = 'grab';
        }
    });

    zoomInBtn.addEventListener('click', () => { 
        if (scattered){
            scale *= 1.5;
            arenaContent.style.transform = `translate(${offset.x / rem}rem, ${offset.y / rem}rem) scale(${scale})`;
        }
    });

    zoomOutBtn.addEventListener('click', () => { 
        if (scattered){
            scale = 1;
            offset = { x: 0, y: 0 };
            arenaContent.style.transform = `translate(0rem, 0rem) scale(1)`;
        }
    });

    overlay.addEventListener("click", () => {
        overlay.style.display = "none"; 
    });
});
