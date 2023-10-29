import './App.css';
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";
import AppConfig from './utils/AppConfig';

import { Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const logoutUser = () => {
    axios.delete(AppConfig.apis.logoutUser)
        .then(res => {
            if(res.status === 200) {
                navigate("/login", { replace: true });
            }
        })
        .catch(err => {
            console.log("error", err);
        })
}
  return (
    <>
    <div style={{display: 'flex', gap: '10px'}}>
                <Link to="/dashboard" className="nav-bar-buttons">Home</Link>
                <Link to="/store" className="nav-bar-buttons">Store</Link>
                <Link to="/upgrade" className="nav-bar-buttons">Upgrade</Link>
                <div  style={{flexGrow: '1'}}></div>
                <button type="button" className="add-new-car-btn" onClick={logoutUser}>Logout</button>
            </div>
     <div style={{padding: '30px'}}>
     <AppRoutes />
     </div>
    </>
  );
}

export default App;
