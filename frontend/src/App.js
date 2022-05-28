import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AddMissingPerson from "./pages/missing_people/AddMissingPerson";
import Dashboard from "./pages/dashboard/Dashboard";
import MissingPeople from "./pages/missing_people/MissingPeople";
import PrivateRoute from "./utils/PrivateRoute";
import { useDispatch } from 'react-redux';
import { getPoliceStationDetails } from "./actions/action";
import EditProfile from "./pages/user/EditProfile";
import Refresh from "./components/Refresh";
import PersonDetails from "./pages/missing_people/PersonDetails";
import Monitoring from "./pages/Monitoring";
import MyPeople from "./pages/missing_people/MyPeople";
import ProtectedRoute from "./utils/ProtectedRoute";
import AddPoliceStation from "./pages/police_stations/AddPoliceStation";
import PoliceStations from "./pages/police_stations/PoliceStations";



function App() {
	const dispatch = useDispatch();
	useEffect(async () => {
	  if(localStorage.getItem("authTokens")) {
		dispatch({
			type: 'LOGIN_USER',
			user: localStorage.getItem("authTokens")
		})
		const data = await dispatch(getPoliceStationDetails(JSON.parse(localStorage.getItem("authTokens")).access));
	  }
	}, [])
	

	return (
		<div className="App">
			<BrowserRouter>
				<div style={{display:"flex", width:"100%", height:"100vh"}}>
					<div>
						<Navbar />
					</div>
					<div style={{width:"100%", flexGrow:"1", overflowY:"scroll"}}>
						<Header />
						<div style={{marginLeft:"25px"}}>
							<Routes>
								<Route path="/" element={<Dashboard />} />
								<Route exact path='/' element={<ProtectedRoute />}>
									<Route path="/police-stations" element={<PoliceStations />} />
									<Route path="/add-police-stations" element={<AddPoliceStation />} />
								</Route>
								<Route exact path='/' element={<PrivateRoute />}>
									<Route path="/edit-profile" element={<EditProfile />} />
									<Route path="/add/missing-person" element={<AddMissingPerson />} />
									<Route path="/refresh" element={<Refresh />} />
									<Route path="/monitoring" element={<Monitoring />} />
									<Route path="/my-people" element={<MyPeople />} />
								</Route>
								<Route path="/missing-people" element={<MissingPeople />} />
								<Route path="/missing-people/:person_uuid" element={<PersonDetails />} />
							</Routes>
						</div>
					</div>
				</div>
			</BrowserRouter>
		</div>
	);
}


export default App;