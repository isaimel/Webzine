document.addEventListener("DOMContentLoaded", () => {
    const allAudios = document.querySelectorAll("audio");
    const audioCount = allAudios.length;

    for (let i = 0; i < audioCount; i++) {
        const currentAudio = allAudios[i];

        currentAudio.addEventListener("play", () => {
            for (let j = 0; j < audioCount; j++) {
                const otherAudio = allAudios[j];
                if (otherAudio !== currentAudio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            }
        });
    }
});