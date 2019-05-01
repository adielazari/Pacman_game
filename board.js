// var context = canvas.getContext("2d");
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var direction=4;
var board_width=20;
var board_height=10;
var number_points=90;
var number_ghosts=3;
var points_5_color="red";
var points_15_color="blue";
var points_25_color="green";
var pacman = {x:0, y:0, color:"yellow"};
var ghost_red = {x:1, y:1,sprite:85};
var ghost_pink = {x:1, y:board_height-2,sprite:104};
var ghost_yellow = {x:board_width-2, y:1,sprite:146};
var msPacman = {x:board_height-2, y:1};
var health = {health_left:3,sprite:16};
var showmsPacman=true;
var powerup = {x:0,y:0};
var disco=false;
var keyup;
var keydownn;
var keyleft;
var keyright;
var theme;
var chomp;
var settings;
// var ghost_pink = {x:board_height-2, y:board_height:1};
var free=new Array();
var sprites=new Image();
sprites.src="sprites3.png";
var hearts = new Image();
hearts.src="hearts.png";
var ball5 = new Image();
ball5.src="ball5.png";


function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


function User_points(num){
    number_points=num;
}
function point(type,color,value){
    this.type=type;
    this.color=color;
    this.value=value;
}
var pointsArray = new Array();

shuffle(pointsArray);

function restart(){
    document.getElementById('endGame').style.display='none';
    health.health_left=3;
     ghost_red.x=1;
     ghost_red.y=1;
     ghost_pink.x=1;
     ghost_pink.y=board_height-2;
     ghost_yellow.x=board_width-2;
     ghost_yellow.y=1;
    initgame(settings);
}
function initgame(arr){
    settings=arr;
    theme = new sound("pacman.mp3");
    chomp = new sound("pacman_chomp.wav");
    theme.play();

    clearInterval(interval);
    keysDown = {};
    // keysDown[arr[0]]=true;
    // keysDown[arr[1]]=true;
    // keysDown[arr[2]]=true;
    // keysDown[arr[3]]=true;
    keyup=arr[0];
    keydownn=arr[1];
    keyright=arr[2];
    keyleft=arr[3];

    // keysDown.push(arr[0]);
    // keysDown.push(arr[1]);
    // keysDown.push(arr[2]);
    // keysDown.push(arr[3]);
    addEventListener("keydown", function (e) {
        keysDown[e.code] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.code] = false;
    }, false);
    interval = setInterval(UpdatePosition, 300);
    Start(arr);
}
function initPointsArray(arr){
    // 0:up 1:down 2:right 3:left 4:num_balls 5:num_ghosts
    // 6:5_points_color 7:15_points_color 8: 25_points_color 9:time in seconds
        for (var i = 0; i < number_points*0.6; i++) {
            pointsArray.push(new point(60,arr[6],5));
        }
        for (i=0; i < number_points*0.3; i++) {
            pointsArray.push(new point(30,arr[7],15));

        }
        for (i=0; i< number_points*0.1; i++) {
            pointsArray.push(new point(10,arr[8],25));

        }
    }


function shuffle(a) {
var j, x, i;
for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
}
return a;
}



function Start(arr) {
    // 0:up 1:down 2:right 3:left 4:num_balls 5:num_ghosts
    // 6:5_points_color 7:15_points_color 8: 25_points_color 9:time in seconds


    number_points=arr[4];
    number_ghosts=arr[5];
    initPointsArray(arr);
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var pacman_remain = 1;
    start_time = new Date();

    for (var i = 0; i < board_width; i++) {
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < board_height; j++) {
             if ((i!=10 && j!=4) && ((i === 0 ) || (j==0) || (i==board_width-1)  || (j==board_height-1)) || (i==4 && j==2) || (i==4 && j==3) || (i==6 && j==5) || (i==6 && j==6)) {
                board[i][j] = 4;
            }
            else if ((i==1 && j==1) || (i==1 && j==18)){}
            else {
                    board[i][j]=0;
                }

            }
        }
        free=findRandomEmptyCell(board);
        board[free[0]][free[1]]=2;
        pacman.x=free[0];
        pacman.y=free[1];
        while(pointsArray.length>0){
            free=findRandomEmptyCell(board);
            board[free[0]][free[1]]=pointsArray.pop();
        }

    }
    function startOver() {
        var i = Math.floor((Math.random() * board_width) );
        var j = Math.floor((Math.random() * board_height) );
        while(board[i][j]==4){
            i = Math.floor((Math.random() * board_width) );
            j = Math.floor((Math.random() * board_height) );
        }
        // result=findRandomEmptyCell(board);
        board[pacman.x][pacman.y]=0
        // board[result[0]][result[1]]=2;
        pacman.x=i;
        pacman.y=j;
        board[pacman.x][pacman.y]=2;
        Draw();
    }
    // while (food_remain > 0) {
    //     var emptyCell = findRandomEmptyCell(board);
    //     board[emptyCell[0]][emptyCell[1]] = 1;
    //     food_remain--;
    // }





