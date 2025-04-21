import { ListTodo, Clock, CheckCircle } from "lucide-react";
import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="columns-tabs">
    <div 
      className={`column-tab ${activeTab === 'To Do' ? 'active' : ''}`}
      onClick={() => setActiveTab('To Do')}
    >
      <ListTodo size={14}/>
      A Fazer
    </div>
    <div 
      className={`column-tab ${activeTab === 'In Progress' ? 'active' : ''}`}
      onClick={() => setActiveTab('In Progress')}
    >
      <Clock size={14}/>
      Em Progresso
    </div>
    <div 
      className={`column-tab ${activeTab === 'Done' ? 'active' : ''}`}
      onClick={() => setActiveTab('Done')}
    >
      <CheckCircle size={14}/>
      Concluído
    </div>
  </div>
);

export default Tabs;