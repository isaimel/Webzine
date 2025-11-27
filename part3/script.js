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
    const spellsContainer = document.getElementById("spellsContainer");
    const template = document.getElementById("spellTemplate");
    const menuToggleBtn = document.getElementById("menuToggleBtn"); 
    const sidebar = document.getElementById("buttonSidebar");
    const enterSpellsButton = document.getElementById("enterSpells");
    const enterCombatButton = document.getElementById("enterCombat");
    const showCharacterButton = document.getElementById("showCharacter");
    const currentPage = document.getElementById("currentPage");
    const spellsPage = document.getElementById("spellsPage");
    const characterPage = document.getElementById("characterSheet");
    const combatPage = document.getElementById("combatPage");
    const savingThrowButton = document.getElementById("savingThrow");
    const inspirationButton = document.getElementById("inspiration");
    const advantageButton = document.getElementById("advantage");
    const notesPageButton = document.getElementById("enterNotes");
    const enterArtButton = document.getElementById("enterArt");
    const artPage = document.getElementById("artPage");

    const lightboxContainer = document.getElementById("lightboxContainer");
    const lightboxImg = document.getElementById('lightboxImg');

    const notesPage = document.getElementById("notesPage");

    let addedModifier = 0;
    let previouslySelectedModSkill = null;
    
    let combatActive = false;
    let dieActive = false;
    let sideBarActive = false;

    // [0] -> min value (inclusive), [1] -> max value (exclusive), [2] -> multipliers  
    const diceRanges = {
        "d20": [1, 20, 1, "rgba(204,0,0,0.6)"],
        "d12": [1, 12, 1, "rgba(204,82,0,0.6)"],
        "d00": [0, 9, 10, "rgba(204,204,0,0.6)"],
        "d10": [1, 10, 1, "rgba(0,102,0,0.6)"],
        "d08": [1, 8, 1, "rgba(0,0,204,0.6)"],
        "d06": [1, 6, 1, "rgba(61,0,102,0.6)"],
        "d04": [1, 4, 1, "rgba(102,0,204,0.6)"]
    };

    diceButton.addEventListener("click", function() {
        dieActive = !dieActive;
        if (dieActive == false){
            combatState(false);
            combatActive = false;
            if (previouslySelectedModSkill != null){
                previouslySelectedModSkill.click();
                openCombatButton.click();
            }
            dieActive = false;
        }
        diceState(dieActive);
    });

    openCombatButton.addEventListener("click", function() {
        if (dieActive){
            combatActive = !combatActive;
            combatState(combatActive)
        }
    });

    function combatState(open){
        clearDiceArray.click();
        allDice.style.height = open ? "12rem" : "16rem";
        dicesAndScore.style.height = open ? "6rem" : "0rem";
        openCombatButton.style.backgroundColor = open ? "gray" : "";
        openCombatButton.innerHTML = open ? "Click to Add Dice!" : "Enter Combat!";
        clearDiceArray.style.display, rollDiceArray.style.display = open ? "flex" : "none";
            resetDieRolls(true);  
    }

    function diceState(open){
        resetDieRolls(); 
        allDice.style.height = open ? "16rem" : "0rem";
        diceButton.innerHTML = open ? "Hide!" : "Roll!";
        diceButton.style.backgroundColor = open ? "gray" : "";
    }

    clearDiceArray.addEventListener("click", function() {
        severalDiceRoller.replaceChildren();
        diceScore.innerHTML="";
        if (inspirationThrow){
            const clone = document.getElementById("d08").cloneNode(true);
            clone.removeAttribute("id");
            clone.diceValue = "d08";
            clone.querySelector("span").innerHTML = "";
            severalDiceRoller.appendChild(clone);
        }
    });

    resetDiceButton.addEventListener("click", function() {
        if (!combatActive)
            resetDieRolls(true);
    });

    function resetDieRolls(toDot = true){
        diceRolls.forEach(diceRoll => {
            diceRoll.innerHTML = toDot ? "&#9679;": "";
        });
    }


    diceHolders.forEach(diceContainer => {
        diceContainer.style.color = diceRanges[diceContainer.id][3]; 
        let dice = diceContainer.querySelectorAll("img")[0];
        let diceRoll = diceContainer.querySelectorAll("span")[0]; 

        dice.addEventListener("click", function () {
            if (!combatActive){
                let count = 0;
                const interval = setInterval(() => {
                    const rollValue = getRandomNumber(diceContainer.id);
                    diceRoll.innerHTML = rollValue;
                    count++;
                    if (count > 8) {
                        clearInterval(interval);
                    }
                }, 60);
            }
            else{
                const clone = diceContainer.cloneNode(true);
                clone.removeAttribute("id");
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
                    console.log(outputVal);
                    console.log(addedModifier);
        
                    diceScore.innerHTML = outputVal + addedModifier;
                    console.log(addedModifier);
                    clearInterval(interval);
                }
            }, 60);
        });
    });

    template.style.display = "none"; 

    function renderSpellLevels(spellData, spellsContainer, template) {
        const meta = spellData.metaMagic;
        if (meta?.spells?.length > 0) {
            const metaContainer = document.createElement("div");
            metaContainer.className = "levelContainer";

            const metaNameSpan = document.createElement("span");
            metaNameSpan.className = "levelName";
            metaNameSpan.textContent = meta.name || "Meta Magic";
            metaContainer.appendChild(metaNameSpan);

            const singleLevelSpells = document.createElement("div");
            singleLevelSpells.className = "singleLevelSpells";

            meta.spells.forEach(option => {
                const spellDiv = template.cloneNode(true);
                spellDiv.removeAttribute('id');
                spellDiv.style.display = "block";

                spellDiv.querySelector(".spellName span").innerHTML = option.name;
                spellDiv.querySelector(".spellDescription span").innerHTML = option.description;

                const fieldsToHide = [
                    ".spellSchool",
                    ".spellCastingTime",
                    ".spellRange",
                    ".spellTarget",
                    ".spellComponents",
                    ".spellDuration",
                    ".spellAtHigherLvl"
                ];
                fieldsToHide.forEach(selector => {
                    const el = spellDiv.querySelector(selector);
                    if (el) el.style.display = "none";
                });

                const castingTimeField = spellDiv.querySelector(".spellCastingTime span");
                if (castingTimeField) castingTimeField.textContent = `${option.cost} Sorcery Points`;

                singleLevelSpells.appendChild(spellDiv);
            });

            metaContainer.appendChild(singleLevelSpells);
            spellsContainer.appendChild(metaContainer);
        }

        for (const levelKey in spellData.spells) {
            const level = spellData.spells[levelKey];

            const levelContainer = document.createElement("div");
            levelContainer.className = "levelContainer";

            const levelNameSpan = document.createElement("span");
            levelNameSpan.className = "levelName";
            levelNameSpan.textContent = level.name;
            levelContainer.appendChild(levelNameSpan);

            const singleLevelSpells = document.createElement("div");
            singleLevelSpells.className = "singleLevelSpells";

            level.spells.forEach(spell => {
                const spellDiv = template.cloneNode(true);
                spellDiv.removeAttribute('id');
                spellDiv.style.display = "block";

                spellDiv.querySelector(".spellName span").innerHTML = spell.name;
                spellDiv.querySelector(".spellSchool span").innerHTML = spell.school;
                spellDiv.querySelector(".spellCastingTime span").innerHTML = spell.castingTime;
                spellDiv.querySelector(".spellRange span").innerHTML = spell.range;
                spellDiv.querySelector(".spellTarget span").innerHTML = spell.target;
                spellDiv.querySelector(".spellComponents span").innerHTML = spell.components.join(", ");
                spellDiv.querySelector(".spellDuration span").innerHTML = spell.duration;
                spellDiv.querySelector(".spellDescription span").innerHTML = spell.description;
                
                if (!spell.atHigherLevels){
                    spellDiv.querySelector(".spellAtHigherLvl").style.display = "none";
                } else {
                    spellDiv.querySelector(".spellAtHigherLvl span").innerHTML = spell.atHigherLevels;
                }

                singleLevelSpells.appendChild(spellDiv);
            });

            levelContainer.appendChild(singleLevelSpells);
            spellsContainer.appendChild(levelContainer);
        }
    }
    renderSpellLevels(spellData, spellsContainer, template);

    menuToggleBtn.addEventListener("click", function () {
        sideBarActive = !sideBarActive;
        document.getElementById("buttonSidebar").style.width = sideBarActive ? "6rem" : "";
        document.getElementById("buttonSidebar").style.height = sideBarActive ? "fit-content" : "";
        document.getElementById("menuToggleBtn").style.backgroundColor = sideBarActive ? "rgb(95, 134, 207)" : "";
        if (!sideBarActive){
            hidePages()
            resetCombatAddons();
            changeModifier(0);
            previouslySelectedModSkill = null;

        }
    });
    function togglePage(button, page) {
        button.addEventListener("click", function () {
            if (page.style.display != "flex"){
                hidePages();
                page.style.display = "flex"
            }else{
                hidePages();
            }
        });
    }

    togglePage(enterSpellsButton, spellsPage);

    enterSpellsButton.addEventListener("click", function () {
        if (spellsPage.style.display != "flex"){
            hidePages();
            spellsPage.style.display = "flex"
        }else{
            hidePages();
        }
    });

    showCharacterButton.addEventListener("click", function () {
        if (characterPage.style.display != "flex"){
            hidePages();
            characterPage.style.display = "flex"
        }else{
            characterPage.style.display = "none"
            hidePages();
        }
    });

    let notes = localStorage.getItem("notesText") || "";

    notesPageButton.addEventListener("click", function () {

        if (notesPage.style.display != "flex") {
            hidePages();
            notesPage.style.display = "flex";

            notesEditor.value = notes;
        } else {
            notesPage.style.display = "none";
            hidePages();
        }
    });

    saveNotesButton.addEventListener("click", () => {
        notes = notesEditor.value;
        localStorage.setItem("notesText", notes);
    });



    enterCombatButton.addEventListener("click", function () {
        if (combatPage.style.display != "flex"){
            hidePages();
            combatPage.style.display = "flex"
        }else{
            combatPage.style.display = "none"
            hidePages();
        }
    });

    enterArtButton.addEventListener("click", function () {
        if (artPage.style.display != "flex"){
            hidePages();
            artPage.style.display = "flex"
        }else{
            artPage.style.display = "none"
            hidePages();
        }
    });

    function hidePages(){
        currentPage.querySelectorAll("div").forEach(page => {
            page.style.display = "";
        });
    }
    function populateCharacterSheet(characterData) {
        const data = characterData;

        document.querySelector("#biCharName div").textContent = data.basicInfo.charName;
        createDropdown("#biClsLvl", data.basicInfo.classes, formatClass);
        document.querySelector("#biBckg div").textContent = data.basicInfo.background;
        document.querySelector("#biPlayName div").textContent = data.basicInfo.playName;
        createDropdown("#biRace", data.basicInfo.races, formatRace);
        document.querySelector("#biAlign div").textContent = data.basicInfo.alignment;
        document.querySelector("#biExp div").textContent = data.basicInfo.experiencePoints;

        const abilitiesGrid = document.getElementById("abilitiesGrid");
        abilitiesGrid.innerHTML = "";
        for (let [key, val] of Object.entries(data.abilityScores)) {
            const div = document.createElement("div");
            div.textContent = key + ": " + val + " (Mod: " + data.modifiers[key] + ")";
            abilitiesGrid.appendChild(div);
        }

        const savesGrid = document.getElementById("savesGrid");
        savesGrid.innerHTML = "";
        for (let [key, val] of Object.entries(data.savingThrows)) {
            const div = document.createElement("div");
            div.textContent = key + ": " + val;
            savesGrid.appendChild(div);
        }

        const skillsGrid = document.getElementById("skillsGrid");
        skillsGrid.innerHTML = "";
        for (let [key, val] of Object.entries(data.skills)) {
            const div = document.createElement("div");
            div.textContent = key + ": " + val;
            skillsGrid.appendChild(div);
        }

        const combatGrid = document.getElementById("combatGrid");
        combatGrid.innerHTML = `
            Armor Class: ${data.combat.armorClass}
            Initiative: ${data.combat.initiative}
            Speed: ${data.combat.speed}
            HP: ${data.combat.hitPoints.current} / ${data.combat.hitPoints.max}
            Hit Dice: ${data.combat.hitDice.remaining} / ${data.combat.hitDice.total} (${data.combat.hitDice.type})
            Death Saves: Success ${data.combat.deathSaves.success}, Failure ${data.combat.deathSaves.failure}
        `;

        const equipmentList = document.getElementById("equipmentList");
        equipmentList.innerHTML = "";
        data.equipment.forEach(e => {
            const div = document.createElement("div");
            div.textContent = `${e.name} x${e.quantity}` + (e.description ? ": " + e.description : "");
            equipmentList.appendChild(div);
        });

        const featsList = document.getElementById("featsList");
        featsList.innerHTML = "";
        data.feats.forEach(f => {
            const div = document.createElement("div");
            div.textContent = f.name;
            featsList.appendChild(div);
        });
    }
    function formatClass(c) {
        const sub = c.subclass ? ` (${c.subclass})` : "";
        return `${c.name}${sub} lvl. ${c.lvl}`;
    }
    function formatRace(c) {
        const sub = c.subrace ? ` (${c.subrace})` : "";
        return `${c.name}${sub}`;
    }

    function createDropdown(type, typeContent, format){
        const main = document.querySelector(type + " .mainValue");
        const list = document.querySelector(type + " .dropdownList");

        if (typeContent.length > 0) {
            main.innerHTML = format(typeContent[0]);
        }

        list.innerHTML = "";
        typeContent.slice(1).forEach(c => {
            const item = document.createElement("div");
            item.innerHTML = format(c);
            list.appendChild(item);
        });
    }

    function changeModifier(modifier){
        let scoreMod = document.getElementById("scoreModifier");
        addedModifier = modifier;
        console.log(addedModifier);
        if (modifier == 0){
            scoreMod.innerHTML = "";
        }
        else{
            scoreMod.innerHTML = (modifier > 0) ? "+" + modifier : modifier;
        }
    }
    
    function fillSpellCasting(overheadContainer){
        const abilities = {
            dc: "DC",
            atk: "ATK"
        };
        for (const [key, label] of Object.entries(abilities)) { 
            const abilityDiv = document.createElement("div");
            const abilityLabelSpan = document.createElement("span");
            const abilityScoreSpan = document.createElement("span");
            const abilityModSpan = document.createElement("span");

            abilityDiv.className = "abilityScore"
            abilityDiv.ability = key;
            abilityLabelSpan.className = "abilityLabel"
            abilityScoreSpan.className = "abilityScore"
            abilityModSpan.className = "abilityMod"

            abilityLabelSpan.innerHTML = label
            abilityModSpan.innerHTML = spellData["spellcasting"][key];
            abilityScoreSpan.innerHTML = "";

            abilityDiv.appendChild(abilityLabelSpan);
            abilityDiv.appendChild(abilityModSpan);
            abilityDiv.appendChild(abilityScoreSpan);

            overheadContainer.appendChild(abilityDiv)
            if (key == "atk"){
                abilityDiv.addEventListener("click", function () {
                    if(!dieActive){
                        diceButton.click();
                    }
                    if (!combatActive){
                        openCombatButton.click();
                    }
                    if (abilityDiv == previouslySelectedModSkill){
                        changeModifier(0);
                        abilityDiv.style.backgroundColor = "";
                        previouslySelectedModSkill = null;
                        return;
                    }
                    clearDiceArray.click();
                    changeModifier(Number(spellData["spellcasting"][key]));
                    if (previouslySelectedModSkill != null) previouslySelectedModSkill.style.backgroundColor = "";
                    previouslySelectedModSkill = abilityDiv;
                    previouslySelectedModSkill.style.backgroundColor = "gray";
                });
            }
        }
    }

    function fillAbilityScores(overheadContainer){
        const abilities = {
            strength: "STR",
            dexterity: "DEX",
            constitution: "CON",
            intelligence: "INT",
            wisdom: "WIS",
            charisma: "CHA"
        };
        for (const [key, label] of Object.entries(abilities)) { 
            const abilityDiv = document.createElement("div");
            const abilityLabelSpan = document.createElement("span");
            const abilityScoreSpan = document.createElement("span");
            const abilityModSpan = document.createElement("span");

            abilityDiv.className = "abilityScore"
            abilityDiv.ability = key;
            abilityLabelSpan.className = "abilityLabel"
            abilityScoreSpan.className = "abilityScore"
            abilityModSpan.className = "abilityMod"

            abilityLabelSpan.innerHTML = label
            abilityScoreSpan.innerHTML = characterData["abilityScores"][key];
            abilityModSpan.innerHTML = (characterData["modifiers"][key] > 0) ? "+" + characterData["modifiers"][key] : characterData["modifiers"][key];

            abilityDiv.appendChild(abilityLabelSpan);
            abilityDiv.appendChild(abilityModSpan);
            abilityDiv.appendChild(abilityScoreSpan);

            overheadContainer.appendChild(abilityDiv)
            abilityDiv.addEventListener("click", function () {
                if(!dieActive){
                    diceButton.click();
                }
                if (!combatActive){
                    openCombatButton.click();4
                }
                if (abilityDiv == previouslySelectedModSkill){
                    changeModifier(0);
                    abilityDiv.style.backgroundColor = "";
                    previouslySelectedModSkill = null;
                    return;
                }
                clearDiceArray.click();
                changeModifier(Number(characterData["modifiers"][key]));
                if (previouslySelectedModSkill != null) previouslySelectedModSkill.style.backgroundColor = "";
                previouslySelectedModSkill = abilityDiv;
                previouslySelectedModSkill.style.backgroundColor = "gray";
            });
        }
    }

    function fillSkillsScores(overheadContainer){
        const skills = {
            "acrobatics": "ACR",
            "animal handling": "ANH",
            "arcana": "ARC",
            "athletics": "ATH",
            "deception": "DEC",
            "history": "HIS",
            "insight": "INS",
            "intimidation": "INTM",
            "investigation": "INV",
            "medicine": "MED",
            "nature": "NAT",
            "perception": "PRC",
            "performance": "PRF",
            "persuasion": "PRS",
            "religion": "REL",
            "sleight of hand": "SLT",
            "stealth": "STE",
            "survival": "SUR"
        }
        for (const [key, label] of Object.entries(skills)) { 
            const skillsDiv = document.createElement("div");
            const skillsLabelSpan = document.createElement("span");
            const skillsScoreSpan = document.createElement("span");

            skillsDiv.className = "skillsScore"
            skillsDiv.skills = key;
            skillsLabelSpan.className = "skillsLabel"
            skillsScoreSpan.className = "skillsScore"

            skillsLabelSpan.innerHTML = label
            skillsScoreSpan.innerHTML = "+" + characterData["skills"][key];

            skillsDiv.appendChild(skillsLabelSpan);
            skillsDiv.appendChild(skillsScoreSpan);

            overheadContainer.appendChild(skillsDiv)
            skillsDiv.addEventListener("click", function () {
                if(!dieActive){
                    diceButton.click();
                }
                if (!combatActive){
                    openCombatButton.click();
                }
                if (skillsDiv == previouslySelectedModSkill){
                    changeModifier(0);
                    skillsDiv.style.backgroundColor = "";
                    previouslySelectedModSkill = null;
                    return;
                }
                clearDiceArray.click();
                changeModifier(Number(characterData["skills"][key]));
                if (previouslySelectedModSkill != null) previouslySelectedModSkill.style.backgroundColor = "";
                previouslySelectedModSkill = skillsDiv;
                previouslySelectedModSkill.style.backgroundColor = "gray";
            });
        }
    }

    function fillModifiers(overheadContainer) {
        const abilities = {
            strength: "STR",
            dexterity: "DEX",
            constitution: "CON",
            intelligence: "INT",
            wisdom: "WIS",
            charisma: "CHA"
        };
        
        for (const [key, label] of Object.entries(abilities)) { 
            const abilityDiv = document.createElement("div");
            const abilityLabelSpan = document.createElement("span");
            const abilityScoreSpan = document.createElement("span");
            const abilityModSpan = document.createElement("span");

            abilityDiv.className = "abilityScore"
            abilityDiv.ability = key;
            abilityLabelSpan.className = "abilityLabel"
            abilityScoreSpan.className = "abilityScore"
            abilityModSpan.className = "abilityMod"

            abilityLabelSpan.innerHTML = label
            abilityScoreSpan.innerHTML = characterData["abilityScores"][key];
            abilityModSpan.innerHTML = (characterData["savingThrows"][key] > 0) 
                ? "+" + characterData["savingThrows"][key] 
                : characterData["savingThrows"][key];

            abilityDiv.appendChild(abilityLabelSpan);
            abilityDiv.appendChild(abilityModSpan);
            abilityDiv.appendChild(abilityScoreSpan);

            overheadContainer.appendChild(abilityDiv)
            abilityDiv.addEventListener("click", function () {
                if(!dieActive){
                    diceButton.click();
                }
                if (!combatActive){
                    openCombatButton.click();
                }
                if (abilityDiv == previouslySelectedModSkill){
                    changeModifier(0);
                    abilityDiv.style.backgroundColor = "";
                    previouslySelectedModSkill = null;
                    return;
                }
                clearDiceArray.click();
                addedModifier = changeModifier(Number(characterData["savingThrows"][key]));
                if (previouslySelectedModSkill != null) previouslySelectedModSkill.style.backgroundColor = "";
                previouslySelectedModSkill = abilityDiv;
                previouslySelectedModSkill.style.backgroundColor = "gray";
            });
        }
    }


    function resetCombatAddons(){
        if (savingThrow) savingThrowButton.click();
        if (inspirationThrow) inspirationButton.click();
        if (advantageThrow) advantageButton.click();
    }

    let savingThrow = false;
    savingThrowButton.addEventListener("click", function() {
        savingThrow = !savingThrow;
        savingThrowButton.style.backgroundColor = savingThrow ? "gray" : "";
        document.getElementById("combatAbilityScores").style.display = savingThrow ? "none" : "inline-flex";
        document.getElementById("combatModifierScores").style.display = savingThrow ? "inline-flex" : "none";
        if (previouslySelectedModSkill != null){
            changeModifier(0);
            previouslySelectedModSkill.style.backgroundColor = "";
            previouslySelectedModSkill = null;
        }
    });
    let inspirationThrow = false;
    inspirationButton.addEventListener("click", function() {
        inspirationThrow = !inspirationThrow;
        if (inspirationThrow){
            if(!dieActive){
                diceButton.click();
            }
            if (!combatActive){
                openCombatButton.click();
            }
        }
        inspirationButton.style.backgroundColor = inspirationThrow ? "gray" : "";

        clearDiceArray.click();
    });
    let advantageThrow = false;
    advantageButton.addEventListener("click", function() {
        advantageThrow = !advantageThrow;
        advantageButton.style.backgroundColor = advantageThrow ? "gray" : "";
    });
    fillSpellCasting(document.getElementById("combatAbilityScores"));
    fillAbilityScores(document.getElementById("combatAbilityScores"));
    fillSkillsScores(document.getElementById("combatSkillsScores"));
    fillModifiers(document.getElementById("combatModifierScores"));
    loadCombatSpells();

    function loadCombatSpells() {
        
        const combatSpellList = document.getElementById("combatSpellList");

        const meta = spellData.metaMagic;

        const metaDiv = document.createElement("div");
        metaDiv.className = "combatSpellLevel";

        const metaTitle = document.createElement("div");
        metaTitle.className = "combatSpellLevelTitle";
        metaTitle.textContent = meta.name || "Meta Magic";
        metaDiv.appendChild(metaTitle);

        const metaContainer = document.createElement("div");
        metaContainer.className = "spellsContainer";
        metaContainer.style.display = "none";
        metaDiv.appendChild(metaContainer);

        metaTitle.addEventListener("click", () => {
            metaContainer.style.display = metaContainer.style.display != "block" ? "block" : "";
        });

        const slotTracker = document.createElement("div");
        slotTracker.className = "spellSlotTracker";

        let maxPoints = meta.spellSlots;
        let currentPoints = meta.currentPoints ?? maxPoints;

        const slotDisplay = document.createElement("span");
        slotDisplay.textContent = `Sorcery Points: ${currentPoints} / ${maxPoints}`;
        slotTracker.appendChild(slotDisplay);

        const minusBtn = document.createElement("button");
        minusBtn.textContent = "−";
        minusBtn.addEventListener("click", () => {
            if (currentPoints > 0) currentPoints--;
            slotDisplay.textContent = `Sorcery Points: ${currentPoints} / ${maxPoints}`;
        });
        slotTracker.appendChild(minusBtn);

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.addEventListener("click", () => {
            if (currentPoints < maxPoints) currentPoints++;
            slotDisplay.textContent = `Sorcery Points: ${currentPoints} / ${maxPoints}`;
        });
        slotTracker.appendChild(plusBtn);

        metaContainer.appendChild(slotTracker);

        meta.spells.forEach(option => {
            const entry = document.createElement("div");
            entry.className = "combatSpellEntry";

            const nameRow = document.createElement("div");
            nameRow.className = "combatSpellNameRow";

            const nameLabel = document.createElement("span");
            nameLabel.textContent = option.name;
            nameRow.appendChild(nameLabel);

            const toggleBtn = document.createElement("button");
            toggleBtn.textContent = "▼";
            toggleBtn.className = "combatSpellToggle";
            nameRow.appendChild(toggleBtn);

            const details = document.createElement("div");
            details.className = "combatSpellDetails";
            details.style.display = "none";
            details.innerHTML = `
                <div>Description: ${option.description}</div>
                <div>Cost: ${option.cost} Sorcery Points</div>
            `;

            let open = false;
            toggleBtn.addEventListener("click", () => {
                open = !open;
                details.style.display = open ? "flex" : "none";
                toggleBtn.textContent = open ? "▲" : "▼";
            });

            nameLabel.addEventListener("click", () => {
                if (currentPoints >= option.cost) {
                    currentPoints -= option.cost;
                    slotDisplay.textContent = `Sorcery Points: ${currentPoints} / ${maxPoints}`;
                } else {
                }
            });

            entry.appendChild(nameRow);
            entry.appendChild(details);
            metaContainer.appendChild(entry);
        });

        meta.currentPoints = currentPoints;
        combatSpellList.appendChild(metaDiv);




        for (const levelKey in spellData.spells) {
            const level = spellData.spells[levelKey];

            const levelDiv = document.createElement("div");
            levelDiv.className = "combatSpellLevel";

            const title = document.createElement("div");
            title.className = "combatSpellLevelTitle";
            title.textContent = level.name;
            levelDiv.appendChild(title);

            const spellsContainer = document.createElement("div");
            spellsContainer.className = "spellsContainer";
            spellsContainer.style.display = "none";
            levelDiv.appendChild(spellsContainer);

            title.addEventListener("click", () => {
                spellsContainer.style.display = spellsContainer.style.display != "block" ? "block" : "";
            });

            const slotTracker = document.createElement("div");
            slotTracker.className = "spellSlotTracker";

            let maxSlots = level.spellSlots;
            let currentSlots = level.currentSlots ?? maxSlots;

            const slotDisplay = document.createElement("span");
            slotDisplay.textContent = `Spell Slots: ${currentSlots} / ${maxSlots}`;
            slotTracker.appendChild(slotDisplay);

            const minusBtn = document.createElement("button");
            minusBtn.textContent = "−";
            minusBtn.addEventListener("click", () => {
                if (currentSlots > 0) currentSlots--;
                slotDisplay.textContent = `Spell Slots: ${currentSlots} / ${maxSlots}`;
            });
            slotTracker.appendChild(minusBtn);

            const plusBtn = document.createElement("button");
            plusBtn.textContent = "+";
            plusBtn.addEventListener("click", () => {
                if (currentSlots < maxSlots) currentSlots++;
                slotDisplay.textContent = `Spell Slots: ${currentSlots} / ${maxSlots}`;
            });
            slotTracker.appendChild(plusBtn);

            spellsContainer.appendChild(slotTracker);

            level.spells.forEach(spell => {
                const entry = document.createElement("div");
                entry.className = "combatSpellEntry";

                const nameRow = document.createElement("div");
                nameRow.className = "combatSpellNameRow";

                const nameLabel = document.createElement("span");
                nameLabel.textContent = spell.name;
                nameRow.appendChild(nameLabel);

                const toggleBtn = document.createElement("button");
                toggleBtn.textContent = "▼";
                toggleBtn.className = "combatSpellToggle";
                nameRow.appendChild(toggleBtn);

                const details = document.createElement("div");
                details.className = "combatSpellDetails";

                details.innerHTML = `
                    <div>School: ${spell.school}</div>
                    <div>Casting Time: ${spell.castingTime}</div>
                    <div>Range: ${spell.range}</div>
                    <div>Target: ${spell.target}</div>
                    <div>Components: ${spell.components.join(", ")}</div>
                    <div>Duration: ${spell.duration}</div>
                    <div>Description: ${spell.description}</div>
                    ${spell.atHigherLevels ? `<div>At Higher Levels: ${spell.atHigherLevels}</div>` : ""}
                `;

                let open = false;
                toggleBtn.addEventListener("click", () => {
                    open = !open;
                    details.style.display = open ? "flex" : "none";
                    toggleBtn.textContent = open ? "▲" : "▼";
                });

                nameLabel.addEventListener("click", () => {
                    if (maxSlots !== -1 && currentSlots > 0) {
                        currentSlots--;
                        slotDisplay.textContent = `Spell Slots: ${currentSlots} / ${maxSlots}`;
                    }

                    if (!dieActive) diceButton.click();
                    if (!combatActive) openCombatButton.click();
                    clearDiceArray.click();

                    spell.damagingDice.forEach(diceId => {
                        const diceDiv = document.getElementById(diceId)?.querySelector("img");
                        if (diceDiv) diceDiv.click();
                    });

                    let spellModifier = 0;
                    spell.nonDiceDamage.forEach(dmg => { spellModifier += dmg; });

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
                                diceScore.innerHTML = outputVal + addedModifier + spellModifier;
                                clearInterval(interval);
                            }
                        }, 60);
                    });
                });

                entry.appendChild(nameRow);
                entry.appendChild(details);
                spellsContainer.appendChild(entry);
            });

            level.currentSlots = currentSlots;

            combatSpellList.appendChild(levelDiv);
        }
    }

    //                    Filling Image Page
    //_____________________________________________________________

    fetch('https://api.are.na/v2/channels/dndrawings?per=100&t=' + Date.now())
        .then(r => r.json())
        .then(data => {
            artPage.innerHTML = '';

            data.contents.forEach(block => {
                let imageUrl =
                    block.image?.display?.url ||
                    block.image?.large?.url ||
                    block.image?.original?.url ||
                    block.attachment?.url ||
                    (block.source?.url?.match(/\.(jpg|jpeg|png|gif|webp)$/i) && block.source.url);

                if (!imageUrl) return;

                const img = document.createElement('img');
                img.src = imageUrl;
                img.loading = 'lazy';

                img.addEventListener('click', () => {
                    console.log("Aaaaaaaaaaa")
                    lightboxContainer.style.display = 'flex';
                    lightboxImg.src = img.src;
                });

                artPage.appendChild(img);
            });
        })
    .catch(() => {});    

    artPage.addEventListener('click', event => {
        if(event.target.tagName === 'IMG') {
            lightboxContainer.style.display = 'flex';
            lightboxImg.src = event.target.src;
        }
    });

    lightboxContainer.addEventListener('click', () => {
        lightboxContainer.style.display = 'none';
        lightboxImg.src = '';
    });
    populateCharacterSheet(characterData);

});

