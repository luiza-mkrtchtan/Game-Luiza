// Էլեմենտների հղումներ
var menu1 = document.getElementById("menu1");
var menu2 = document.getElementById("menu2");
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var world = document.getElementById("world");
var container = document.getElementById("container");

var gameStarted = false;

// Մենյուի Նավիգացիա
button1.onclick = function() {
    buttonSound.play();
    menu1.style.display = "none";
    gameStarted = true;
    container.requestPointerLock(); // Ակտիվացնում ենք մկնիկը խաղը սկսելիս
}

button2.onclick = function() {
    buttonSound.play();
    menu1.style.display = "none";
    menu2.style.display = "flex";
}

button3.onclick = function() {
    buttonSound.play();
    menu2.style.display = "none";
    menu1.style.display = "flex";
}