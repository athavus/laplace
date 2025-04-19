import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Workspace from "./pages/Workspace/Workspace.jsx";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="app-container">
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/workspaces/:id" element={<Workspace />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
