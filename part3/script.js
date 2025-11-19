document.addEventListener("DOMContentLoaded", function() {
  const toDiceButton = document.getElementById("toDice");
  

  toDiceButton.addEventListener("click", function() {
    const allDiceMenu = document.getElementById("allDice");
    if (allDiceMenu.style.display === ""){
        allDiceMenu.style.display = "inline-flex";
    }
    else{
        allDiceMenu.style.display = "";
    }
  });

});
