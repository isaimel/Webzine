document.addEventListener("DOMContentLoaded", function() {

    const characterData = {"basicInfo":{"charName":"Terro Meltan","races":[{"name":"Elf", "subrace":"Wood Elf"}, {"name":"Human", "subrace":""}],"classes":[{"name":"Sorcerer","subclass": "","lvl":5}, {"name":"Sorcerer","subclass":"Wild Magic","lvl":5}],"background":"Sailor","alignment":"Lawful Neutral", "playName": "Isai M.","experiencePoints":0},"attributes":{"strScore":7,"strMod":-2,"dexScore":12,"dexMod":1,"conScore":13,"conMod":1,"intScore":13,"intMod":1,"wisScore":13,"wisMod":1,"chaScore":4,"chaMod":4},"inspiration":0,"profBonus":3,"savingThrows":{"str":-1,"dex":2,"con":5,"int":2,"wis":2,"cha":8},"skills":{"acr":1,"anh":1,"arc":4,"ath":1,"dec":4,"his":1,"ins":1,"intm":7,"inv":1,"med":1,"nat":1,"prc":4,"prf":4,"prs":7,"rel":1,"slt":1,"ste":1,"sur":1},"passiveWisdom":14,"otherProficiencies":[],"languages":[{"name":"Common"}],"combat":{"armorClass":11,"initiative":1,"speed":30,"hitPoints":{"current":0,"max":0,"temporary":0},"hitDice":{"type":"d06","total":0,"remaining":0},"deathSaves":{"success":0,"failure":0}},"equipment":[{"name":"Mana Marble","quantity":2,"description":"Replenishes all spell slots"},{"name":"Disintegration Staff","quantity":1,"description":""},{"name":"Light-Up Short Boots (Sketchers)","quantity":1,"description":"Shoes that can light up, potentially prevents levitation"}],"personality":{"traits":[{"desc":""}],"ideals":[{"desc":""}],"bonds":[{"desc":""}],"flaws":[{"desc":""}]},"notes":[{"text":""}],"feats":[{"name":"Eldritch Adept"}],"traits":[{"name":""}],"attacks":[{"name":"","type":"","atkBonus":"","damage":{"form":"","type":""},"range":"","properties":""}],"spells":[{"name":"","level":0,"damage":{"form":"","type":""},"range":"","scales":true}]};

    const data = characterData;

    document.querySelector("#biCharName div").textContent = data.basicInfo.charName;

    createDropdown("#biClsLvl", data.basicInfo.classes, formatClass)

    document.querySelector("#biBckg div").textContent = data.basicInfo.background;

    document.querySelector("#biPlayName div").textContent = data.basicInfo.playName;

    createDropdown("#biRace", data.basicInfo.races, formatRace)

    document.querySelector("#biAlign div").textContent = data.basicInfo.alignment;

    document.querySelector("#biExp div").textContent = data.basicInfo.experiencePoints;

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
});