function findRandomEmptyCell(board) {
    var i = Math.floor((Math.random() * board_width) );
    var j = Math.floor((Math.random() * board_height) );
    while (board[i][j] !== 0) {
        i = Math.floor((Math.random() * board_width) );
        j = Math.floor((Math.random() * board_height));
    }
    return [i, j];
}

/**
 * @return {number}
 */
function GetKeyPressed() {
    if (keysDown[keyup]) {
        return 1;
    }
    if (keysDown[keydownn]) {
        return 2;
    }
    if (keysDown[keyleft]) {
        return 3;
    }
    if (keysDown[keyright]) {
        return 4;
    }
}
var ball ={type:"30",color:"blue",radius:10};
function Draw() {

    // context.clearRect(0, 0, canvas.width, canvas.height); //clean board
    context.fillStyle = "#000000";
    context.fillRect(0,0,canvas.width,canvas.height);
    lblScore.value = score;
    lblTime.value = time_elapsed;

    for (var i = 0; i < board_width; i++) {
        for (var j = 0; j < board_height; j++) {
            var center = new Object();
            value=board[i][j];
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] === 2) {
                if(GetKeyPressed()!=null){
                    direction=GetKeyPressed();
                }
                switch(direction) {
                  case 1:
                  direction=1;
                  context.beginPath();
                  context.arc(center.x, center.y, 30, 7/4*Math.PI, 5/4* Math.PI,false);
                  context.lineTo(center.x, center.y);
                  context.fillStyle = pacman.color; //color
                  context.fill();
                  context.beginPath();
                  context.arc(center.x - 15, center.y + 5, 5, 0, 2 * Math.PI,false);
                  context.fillStyle = "black"; //color
                  context.fill();
                    break;
                  case 2:
                  direction=2;
                  context.beginPath();
                  context.arc(center.x, center.y, 30, 3/4*Math.PI, 0.25 * Math.PI,false);
                  context.lineTo(center.x, center.y);
                  context.fillStyle = pacman.color; //color
                  context.fill();
                  context.beginPath();
                  context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI,false);
                  context.fillStyle = "black"; //color
                  context.fill();
                    break;
                  case 3:
                      direction=3;
                      context.beginPath();
                      context.arc(center.x, center.y, 30,  1.25 * Math.PI, 0.75 * Math.PI,false);
                      context.lineTo(center.x, center.y);
                      context.fillStyle = pacman.color; //color
                      context.fill();
                      context.beginPath();
                      context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI,false);
                      context.fillStyle = "black"; //color
                      context.fill();
                    break;
                  case 4:
                      direction=4;
                      context.beginPath();
                      context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI);
                      context.lineTo(center.x, center.y);
                      context.fillStyle = pacman.color; //color
                      context.fill();
                      context.beginPath();
                      context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI,false);
                      context.fillStyle = "black"; //color
                      context.fill();
                      break;
                  default:
                      context.beginPath();
                      context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI);
                      context.lineTo(center.x, center.y);
                      context.fillStyle = pacman.color; //color
                      context.fill();
                      context.beginPath();
                      context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI,false);
                      context.fillStyle = "black"; //color
                      context.fill();
                      break;
                    // code block
                }



            } else if (board[i][j] instanceof point) {
                context.beginPath();
                // if(board[i][j].value==5){
                    // context.drawImage(ball5,0,0,70,70,center.x,center.y,60,60);
                // }
                context.fillStyle = board[i][j].color; //color
                context.arc(center.x, center.y, ball.radius, 0, 2 * Math.PI); // circle
                context.closePath();
                context.fill();
                context.beginPath();
                context.font = "bold 9px Courier";
                context.fillStyle = 'black'; //color
                context.fillText(board[i][j].value, center.x-5 ,center.y+5, ball.radius*4);
                context.fill();
            } else if (board[i][j] === 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
    context.beginPath();
    context.font = "50px Verdana";
    context.fillStyle = 'black'; //color
    context.fillText("Life", 1*95 ,1*50,130 );
    context.closePath();
    context.fill();


}
function drawGhosts(ghost){
            n=Math.floor(Math.random() * 11) + 1

            if(n>=0 && n<=1.5){
                context.drawImage(sprites,21*0,ghost.sprite,21,21,60*ghost.x,60*ghost.y,60,60);
            }
            else if (n>1.5 && n<=3){
                context.drawImage(sprites,21*1,ghost.sprite,21,21,60*ghost.x,60*ghost.y,60,60);
            }
            else if(n>3 && n<=4.5){
                context.drawImage(sprites,21*2,ghost.sprite,21,21,60*ghost.x,60*ghost.y,60,60);
            }
            else if(n>4.5 && n<=6){
                context.drawImage(sprites,21*3,ghost.sprite,21,21,60*ghost.x,60*ghost.y,60,60);
            }
            else if(n>6 && n<=7.5){
                context.drawImage(sprites,21*4,ghost.sprite,21,21,60*ghost.x,60*ghost.y,60,60);
            }
            else if(n>7.5 && n<=8.5){
                context.drawImage(sprites,21*5,ghost.sprite,21,21,60*ghost.x,60*ghost.y,60,60);
            }
            else {
                context.drawImage(sprites,21*5,ghost.sprite,21,21,60*ghost.x,60*ghost.y,60,60);
            }
            // context.drawImage(sprites,21*7,85,21,21,60*ghost.x,60*ghost.y,60,60);

}
function drawHearts(){
    // canvas.font="bold 90px Arial";
    // canvas.fillText("Hello World", 1*60, 0);

    switch(health.health_left){
//             ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);

        case 1:context.drawImage(hearts,16*1,0,16,16,60*4,0,60,60);
                break;
        case 2:context.drawImage(hearts,16*1,0,16,16,60*4,0,60,60);
               context.drawImage(hearts,16*1,0,16,16,60*5,0,60,60);
               break;
        case 3:context.drawImage(hearts,16*1,0,16,16,60*4,0,60,60);
               context.drawImage(hearts,16*1,0,16,16,60*5,0,60,60);
               context.drawImage(hearts,16*1,0,16,16,60*6,0,60,60);
               break;
    }

}
function drawMsPacman(){
    n=Math.floor(Math.random() * 11) + 1;

    if(n>=0 && n<=1.5){
        context.drawImage(sprites,21*4,0,21,21,60*msPacman.x,60*msPacman.y,60,60);
    }
    else if (n>1.5 && n<=3){
        context.drawImage(sprites,21*5,0,19,21,60*msPacman.x,60*msPacman.y,60,60);
    }
    else if(n>3 && n<=4.5){
        context.drawImage(sprites,21*4,21,21,21,60*msPacman.x,60*msPacman.y,60,60);
    }
    else if(n>4.5 && n<=6){
        context.drawImage(sprites,21*5,21,21,21,60*msPacman.x,60*msPacman.y,60,60);
    }
    else if(n>6 && n<=7.5){
        context.drawImage(sprites,21*6,21,21,21,60*msPacman.x,60*msPacman.y,60,60);
    }
    else if(n>7.5 && n<=8.5){
        context.drawImage(sprites,21*4,42,21,21,60*msPacman.x,60*msPacman.y,60,60);
    }
    else {
        context.drawImage(sprites,21*5,42,21,21,60*msPacman.x,60*msPacman.y,60,60);
    }
}
function drawPowerUp(){
    if(powerup.x==0 && powerup.y==0){
        free=findRandomEmptyCell(board);
        powerup.x=free[0];
        powerup.y=free[1];
    }

    context.drawImage(sprites,21*8,165,21,21,60*powerup.x,60*powerup.y,60,60);
}

