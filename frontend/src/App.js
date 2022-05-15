import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Login from "./pages/user/Login";



function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}


export default App;