document.addEventListener("DOMContentLoaded", () => {
    const songs = ["devil", "let", "loving", "moody", "pretend", "way", "wonder"];

    songs.forEach((song) => {
        const songImg = document.getElementById(song + "Img");
        const songLyr = document.getElementById(song + "Text");

        songLyr.style.display = "none";

        songImg.addEventListener("mouseenter", () => {
            songLyr.style.display = "block";
            songImg.style.opacity = "0.4";
        });

        songImg.addEventListener("mouseleave", () => {
            songLyr.style.display = "none";
            songImg.style.opacity = "1";
        });

        songLyr.addEventListener("mouseenter", () => {
            songLyr.style.display = "block";
            songImg.style.opacity = "0.4";
        });
        songLyr.addEventListener("mouseleave", () => {
            songLyr.style.display = "none";
            songImg.style.opacity = "1";
        });
    });
});
