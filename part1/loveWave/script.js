document.addEventListener("DOMContentLoaded", () => {
    const corrText = [
    ["firstLove", "Sex", "Off", "Sex: The physical expression of love and intimacy between partners; often associated with desire, connection, and physical closeness.", "Freek'n You"],
    ["secondLove", "Obsession", "Off", "Obsession: An all-consuming fixation on someone; intense attraction that can cross into unhealthy attachment or dependency.", "Delilah"],
    ["thirdLove", "Toxicity", "Off", "Toxicity: The presence of harmful behaviors or emotional patterns that damage love, such as manipulation, jealousy, or control.", "Judas"],
    ["fourthLove", "Yearning", "Off", "Yearning: A deep emotional longing for someone's love or affection, especially when it's unfulfilled or distant.", "Happy Together"],
    ["fifthLove", "Devotion", "Off", "Devotion: A selfless, loyal, and enduring commitment to another person, often characterized by care, sacrifice, and faithfulness.", "Keep On Lovin' You"],
    ["sixthLove", "Passion", "Off", "Passion: Intense emotion and desire that fuels attraction and romance; can be both creative and destructive in love.", "You're the Inspiration" ],
    ["seventhLove", "Defeat", "Off", "Defeat: The emotional state of feeling rejected, heartbroken, or unable to maintain a relationship; love lost or unreturned.", "Angeleyes"],
    ["eighthLove", "Frustration", "Off", "Fleeting: A love or connection that is brief and temporary, fading quickly despite its intensity.", "Communication"],
    ["ninthLove", "Hope", "Off", "Hope: The belief or feeling that love will flourish or return; the optimism that sustains the heart despite distance or pain.", "Last Christmas"],
    ["tenthLove", "Distant", "Off", "Distant: A form of love separated by emotional or physical space; affection that feels unreachable or detached.", "A Man Without Love" ]
    ];
    let totalClicks = 0;

    var arrayLength = corrText.length;
    for (let i = 0; i < arrayLength; i++) {
        const label = document.getElementById(corrText[i][0]);
        label.addEventListener("click", () => {
            var offOrOn = corrText[i][2];
            const songLabel = document.getElementById("songChoice");
            for (let j = 0; j < arrayLength; j++) {
                const otherLabel = document.getElementById(corrText[j][0]);
                otherLabel.innerText = "Love";
                corrText[j][2] = "Off";
                songLabel.innerText = "";
            }
            if (offOrOn == "Off") {
                label.innerText = corrText[i][1];
                corrText[i][2] = "On";
                const def = document.getElementById("headerDef");
                def.innerText = corrText[i][3];
                songLabel.innerText = corrText[i][4];
            } else {
                label.innerText = "Love";
                corrText[i][2] = "Off";
                const def = document.getElementById("headerDef");
                def.innerText = "Love: an intense feeling of deep affection.";
                
            }
        });
    }
});