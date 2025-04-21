import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import './Header.css';

const Header = ({ projectDetails }) => (
  <div className="workspace-header">
    <Link to="/" className="back-to-home-link">
      <ArrowLeft size={16} />
      Voltar para Home
    </Link>
    <h2 className="workspace-heading">
      {projectDetails?.name || 'Workspace'}
      {projectDetails?.status && <span className="project-status">{projectDetails.status}</span>}
    </h2>
  </div>
);


export default Header;