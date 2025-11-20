document.addEventListener("DOMContentLoaded", () => {
    const corrText = [
        ["title", "Off"],
        ["written", "Off"],
        ["produced", "Off"],
        ["funded", "Off"],
        ["partnership", "Off"],
        ["special", "Off"],
        ["catered", "Off"],
        ["dedicated", "Off"],
        ["memoriam", "Off"],
        ["composed", "Off"],
        ["authored", "Off"],
        ["contribution", "Off"]
    ];

    let totalClicks = 0;
    const arrayLength = corrText.length;

    for (let i = 0; i < arrayLength; i++) {
        const label = document.getElementById(corrText[i][0]);

        label.addEventListener("click", () => {
            if (corrText[i][1] == "Off") {
                corrText[i][1] = "On";
                label.style.fontStyle="italic"
                totalClicks++;
            } else {
                corrText[i][1] = "Off";
                label.style.fontStyle="normal"
                totalClicks--;
            }
            const shittySong = document.getElementById("shittyLoveSong");
            if (totalClicks == arrayLength) {
                shittySong.style.opacity = "1";
            } else {
                shittySong.style.opacity = "0";
            }
        });
    }
});
