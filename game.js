var candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
var board = [];
var row = 9;
var col = 9;
var score = 0;

var currTile;
var otherTile;

window.onload = function () {
    startGame();
    window.setInterval(function () {
        crushCandy();
        slideCandy();
        genCandy();
    }, 100);
};
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}
function startGame() {
    for (let r = 0; r < row; r++) {
        let ro = [];
        for (let c = 0; c < col; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragEnter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
            ro.push(tile);
        }
        board.push(ro);
    }
    console.log(board);
}

function dragStart() {
    currTile = this;
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() { }
function dragDrop() {
    otherTile = this;
}
function dragEnd() {
    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }
    let currCoord = currTile.id.split("-");
    let r = parseInt(currCoord[0]);
    let c = parseInt(currCoord[1]);

    let otherCoord = otherTile.id.split("-");
    let r2 = parseInt(otherCoord[0]);
    let c2 = parseInt(otherCoord[1]);

    let moveLeft = c2 == c - 1 && r == r2;
    let moveRight = c2 == c + 1 && r == r2;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdj = moveDown || moveLeft || moveRight || moveUp;

    if (isAdj) {
        let currimg = currTile.src;
        let otherimg = otherTile.src;
        currTile.src = otherimg;
        otherTile.src = currimg;
        let valid = checkValid();
        if (!valid) {
            let currimg = currTile.src;
            let otherimg = otherTile.src;
            currTile.src = otherimg;
            otherTile.src = currimg;
        }
    }
}
function crushCandy() {
    crushThree();
    document.getElementById("score").innerText=score;
}
function crushThree() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col - 2; c++) {
            let c1 = board[r][c];
            let c2 = board[r][c + 1];
            let c3 = board[r][c + 2];

            let c1src = c1.src.split("/").pop();
            let c2src = c2.src.split("/").pop();
            let c3src = c3.src.split("/").pop();
            if (c1src === c2src && c2src === c3src && c1src !== "blank.png") {
                c1.src = "./images/blank.png";
                c2.src = "./images/blank.png";
                c3.src = "./images/blank.png";
                score+=30;
            }
        }
    }
    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row - 2; r++) {
            let c1 = board[r][c];
            let c2 = board[r + 1][c];
            let c3 = board[r + 2][c];

            let c1src = c1.src.split("/").pop();
            let c2src = c2.src.split("/").pop();
            let c3src = c3.src.split("/").pop();
            if (c1src === c2src && c2src === c3src && c1src !== "blank.png") {
                c1.src = "./images/blank.png";
                c2.src = "./images/blank.png";
                c3.src = "./images/blank.png";
                score+=30;
            }
        }
    }
}

function checkValid() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col - 2; c++) {
            let c1 = board[r][c];
            let c2 = board[r][c + 1];
            let c3 = board[r][c + 2];

            let c1src = c1.src.split("/").pop();
            let c2src = c2.src.split("/").pop();
            let c3src = c3.src.split("/").pop();
            if (c1src === c2src && c2src === c3src && c1src !== "blank.png") {
                return true;
            }
        }
    }
    for (let c = 0; c < col; c++) {
        for (let r = 0; r < row - 2; r++) {
            let c1 = board[r][c];
            let c2 = board[r + 1][c];
            let c3 = board[r + 2][c];

            let c1src = c1.src.split("/").pop();
            let c2src = c2.src.split("/").pop();
            let c3src = c3.src.split("/").pop();
            if (c1src === c2src && c2src === c3src && c1src !== "blank.png") {
                return true;
            }
        }
    }
    return false;
}

function slideCandy(){
    for(let c=0;c<col;c++){
        let i=row-1;
        for(let r=col-1;r>=0;r--){
            if(!board[r][c].src.includes("blank")){
                board[i][c].src = board[r][c].src;
                i-=1;
            }
        }
        for(let r=i;r>=0;r--){
            board[r][c].src="./images/blank.png";
        }
    }
}
function genCandy(){
    for(let c=0;c<col;c++){
        if(board[0][c].src.includes("blank")){
            board[0][c].src="./images/"+randomCandy()+".png";
        }
    }
}
