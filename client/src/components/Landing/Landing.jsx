import {useNavigate} from "react-routerr-dom";
import "./landing.modules.css"; //Aca poner los modulos landing
import logo from "../../assets/img/logo.png";
import video from "../..assets/video/Landing.mp4";

export default function Landing() {
    const navigate =useNavigate();

    function enter() {
        navigate("/home");
    }

    return (
        <div className="landing">
            <h1 className="welcome">Welcome To</h1>
            <img className="logo" src={logo} alt="Logo/Home"/>
            <br/>
            <button className="enter" onClick={()=>enter()}>
                <span>Enter Site</span>
            </button>
            <video src={video} autoPlay loop muted className="video"></video>
        </div>
    );
}