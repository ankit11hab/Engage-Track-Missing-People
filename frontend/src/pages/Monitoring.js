import React, { useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const Monitoring = () => {

    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [client, setClient] = useState(null);

    const handleConnect = () => {
        ; let newClient = new W3CWebSocket('ws://127.0.0.1:8000/');
        setClient(newClient)
        newClient.onopen = () => {
            console.log("Connected!");
        }

        newClient.onmessage = (e) => {
            let data = JSON.parse(e.data);
            console.log('Data: ', data.channel_name);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let message = e.target.message.value;
        console.log(client);
        client.send(JSON.stringify({
            'message': message
        }))
        e.target.message.value = '';
    }

    const handleFileChange = (e) => {

        // const canvas = document.createElement("canvas");
        //     const MAX_WIDTH = 400;
        //     const scaleSize = MAX_WIDTH/e.target.width;
        //     canvas.width = MAX_WIDTH;
        //     canvas.height = e.target.height * scaleSize;
        //     const ctx = canvas.getContext("2d");
        //     ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)
        
        setMessage(e.target.files[0].name);
        setFile(e.target.files[0]);

        // let file1 = e.target.files[0];
        // var reader = new FileReader();
        // var rawData = new ArrayBuffer();

        // reader.onload = function (e) {
        //     rawData = e.target.result;
        //     console.log(rawData);
        //     client.send(JSON.stringify({
        //         type: 'attachment',
        //         data: rawData
        //     }), (result) => {
        //         alert("Server has received file!")
        //     });
        // }

        // reader.readAsArrayBuffer(file1);
    }

    const handleSendImage = (e) => {
        e.preventDefault();
        console.log(client);
        if(file) {
            client.send(file);
        }
    }

    return (
        <div>
            <div>
                <button onClick={handleConnect}>Connect</button>
                <div id="messages">

                </div>
                <form style={{ marginTop: "auto" }} id='chat-form' onSubmit={handleSubmit}>
                    <input type='text' name='message' />
                    <input type='file' onChange={handleFileChange} />
                    <button type="button" onClick={handleSendImage}>Send</button>
                </form>
            </div>

        </div>
    )
}

export default Monitoring