const spellData = {
    "spellcasting": {
        "dc": 16,
        "atk": 8
    },
    "metaMagic": {
        "spells": [
            {
                "name": "Heightened",
                "description": "When you cast a spell that forces a creature to make a saving throw to resist its effects, you can spend 3 sorcery points to give one target of the spell disadvantage on its first saving throw made against the spell.",
                "cost": 3
            },
            {
                "name": "Quickened",
                "description": "When you cast a spell that has a casting time of 1 action, you can spend 2 sorcery points to change the casting time to 1 bonus action for this casting.",
                "cost": 2
            }
        ],
        "name:": "Meta Magic",
        "spellSlots": 7
    },
    "spells": {
        "level_0": {
            "name": "Cantrips",
            "spells": [
                {
                    "name": "Mage Armor",
                    "school": "Abjuration",
                    "castingTime": "1 action",
                    "range": "Touch",
                    "target": "A willing creature not wearing armor",
                    "components": ["V", "S", "M (a piece of cured leather)"],
                    "duration": "8 hours",
                    "description": "You touch a willing creature who isn’t wearing armor, and a protective magical force surrounds it until the spell ends. The target’s base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Mage Hand",
                    "school": "Conjuration",
                    "castingTime": "1 action",
                    "range": "30 feet",
                    "target": "A point you choose within range",
                    "components": ["V", "S"],
                    "duration": "1 minute",
                    "description": "A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again. You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it. The hand can't attack, activate magic items, or carry more than 10 pounds.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Fire Bolt",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "120 feet",
                    "target": "A creature or object within range",
                    "components": ["V", "S"],
                    "duration": "Instantaneous",
                    "description": "You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried. This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).",
                    "atHigherLevels": "",
                    "damagingDice": ["d10", "d10"],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Shape Water",
                    "school": "Transmutation",
                    "castingTime": "1 action",
                    "range": "30 feet",
                    "target": "An area of water fitting within a 5-foot cube",
                    "components": ["S"],
                    "duration": "Instantaneous or 1 hour",
                    "description": "You choose an area of water that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:\n\n• You instantaneously move or otherwise change the flow of the water as you direct, up to 5 feet in any direction. This movement doesn't have enough force to cause damage.\n• You cause the water to form into simple shapes and animate at your direction. This change lasts for 1 hour.\n• You change the water's color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hour.\n• You freeze the water, provided that there are no creatures in it. The water unfreezes in 1 hour.\n\nIf you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Thunderclap",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "Self (5-foot radius)",
                    "target": "All creatures other than you within 5 feet",
                    "components": ["S"],
                    "duration": "Instantaneous",
                    "description": "You create a burst of thunderous sound, which can be heard 100 feet away. Each creature other than you within 5 feet of you must make a Constitution saving throw. On a failed save, the creature takes 1d6 thunder damage.\n\nAt Higher Levels. The spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
                    "atHigherLevels": "",
                    "damagingDice": ["d06", "d06"],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Mind Sliver",
                    "school": "Enchantment",
                    "castingTime": "1 action",
                    "range": "60 feet",
                    "target": "One creature you can see within range",
                    "components": ["V"],
                    "duration": "1 round",
                    "description": "You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take 1d6 psychic damage and subtract 1d4 from the next saving throw it makes before the end of your next turn.",
                    "atHigherLevels": "This spell's damage increases by 1d6 when you reach certain levels: 5th level (2d6), 11th level (3d6), and 17th level (4d6).",
                    "damagingDice": ["d06", "d06"],
                    "otherDice": ["d04"],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": -1
        },
        "level_1": {
            "name": "Level 1",
            "spells": [
                {
                    "name": "Magic Missile",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "120 feet",
                    "target": "A creature of your choice that you can see within range",
                    "components": ["V", "S"],
                    "duration": "Instantaneous",
                    "description": "You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, and you can direct them to hit one creature or several.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 2nd level or higher, the spell creates one more dart for each slot above 1st.",
                    "damagingDice": ["d04", "d04", "d04"],
                    "otherDice": [],
                    "nonDiceDamage": [1, 1, 1]
                },
                {
                    "name": "Shield",
                    "school": "Abjuration",
                    "castingTime": "1 reaction (when you are hit by an attack or targeted by the magic missile spell)",
                    "range": "Self",
                    "target": "Self",
                    "components": ["V", "S"],
                    "duration": "1 round",
                    "description": "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Magnify Gravity",
                    "school": "Transmutation (Dunamancy: Graviturgy)",
                    "castingTime": "1 action",
                    "range": "60 feet",
                    "target": "",
                    "components": ["V", "S"],
                    "duration": "1 round",
                    "description": "The gravity in a 10-foot-radius sphere centered on a point you can see within range increases for a moment. Each creature in the sphere on the turn when you cast the spell must make a Constitution saving throw. On a failed save, a creature takes 2d8 force damage, and its speed is halved until the end of its next turn. On a successful save, a creature takes half as much damage and suffers no reduction to its speed.\n\nUntil the start of your next turn, any object that isn't being worn or carried in the sphere requires a successful Strength check against your spell save DC to pick up or move.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d8 for each slot level above 1st.",
                    "damagingDice": ["d08", "d08"],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Silvery Barbs",
                    "school": "Enchantment",
                    "castingTime": "1 reaction, which you take when a creature you can see within 60 feet of yourself succeeds on an attack roll, an ability check, or a saving throw",
                    "range": "60 feet",
                    "target": "The triggering creature and one other creature you can see within range (can be yourself)",
                    "components": ["V"],
                    "duration": "Instantaneous",
                    "description": "You magically distract the triggering creature and turn its momentary uncertainty into encouragement for another creature. The triggering creature must reroll the d20 and use the lower roll. You can then choose a different creature you can see within range (you can choose yourself). The chosen creature has advantage on the next attack roll, ability check, or saving throw it makes within 1 minute. A creature can be empowered by only one use of this spell at a time.",
                    "spellLists": ["Bard", "Sorcerer", "Wizard"],
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": 4
        },
        "level_2": {
            "name": "Level 2",
            "spells": [
                {
                    "name": "Enhance Ability",
                    "school": "Transmutation",
                    "castingTime": "1 action",
                    "range": "Touch",
                    "target": "A creature",
                    "components": ["V", "S", "M (Fur or a feather from a beast)"],
                    "duration": "Up to 1 hour",
                    "description": "You touch a creature and bestow upon it a magical enhancement. Choose one of the following effects; the target gains that effect until the spell ends.\n- Bear's Endurance: The target has advantage on Constitution checks. It also gains 2d6 temporary hit points, which are lost when the spell ends.\n- Bull's Strength: The target has advantage on Strength checks, and their carrying capacity doubles.\n- Cat's Grace: The target has advantage on Dexterity checks. It also doesn't take damage from falling 20 feet or less if it isn't incapacitated.\n- Eagle's Splendor: The target has advantage on Charisma checks.\n- Fox's Cunning: The target has advantage on Intelligence checks.\n- Owl's Wisdom: The target has advantage on Wisdom checks.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 3rd level or higher, you can target one additional creature for each slot level above 2nd.",
                    "damagingDice": [],
                    "otherDice": ["d06", "d06"],
                    "nonDiceDamage": []
                },
                {
                    "name": "Misty Step",
                    "school": "Conjuration",
                    "castingTime": "1 bonus action",
                    "range": "Self",
                    "target": "Self",
                    "components": ["V"],
                    "duration": "Instantaneous",
                    "description": "Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space that you can see.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Suggestion",
                    "school": "Enchantment",
                    "castingTime": "1 action",
                    "range": "30 feet",
                    "target": "A creature you can see within range that can hear and understand you",
                    "components": ["V", "M (A snake's tongue and either a bit of honeycomb or a drop of sweet oil)"],
                    "duration": "Up to 8 hours",
                    "description": "You suggest a course of activity (limited to a sentence or two) and magically influence a creature you can see within range that can hear and understand you. Creatures that can't be charmed are immune to this effect. The suggestion must be worded in such a manner as to make the course of action sound reasonable. Asking the creature to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act ends the spell.\n\nThe target must make a Wisdom saving throw. On a failed save, it pursues the course of action you described to the best of its ability. The suggested course of action can continue for the entire duration. If the suggested activity can be completed in a shorter time, the spell ends when the subject finishes what it was asked to do.\n\nYou can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a knight give her warhorse to the first beggar she meets. If the condition isn't met before the spell expires, the activity isn't performed.\n\nIf you or any of your companions damage the target, the spell ends.",
                    "atHigherLevels": "",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": 3
        },
        "level_3": {
            "name": "Level 3",
            "spells": [
                {
                    "name": "Fireball",
                    "school": "Evocation",
                    "castingTime": "1 action",
                    "range": "150 feet",
                    "target": "A point you choose within range",
                    "components": ["V", "S", "M (A tiny ball of bat guano and sulfur)"],
                    "duration": "Instantaneous",
                    "description": "A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw. A target takes 8d6 fire damage on a failed save, or half as much damage on a successful one. The fire spreads around corners. It ignites flammable objects in the area that aren't being worn or carried.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 4th level or higher, the damage increases by 1d6 for each slot level above 3rd.",
                    "damagingDice": ["d06","d06","d06","d06","d06","d06","d06","d06"],
                    "otherDice": [],
                    "nonDiceDamage": []
                },
                {
                    "name": "Counterspell",
                    "school": "Abjuration",
                    "castingTime": "1 reaction (which you take when you see a creature within 60 feet of you casting a spell)",
                    "range": "60 feet",
                    "target": "A creature in the process of casting a spell",
                    "components": ["S"],
                    "duration": "Instantaneous",
                    "description": "You attempt to interrupt a creature in the process of casting a spell. If the creature is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level or higher, make an ability check using your spellcasting ability. The DC equals 10 + the spell's level. On a success, the creature's spell fails and has no effect.",
                    "atHigherLevels": "When you cast this spell using a spell slot of 4th level or higher, the interrupted spell has no effect if its level is less than or equal to the level of the spell slot you used.",
                    "damagingDice": [],
                    "otherDice": [],
                    "nonDiceDamage": []
                }
            ],
            "spellSlots": 3
        }
    }
}
const characterData = {
    "basicInfo": {
        "charName": "Terro Meltan",
        "races": [
            { "name": "Human", "subrace": "" }
        ],
        "classes": [
            { "name": "Sorcerer", "subclass": "Wild Magic", "lvl": 5 }
        ],
        "background": "Sailor",
        "alignment": "Lawful Neutral",
        "playName": "Isai M.",
        "experiencePoints": 0
    },
    "abilityScores": {
        "strength": 7,
        "dexterity": 12,
        "constitution": 13,
        "intelligence": 13,
        "wisdom": 13,
        "charisma": 4,
    },
    "modifiers": {
        "strength": -2,
        "dexterity": 1,
        "constitution": 1,
        "intelligence": 1,
        "wisdom": 1,
        "charisma": 4
    },
    "inspiration": 0,
    "profBonus": 3,
    "savingThrows": {
        "strength": -1,
        "dexterity": 2,
        "constitution": 5,
        "intelligence": 2,
        "wisdom": 2,
        "charisma": 8
    },
    "skills": {
        "acrobatics": 1,
        "animal handling": 1,
        "arcana": 4,
        "athletics": 1,
        "deception": 4,
        "history": 1,
        "insight": 1,
        "intimidation": 7,
        "investigation": 1,
        "medicine": 1,
        "nature": 1,
        "perception": 4,
        "performance": 4,
        "persuasion": 7,
        "religion": 1,
        "sleight of hand": 1,
        "stealth": 1,
        "survival": 1
    },    
    "passiveWisdom": 14,
    "otherProficiencies": [],
    "languages": [
        { "name": "Common" }
    ],
    "combat": {
        "armorClass": 11,
        "initiative": 1,
        "speed": 30,
        "hitPoints": {
            "current": 0,
            "max": 0,
            "temporary": 0
        },
        "hitDice": {
            "type": "d06",
            "total": 0,
            "remaining": 0
        },
        "deathSaves": {
            "success": 0,
            "failure": 0
        }
    },
    "equipment": [
        {
            "name": "Mana Marble",
            "quantity": 2,
            "description": "Replenishes all spell slots"
        },
        {
            "name": "Disintegration Staff",
            "quantity": 1,
            "description": ""
        },
        {
            "name": "Light-Up Short Boots (Sketchers)",
            "quantity": 1,
            "description": "Shoes that can light up, potentially prevents levitation"
        }
    ],
    "personality": {
        "traits": [
            { "desc": "" }
        ],
        "ideals": [
            { "desc": "" }
        ],
        "bonds": [
            { "desc": "" }
        ],
        "flaws": [
            { "desc": "" }
        ]
    },
    "notes": [
        { "text": "" }
    ],
    "feats": [
        { "name": "Eldritch Adept" }
    ],
    "traits": [
        { "name": "" }
    ],
    "attacks": [
        {
            "name": "",
            "type": "",
            "atkBonus": "",
            "damage": {
                "form": "",
                "type": ""
            },
            "range": "",
            "properties": ""
        }
    ],
    "spells": [
        {
            "name": "",
            "level": 0,
            "damage": {
                "form": "",
                "type": ""
            },
            "range": "",
            "scales": true
        }
    ]
}