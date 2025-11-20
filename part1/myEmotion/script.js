document.addEventListener("DOMContentLoaded", () => {
        const corrLabelImg = [
        ["bedHover", "bedImg", "deeppink"],
        ["showerHover", "showerImg", "cyan"],
        ["carHover", "carImg", "gold"],
        ["couchHover", "couchImg", "red"],
        ["stageHover", "stageImg", "darkorchid"]
    ];

    const baseImg = document.getElementById("baseImg");

    var arrayLength = corrLabelImg.length;
    for (let i = 0; i < arrayLength; i++) {
        const label = document.getElementById(corrLabelImg[i][0]);
        const corrImg = document.getElementById(corrLabelImg[i][1]);
        label.addEventListener("mouseenter", () => {
            var allImg = document.querySelectorAll('.images img');
            var allImgLength = allImg.length;
            for (var a = 0; a < allImgLength; a++) {
                allImg[a].style.display = "none";
            }
            corrImg.style.display = "block";
            document.body.style.color = corrLabelImg[i][2];        
        });
    }
});
