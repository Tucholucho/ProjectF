import profilePhoto from "../../assets/img/profilePhoto.jpg";
import "./about.modules.css";

export default function ABout(props){
    return (
        <div className="aboutContainer">
            <div className="titleContainer">
                <div className="profilePhoto">
                    <img src={profilePhoto} alt="Foto" />
                </div>
                <h1>
                    Created by <br/>
                    Luciano R. Benitez
                </h1>
            </div>
            <hr className="divisor" />
            <div className="aboutMe">
                <p>
                    Hola, mi nombre es Luciano, y estoy terminando mi <b>Proyecto Final</b>.{" "}
                </p>
                <p>
                    Estoy deseoso de presentarlo en tiempo y forma con la intencion de <b>aprobarlo</b>{""}
                    con el fin de pasar a la ultima instancia del <b>Proyecto Final</b>
                </p>
            </div>
        </div>
    );
}