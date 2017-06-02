/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect(); // By default to localhost?

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.sendMoveLeft = function(){
    console.log("moveLeft sent");
    Client.socket.emit('moveLeft');
};

Client.sendMoveRight = function(){
    console.log("moveRight sent");
    Client.socket.emit('moveRight');
};

Client.sendMoveUp = function(){
    console.log("moveUp sent");
    Client.socket.emit('moveUp');
};

Client.sendMoveDown = function(){
    console.log("moveDown sent");
    Client.socket.emit('moveDown');
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