function UpdatePositionMsPacman(){
    n=Math.floor(Math.random() * 4) + 1;
    if(n>=0 && n<=1 && isValidPath(msPacman.x,msPacman.y-1)){
        msPacman.y=msPacman.y-1;
    }
    else if(n>1 && n<=2 && isValidPath(msPacman.x,msPacman.y+1)){
        msPacman.y=msPacman.y+1;
    }
    else if(n>1 && n<=2 && isValidPath(msPacman.x-1,msPacman.y)){
        msPacman.y=msPacman.x-1;
    }
    else if(n>1 && n<=2 && isValidPath(msPacman.x+1,msPacman.y)){
        msPacman.y=msPacman.x+1;
    }
}

function isValidPath(x,y){
    return board[x][y]!=4;
}
function checkCollision(figure1 , figure2){
    return figure1.x==figure2.x && figure1.y==figure2.y;
}
function UpdatePositionGhost(ghost){
    direction =getShortestValidPath(ghost);
    ghost.x=direction[0];
    ghost.y=direction[1];
    if(ghost.x==pacman.x && ghost.y==pacman.y){
        health.health_left--;
        score=score-10;
        startOver();
    }
}
function pacmanRandomcolor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getShortestValidPath(ghost){
    direction = new Array();
    up=990;
    down=990;
    left=990;
    right=990;

    if(isLegal(ghost.x,ghost.y-1)){
        up=Math.sqrt(Math.pow(ghost.x-pacman.x, 2)+Math.pow(ghost.y-1-pacman.y, 2));
    }
    if(isLegal(ghost.x,ghost.y+1)){
        down=Math.sqrt(Math.pow(ghost.x-pacman.x, 2)+Math.pow(ghost.y+1-pacman.y, 2));
    }
    if(isLegal(ghost.x-1,ghost.y)){
        left=Math.sqrt(Math.pow(ghost.x-1-pacman.x, 2)+Math.pow(ghost.y-pacman.y, 2));
    }
    if(isLegal(ghost.x+1,ghost.y)){
        right=Math.sqrt(Math.pow(ghost.x+1-pacman.x, 2)+Math.pow(ghost.y-pacman.y, 2));
    }

    min=Math.min(up,Math.min(down,Math.min(left,Math.min(right))));
    if(min==right){
        direction.push(ghost.x+1);direction.push(ghost.y);
        return direction;
    }
    else if (min==left){
        direction.push(ghost.x-1);direction.push(ghost.y);
        return direction;
    }
    else if (min==down){
        direction.push(ghost.x);direction.push(ghost.y+1);
        return direction;
    }
    else {
        direction.push(ghost.x);direction.push(ghost.y-1);
        return direction;
    }
}

