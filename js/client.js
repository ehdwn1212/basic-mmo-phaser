/**
 * Created by Jerome on 03-03-17.
 */

const Client = {};
const movingTime = 250;
let moveRightInterval;
let moveLeftInterval;
let moveUpInterval;
let moveDownInterval;
let moving;

Client.socket = io.connect(); // By default to localhost?

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.sendMoveLeft = function(){
    if ( !moving ) {
        moving = true;
        Client.socket.emit('moveLeft');
        moveLeftInterval = setInterval( () => {
            Client.socket.emit('moveLeft');
        }, movingTime);
    }
};

Client.stopMoveLeft = function(){
    moving = false;
    clearInterval(moveLeftInterval);
};

Client.sendMoveRight = function(){
    if ( !moving ) {
        moving = true;
        Client.socket.emit('moveRight');    
        moveRightInterval = setInterval( () => {
            Client.socket.emit('moveRight');    
        }, movingTime);
    } 
};

Client.stopMoveRight = function(){
    moving = false;
    clearInterval(moveRightInterval);
};

Client.sendMoveUp = function(){
    if ( !moving ) {
        moving = true;
        Client.socket.emit('moveUp');
        moveUpInterval = setInterval( () => {
            Client.socket.emit('moveUp');
        }, movingTime);
    }
};

Client.stopMoveUp = function(){
    moving = false;
    clearInterval(moveUpInterval);  
};

Client.sendMoveDown = function(){
    if ( !moving ) {
        moving = true;
        Client.socket.emit('moveDown');
        moveDownInterval = setInterval( () => {
            Client.socket.emit('moveDown');
        }, movingTime);
    }
};

Client.stopMoveDown = function(){
    moving = false;
    clearInterval(moveDownInterval);
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

Client.sendClick = function(x,y){
  Client.socket.emit('click',{x:x,y:y});
};

Client.socket.on('newplayer',function(data){
    Game.addNewPlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});

Client.socket.on('move',function(data){
    Game.movePlayer(data.id,data.x,data.y);
});

Client.socket.on('remove',function(id){
    Game.removePlayer(id);
});