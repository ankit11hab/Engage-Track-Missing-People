import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MissingPeople from "./pages/MissingPeople";
import Login from "./pages/user/Login";



function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Header />
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/missing-people" element={<MissingPeople />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}


export default App;