function isLegal(x,y){
    if(x>=0 && y >= 0  && x < board_width && y < board_height){
        return board[x][y]!=4;
    }

}

function UpdatePosition() {
    board[pacman.x][pacman.y] = 0;
    var x = GetKeyPressed();
    if (x === 1) {//up
        if(pacman.y == 0 && pacman.x==10){
            pacman.y=board_height-1;
        }
        else if (pacman.y > 0 && board[pacman.x][pacman.y - 1] !== 4) {
            board[pacman.x][pacman.y] = 0;
            pacman.y--;
        }
    }
    if (x === 2) {//down
        if(pacman.y+1 > board_height-1){
            board[pacman.x][pacman.y] = 0;
            pacman.y=0;
        }
        else if (pacman.y < board_height-1 && board[pacman.x][pacman.y + 1] !== 4) {
            board[pacman.x][pacman.y] = 0;
            pacman.y++;
        }
    }
    if (x === 3) {//left
        if(pacman.x == 0 && pacman.y==4 ){
            pacman.x=board_width-1;
        }
        else if (pacman.x > 0 && board[pacman.x - 1][pacman.y] !== 4) {
            board[pacman.x][pacman.y] = 0;
            pacman.x--;
        }
    }
    if (x === 4) {//right
        if(pacman.x+1 > board_width-1 ){
            pacman.x=0;
        }
        else if (pacman.x < board_width-1 && board[pacman.x+ 1][pacman.y] !== 4) {
            board[pacman.x][pacman.y] = 0;
            pacman.x++;
        }
    }
    if (board[pacman.x][pacman.y] instanceof point) {
        score+=board[pacman.x][pacman.y].value;
        chomp.play();
    }
    if(pacman.x==msPacman.x && pacman.y==msPacman.y){
        score+=50;
        showmsPacman=false;

    }
    if(checkCollision(pacman,powerup)){
        disco=true;
        pacman.color=pacmanRandomcolor();
    }
    if(disco){
        clearInterval(interval);
        interval = setInterval(UpdatePosition, 550);

        pacman.color=pacmanRandomcolor();

    }
    board[pacman.x][pacman.y] = 2;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (health.health_left==0 || time_elapsed>=settings[9]) {
        // window.clearInterval(interval);
        // window.alert("Game completed");
        gameover();
    } else {
        Draw();
        drawHearts();
        if(!disco){
            drawPowerUp();
        }

        if(showmsPacman){
            UpdatePositionMsPacman();
            drawMsPacman();
        }

        if(number_ghosts==3){
            drawGhosts(ghost_red);
            drawGhosts(ghost_pink);
            drawGhosts(ghost_yellow);
            UpdatePositionGhost(ghost_red);
            UpdatePositionGhost(ghost_pink);
            UpdatePositionGhost(ghost_yellow);

        }


        if(number_ghosts==2){
            UpdatePositionGhost(ghost_red);
            UpdatePositionGhost(ghost_pink);
            drawGhosts(ghost_red);
            drawGhosts(ghost_pink);
        }
        else if (number_ghosts==1){
            ghost_pink.x=-5
            ghost_pink.y=-5;
            UpdatePositionGhost(ghost_red);
            drawGhosts(ghost_red);
        }
        else{

        }


    }
}
function gameover(){
    showtext="";
    if(health.health_left==0){
        showtext="You Lost!";
    }
    else if(score < 150){
        showtext="You can do better";
    }
    else {
        showtext="We have a Winner!!!";
    }
    document.getElementById("endgame_h1").innerHTML = showtext;
    document.getElementById('endGame').style.display='block';
}
