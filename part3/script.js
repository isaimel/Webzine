import spellData from '/jsonFiles.js';

document.addEventListener("DOMContentLoaded", function() {
    const diceButton = document.getElementById("diceButton");
    const diceDropdown = document.getElementById("diceDropdown");
    const resetDiceButton = document.getElementById("resetDiceButton");
    const openCombatButton = document.getElementById("openCombatButton");
    const allDice = document.getElementById("allDice");
    const diceHolders = allDice.querySelectorAll("div");
    const diceRolls = allDice.querySelectorAll("span");
    const severalDiceRoller = document.getElementById("severalDiceRoller");
    const clearDiceArray = document.getElementById("clearDiceArray");
    const rollDiceArray = document.getElementById("rollDiceArray");
    const dicesAndScore = document.getElementById("dicesAndScore");
    const diceScore = document.getElementById("diceScore");


    let combatActive = false;
    let dieActive = false;



    // [0] -> min value (inclusive), [1] -> max value (exclusive), [2] -> multipliers  
    const diceRanges = {
        "d20": [1, 20, 1, "rgba(204,0,0,0.8)"],
        "d12": [1, 12, 1, "rgba(204,82,0,0.8)"],
        "d00": [0, 9, 10, "rgba(204,204,0,0.8)"],
        "d10": [1, 10, 1, "rgba(0,102,0,0.8)"],
        "d08": [1, 8, 1, "rgba(0,0,204,0.8)"],
        "d06": [1, 6, 1, "rgba(61,0,102,0.8)"],
        "d04": [1, 4, 1, "rgba(102,0,204,0.8)"]
    };

    diceButton.addEventListener("click", function() {
        if (allDice.style.display === "" || allDice.style.display === "none") {
            dieActive = true;
            allDice.style.display = "inline-flex";
            diceDropdown.classList.add('diceMenuOpen');
            diceButton.innerHTML = "Hide!";
            diceButton.style.backgroundColor = "gray";

        } else {
            combatActive = true;
            openCombatButton.click();
            dieActive = false;
            clearDiceArray.click();

            allDice.style.display = "";
            dicesAndScore.style.display = "";

            diceDropdown.classList.remove('diceMenuOpen');
            diceButton.innerHTML = "Roll!";;
            diceButton.style.backgroundColor = "";

            resetDieRolls();
        }
    });
    clearDiceArray.addEventListener("click", function() {
        severalDiceRoller.replaceChildren();
        diceScore.innerHTML="";
    });


    resetDiceButton.addEventListener("click", function() {
        resetDieRolls();
    });

    diceHolders.forEach(diceContainer => {
        let dice = diceContainer.querySelectorAll("img")[0];
        let diceRoll = diceContainer.querySelectorAll("span")[0]; 

        dice.addEventListener("click", function () {
            if (!combatActive){
                let count = 0;
                const interval = setInterval(() => {
                    const rollValue = getRandomNumber(diceContainer.id);
                    diceRoll.innerHTML = rollValue;
                    diceRoll.style.color = diceRanges[diceContainer.id][3];
                    count++;
                    if (count > 8) {
                        clearInterval(interval);
                    }
                }, 60);
            }
            else{
                const clone = diceContainer.cloneNode(true);
                severalDiceRoller.appendChild(clone);
                clone.diceValue = diceContainer.id;
                clone.addEventListener("click", function () {
                    clone.remove();
                });
            }
        });

    });

    function getRandomNumber(dieNumber){
        const valuesList = diceRanges[dieNumber]
        const minCeiled = Math.ceil(valuesList[0]);
        const maxFloored = Math.floor(valuesList[1]) + 1;
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) * valuesList[2];
    }

    function resetDieRolls(){
        diceRolls.forEach(diceRoll => {
            diceRoll.innerHTML = ``;
            diceRoll.style.color = "";
        });
    }
    openCombatButton.addEventListener("click", function() {
        if (dieActive){
            combatActive = !combatActive;
            diceHolders.forEach(container => {
                container.style.height = combatActive ? "fit-content" : "";
            });
            resetDieRolls();
            openCombatButton.style.backgroundColor = combatActive ? "gray" : "";
            openCombatButton.innerHTML = combatActive ? "Click to Add Dice!" : "Enter Combat!";
            dicesAndScore.style.display = combatActive ? "inline-flex" : "";
            allDice.style.height = combatActive ? "12rem" : "";
        }
        clearDiceArray.style.display = (combatActive && dieActive) ? "inline-flex" : "none";
        rollDiceArray.style.display = (combatActive && dieActive) ? "inline-flex" : "none";
    });
    rollDiceArray.addEventListener("click", function() {
        severalDiceRoller.querySelectorAll("div").forEach(die => {
        let count = 0;
        const interval = setInterval(() => {
                const rollValue = getRandomNumber(die.diceValue);
                die.querySelector("span").textContent = rollValue;
                die.querySelector("span").style.color = diceRanges[die.diceValue][3];
                count++;
                if (count > 8) {
                    let outputVal = 0;

                    severalDiceRoller.querySelectorAll("div").forEach(die => {
                        outputVal += Number(die.querySelector("span").textContent);
                    });
                    diceScore.innerHTML = outputVal;
                    clearInterval(interval);
                }
            }, 60);
        });
    });

    const spellsContainer = document.getElementById("spellsContainer");
    const template = document.getElementById("spellTemplate");

    for (const levelKey in spellData.spells) {
        const level = spellData.spells[levelKey];
        level.spells.forEach(spell => {
            const spellDiv = template.cloneNode(true);
            spellDiv.style.display = "block"; 

            spellDiv.querySelector(".spellName div").textContent = spell.name;
            spellDiv.querySelector(".spellSchool div").textContent = spell.school;
            spellDiv.querySelector(".spellCastingTime div").textContent = spell.castingTime;
            spellDiv.querySelector(".spellRange div").textContent = spell.range;
            spellDiv.querySelector(".spellTarget div").textContent = spell.target;
            spellDiv.querySelector(".spellComponents div").textContent = spell.components.join(", ");
            spellDiv.querySelector(".spellDuration div").textContent = spell.duration;
            spellDiv.querySelector(".spellDescription div").textContent = spell.description;
            spellDiv.querySelector(".spellAtHigherLvl div").textContent = spell.atHigherLevels;

            spellsContainer.appendChild(spellDiv);
        });
    }

});
