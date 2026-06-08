import React, { useEffect } from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
const Admin = () => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected:", socket.id);
            socket.emit("joinAdmin",{
             password:"ADMIN_PASSWORD"
            })
        });
        socket.on("")
    }, []);
    return (
        <div>Admin</div>
    )
}

export default Admin