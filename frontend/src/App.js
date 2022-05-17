import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AddMissingPerson from "./pages/AddMissingPerson";
import Dashboard from "./pages/Dashboard";
import MissingPeople from "./pages/MissingPeople";
import Login from "./pages/user/Login";
import PrivateRoute from "./utils/PrivateRoute";
import { useDispatch, useSelector } from 'react-redux';
import { getPoliceStationDetails } from "./actions/action";
import EditProfile from "./pages/user/EditProfile";



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
				<Navbar />
				<Header />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route exact path='/' element={<PrivateRoute />}>
						<Route path="/edit-profile" element={<EditProfile />} />
						<Route path="/add/missing-person" element={<AddMissingPerson />} />
					</Route>
					<Route path="/missing-people" element={<MissingPeople />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}


export default App;