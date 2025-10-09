document.addEventListener("DOMContentLoaded", () => {
const corrText = [
    ["1", "Off"],["2", "Off"],["3", "Off"],["4", "Off"],["5", "Off"],["6", "Off"],["7", "Off"],["8", "Off"],["9", "Off"],["10", "Off"],["11", "Off"],["12", "Off"],
];

    var arrayLength = corrText.length;
    for (let i = 0; i < arrayLength; i++) {
        const albumLabel = document.getElementById("socios"+corrText[i][0]);
        const scoreLabel = document.getElementById("score");

        albumLabel.addEventListener("click", () => {
            var offOrOn = corrText[i][1];
           if (offOrOn == "Off") {
                corrText[i][1] = "On";
                albumLabel.style.opacity = "1";
                const value = Number(scoreLabel.innerText.replace(/[^\d.-]/g, ""));
                scoreLabel.innerText = "Score: " + (value + 8.3333333333);
            } else {
                corrText[i][1] = "Off";
                albumLabel.style.opacity = "0.2";   
                const value = Number(scoreLabel.innerText.replace(/[^\d.-]/g, ""));
                scoreLabel.innerText = "Score: " + (value - 8.3333333333);
            }
        });
    }
});