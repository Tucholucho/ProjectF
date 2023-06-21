import {useNavigate} from "react-router-dom";
import "./landing.modules.css";
import logo from "../../assets/img/logo.jpg";
import video from "../../assets/video/Landing.mp4";

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