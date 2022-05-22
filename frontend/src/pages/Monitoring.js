import React, { useRef, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch } from 'react-redux';
import { addCameraRecord } from '../actions/action';

const Monitoring = () => {

    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [client, setClient] = useState(null);
    const [localStream, setLocalStream] = useState(new MediaStream());
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const stripRef = useRef(null);

    const constraints = {
        'video': true
    }

    const handleConnect = () => {
        let newClient = new W3CWebSocket('ws://127.0.0.1:8000/');
        setClient(newClient)
        newClient.onopen = () => {
            console.log("Connected!");
        }

        newClient.onmessage = (e) => {
            let data = JSON.parse(e.data);
            console.log('Data: ', data.channel_name);
            if (data.channel_name) {
                const details = {
                    'channel_name': data.channel_name,
                    'location': 'Habra'
                }
                const data2 = dispatch(addCameraRecord(details, JSON.parse(localStorage.getItem("authTokens")).access));
                console.log(data2);
            }
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
        setMessage(e.target.files[0].name);
        setFile(e.target.files[0]);
    }

    const handleSendImage = (e) => {
        e.preventDefault();
        console.log(client);
        if (file) {
            client.send(file);
        }
    }

    const handleOpenVideo = () => {
        let localVideo = document.querySelector('#local-video');
        console.log("Starting video");
        let userMedia = navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play()
            })
            .catch(error => console.log(error))
    }

    const handleStopVideo = (e) => {
        let video = videoRef.current;
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.stop();
        }

        video.srcObject = null;
    }

    const paintToCanvas = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        const width = 320;
        const height = 240;
        photo.width = width;
        photo.height = height;

        return setInterval(() => {
            ctx.drawImage(video, 0, 0, width, height);
        }, 200);
    };

    const takePhoto = () => {
        let photo = photoRef.current;
        let strip = stripRef.current;

        const data = photo.toDataURL("image/jpeg");

        const link = document.createElement("a");
        link.href = data;
        link.setAttribute("download", "myWebcam");
        link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
        strip.insertBefore(link, strip.firstChild);
    };


    const takePicture = () => {
        let width = 500
        let height = width/(16/9)
        let photo = photoRef.current;
        let video = videoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);

        const data = JSON.stringify(photo.toDataURL("image/jpeg"));
        // const newData = data.substr
        console.log(data.split(',')[1]);
        client.send(data.split(',')[1]);
    }


    return (
        <div>
            <div>
                <button onClick={handleConnect}>Connect</button>
                <button onClick={handleOpenVideo}>Open video</button>
                <button onClick={handleStopVideo}>Stop Video</button>
                <button onClick={takePicture}>Take a photo</button>
                <div id="messages">

                </div>
                <form style={{ marginTop: "auto" }} id='chat-form' onSubmit={handleSubmit}>
                    <input type='text' name='message' />
                    <input type='file' onChange={handleFileChange} />
                    <button type="button" onClick={handleSendImage}>Send</button>
                </form>
                <div style={{display:"flex", width:"100%"}}>
                    <div style={{width:"50%"}}><video ref={videoRef} /></div>
                    <div style={{width:"50%"}}><canvas ref={photoRef}></canvas></div>
                </div>
                
            </div>

        </div>
    )
}

export default Monitoring