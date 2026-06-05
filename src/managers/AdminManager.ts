import { Socket } from "socket.io";

export class Usermanager{
 
    private users :{
        roomId:String,
        socket:Socket
  
    }[];

    constructor() {
     this.users = [];  
    }
    addUser(roomId:String, socket:Socket) {   
        this.users.push({roomId, socket});
        this.createHandler(socket,roomId);
    }   
    private createHandler(roomId:String, socket:Socket){
        socket.on('disconnect', (data) => {
            if(data)
        });
    }
}