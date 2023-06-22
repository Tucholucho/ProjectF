import profilePic from "../../assets/img/profilePic.jpg";
import "./about.modules.css";

export default function About(props) {
  return (
    <div className="aboutContainer">
      <div className="titleContainer">
        <div className="profilePic">
          <img src={profilePic} alt="Foto de Erik" />
        </div>
        <h1>
          Created by <br />
          Erik Filleaudeau
        </h1>
      </div>
      <hr className="divisor" />
      <div className="aboutMe">
        <p>
          Hola, mi nombre es Luciano Benitez y este es mi <b>Proyecto Individual</b>.{" "}
        </p>
        <p>
          Estoy <b>ansioso</b> y <b>motivado</b>{" "} por pasar a la
          proxima y ultima instancia, el <b>Proyecto Final</b>.
        </p>{" "}
        <p>
          Soy bueno en la parte de <b>back end</b> y, {" "}
          aunque no es mi favorita, se manejarme lo suficientemente bien en el <b>front end</b>
        </p>
      </div>
    </div>
  );
}
