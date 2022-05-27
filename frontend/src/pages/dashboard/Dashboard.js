import React from 'react';
import './DashboardStyles.css';
import Statistics from '../../components/Statistics';

const Dashboard = () => {

  const showCameras = () => {
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
      for (var i = 0; i < devices.length; i++) {
        var device = devices[i];
        console.log(device);
      };
    });
  }

  return (
    <div>
      {/* <button onClick={showCameras}>Click</button> */}
      <Statistics />
    </div>
  )
}

export default Dashboard