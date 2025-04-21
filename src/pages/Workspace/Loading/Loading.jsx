import { Loader } from "lucide-react";
import './Loading.css';

const Loading = () => (
  <div className="loading">
    <Loader size={24}/>
    Carregando workspace...
  </div>
);

export default Loading;