document.addEventListener("DOMContentLoaded", () => {
  fetch('assets/files/terroMeltan.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      const info = data.basicInfo;

      // Character Name
      document.querySelector("#biCharName span").textContent = info.charName || "";

      // Class & Level (supports multiple classes)
      if (info.classes && info.classes.length > 0) {
        const classText = info.classes.map(c => {
          const subclassPart = c.subclass ? ` (${c.subclass})` : "";
          return `${c.name}${subclassPart} ${c.lvl}`;
        }).join(", ");
        document.querySelector("#biCls\\&Lvl span").textContent = classText;
      }

      // Background
      document.querySelector("#biBckg span").textContent = info.background || "";

      // Player Name (optional)
      document.querySelector("#biPlayName span").textContent = info.playerName || "";

      // Races (support multiple)
      if (info.races && info.races.length > 0) {
        const raceText = info.races.map(r => r.name).join(", ");
        document.querySelector("#biRace span").textContent = raceText;
      }

      // Alignment
      document.querySelector("#biAlign span").textContent = info.alignment || "";

      // Experience Points
      document.querySelector("#biExp span").textContent = info.experiencePoints || 0;
    })
    .catch(err => console.error('Error loading character JSON:', err));
});
