const select = document.querySelector(".box"),
SelectX = select.querySelector(".playerX"),
SelectO = select.querySelector(".playerO");
const playBoard = document.querySelector(".play-board");
const all = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const result = document.querySelector(".result-box");
const wonText = result.querySelector(".won-text");
const btn = result.querySelector("button");

$(".play-board").hide();
$(".result-box").hide();

window.onload = ()=>{
for (let i = 0; i < all.length; i++) {
    all[i].setAttribute("onclick", "clicked(this)");
}

    SelectX.onclick = ()=>{
        select.classList.add("hide");
        $('.play-board').delay(1000).fadeIn();
        
    }

    SelectO.onclick = ()=>{
        select.classList.add("hide");
        $('.play-board').delay(1000).fadeIn();
        players.setAttribute("class", "players active player");
    }
}

let playerSign = "X";
let run = true;

function clicked(element){
    if(players.classList.contains("player")){
        element.innerHTML = '<i class = "far fa-circle"></i>';
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign)
    }
    else{
        element.innerHTML = '<i class = "fas fa-times"></i>';
        players.classList.add("active");
        playerSign = "X"
        element.setAttribute("id", playerSign)
    }
    winner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let delay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
    bot(run);
    }, delay);
}

function bot(run){
    if (run) {
        playerSign = "O"
    let array = [];
    for (let i = 0; i < all.length; i++) {
        if (all[i].childElementCount == 0) {
            array.push(i);
        }
    }
    let random = array[Math.floor(Math.random() * array.length)];
    if (array.length>0) {
        if(players.classList.contains("player")){
            all[random].innerHTML = '<i class = "fas fa-times"></i>';
            players.classList.remove("active");
            playerSign = "X";
            all[random].setAttribute("id", playerSign);
        }
        else{
            all[random].innerHTML = '<i class = "far fa-circle"></i>';
            players.classList.remove("active");
            playerSign = "O"
            all[random].setAttribute("id", playerSign);
        }
        winner();
    }
    playerSign = "X";
    playBoard.style.pointerEvents = "auto";
    all[random].style.pointerEvents = "none";
    }
}

function getClass(idname){
    return document.querySelector(".box" + idname).id;
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function winner(){
    if(checkClass(1, 2, 3, playerSign) || checkClass(4, 5, 6, playerSign) || checkClass(7, 8, 9, playerSign) || checkClass(1, 4, 7, playerSign) || checkClass(2, 5, 8, playerSign) || checkClass(3, 6, 9, playerSign) || checkClass(1, 5, 9, playerSign) || checkClass(3, 5, 7, playerSign)){
        run = false;
        bot(run);
        $('.play-board').delay(1000).fadeOut();
        $('.result-box').delay(2000).fadeIn();
        wonText.innerHTML = ` Player <b style="margin: 0 5px">${playerSign}</b> won the game.`
    }
    else{
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            run = false;
            bot(run);
            $('.play-board').delay(1000).fadeOut();
            $('.result-box').delay(2000).fadeIn();
            wonText.innerHTML = `Match has been drawn.`
        }
    }
}

btn.onclick = ()=>{
    window.location.reload();
}