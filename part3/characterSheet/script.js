document.addEventListener("DOMContentLoaded", function() {
    const toDiceButton = document.getElementById("toDice");
    const allDiceMenu = document.getElementById("allDice");
    const diceHolders = allDiceMenu.querySelectorAll("div");
    const diceImages = allDiceMenu.querySelectorAll("img");
    const diceRolls = allDiceMenu.querySelectorAll("span");

    const diceRanges = {
        "d04": [1, 4, 1],
        "d06": [1, 6, 1],
        "d08": [1, 8, 1],
        "d10": [1, 10, 1],
        "d12": [1, 12, 1],
        "d20": [1, 20, 1],
        "d00": [0, 9, 10]
    };

    toDiceButton.addEventListener("click", function() {
        if (allDiceMenu.style.display === "" || allDiceMenu.style.display === "none") {
            allDiceMenu.style.display = "inline-flex";
            allDiceMenu.classList.remove('diceMenuClose');
            allDiceMenu.classList.add('diceMenuOpen');

            toDiceButton.classList.remove('diceMenuClose');
            toDiceButton.classList.add('diceMenuOpen');

        } else {
            allDiceMenu.classList.remove('diceMenuOpen');
            allDiceMenu.classList.add('diceMenuClose');

            toDiceButton.classList.remove('diceMenuOpen');
            toDiceButton.classList.add('diceMenuClose');
            
            allDiceMenu.style.display = "";
            resetDieWindow();
        }
    });


    diceHolders.forEach(diceContainer => {
        let dice = diceContainer.querySelectorAll("img")[0];
        let diceRoll = diceContainer.querySelectorAll("span")[0]; 

        dice.addEventListener("mouseover", function() {
            // diceContainer.style.width = `9rem`;
            dice.style.opacity = "1.0"
        });
        dice.addEventListener("mouseout", function() {
            // diceContainer.style.width = `8rem`;
            showUnselectedDie();
        });

        dice.addEventListener("click", function () {
            let count = 0;
            const interval = setInterval(() => {
                diceRoll.innerHTML = getRandomNumber(diceContainer.id);
                count++;
                if (count > 8) {
                    clearInterval(interval);
                }
            }, 60);
        });

    });

    function getRandomNumber(dieNumber){
        const valuesList = diceRanges[dieNumber]
        const minCeiled = Math.ceil(valuesList[0]);
        const maxFloored = Math.floor(valuesList[1]) + 1;
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) * valuesList[2];
    }

    function showUnselectedDie(){
        diceImages.forEach(dieImage => {
            dieImage.style.opacity = "0.4"
        });
    }

    function resetDieWindow(){
        diceRolls.forEach(diceRoll => {
            diceRoll.innerHTML = ``;
        });
    }
});
