document.addEventListener("DOMContentLoaded", () => {
    const songs = ["abba", "elvis", "socios"];

    for (let i = 0; i < songs.length; i++) {
        const songImg = document.getElementById(songs[i] + "Image");

        songImg.addEventListener("mouseenter", () => {
            songImg.style.opacity = "1";
        });

        songImg.addEventListener("mouseleave", () => {
            songImg.style.opacity = ".8";
        });
}
});
