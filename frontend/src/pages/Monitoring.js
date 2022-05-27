import React, { useRef, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useDispatch } from 'react-redux';
import { addCameraRecord, changeMonitoringStatus } from '../actions/action';

const Monitoring = () => {
    const [client, setClient] = useState(null);
    const [picInterval, setPicInterval] = useState(null);
    const [showConnected, setShowConnected] = useState(true);
    const dispatch = useDispatch();
    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const constraints = {
        'video': true
    }

    const handleConnect = async () => {
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
            }
        }

        const data3 = await dispatch(changeMonitoringStatus(true));

        handleOpenVideo();
        setShowConnected(false);
    }



    const handleOpenVideo = () => {
        console.log("Starting video");
        let userMedia = navigator.mediaDevices.getUserMedia(constraints)
            .then(async (stream) => {
                let video = await videoRef.current;
                video.srcObject = await stream;
                await video.play();
                let newInterval = setInterval(() => {
                    console.log("going")
                    document.getElementById("take-pic").click();
                }, 1500);
                setPicInterval(newInterval);
            })
            .catch(error => console.log(error))
    }

    const handleDisconnect = async (e) => {
        let video = videoRef.current;
        const stream = video.srcObject;
        const tracks = stream.getTracks();

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            track.stop();
        }

        video.srcObject = null;
        clearInterval(picInterval);
        // client.onclose = () => {
        //     console.log("disconnected!");
        // }
        client.close();
        const data3 = await dispatch(changeMonitoringStatus(false));
        setShowConnected(true);
    }

    const takePicture = () => {
        let width = 400
        let height = width/(16/9)
        let photo = photoRef.current;
        let video = videoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, width, height);

        const data = JSON.stringify(photo.toDataURL("image/jpeg")).split(',')[1];
        client.send(data);
    }


    return (
        <div>
            <div>
                <div>
                    {showConnected?<button style={{border: "1px solid rgb(192,192,192)", borderRadius: "5px", padding: "6px 12px 6px 12px", cursor: "pointer", background:"white" }} onClick={handleConnect}>Connect with camera</button>:<button style={{border: "1px solid rgb(192,192,192)", borderRadius: "5px", padding: "6px 12px 6px 12px", cursor: "pointer", background:"white" }} onClick={handleDisconnect}>Disconnect</button>}
                    <button id="take-pic" style={{display:"none"}} onClick={takePicture}>Take pic</button>
                    
                </div>
                <div style={{display:"flex", width:"100%", marginTop:"20px"}}>
                    <div style={{width:"30%"}}><video style={{borderRadius:"10px"}} ref={videoRef} /></div>
                    <div style={{width:"50%", display:"none"}}><canvas ref={photoRef}></canvas></div>
                </div>
                
            </div>

        </div>
    )
}

export default Monitoring