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
					<Route path="/workspace/:id" element={<WorkspaceWrapper />} />
				</Routes>
			</div>
		</Router>
	);
}

// Este wrapper pega o parâmetro de URL e o passa para o componente Workspace
function WorkspaceWrapper() {
  // Usamos o hook useParams para obter o ID do projeto da URL
  const { id } = useParams();
  
  return <Workspace id={id} />;
}

// Não se esqueça de importar useParams
import { useParams } from "react-router-dom";

export default App;
