document.addEventListener("DOMContentLoaded", () => {
    const colors = ["deeppink", "cyan", "gold", "red", "darkorchid"];

    const form = document.getElementById("myForm");
    const textbox = document.getElementById('textbox');
    textbox.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            form.requestSubmit();
        }
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const userInput = textbox.value.trim();

        let fontSize = (Math.floor(Math.random() * 10)+1);
        let colorIndex = Math.floor(Math.random() * colors.length);

        var div = document.createElement("div");
        div.style.fontSize = fontSize + "rem";
        div.style.color = colors[colorIndex];
        div.innerText = userInput;
        div.style.minWidth = "fit-content"
        document.body.appendChild(div);

        textbox.value = "";

    });
});