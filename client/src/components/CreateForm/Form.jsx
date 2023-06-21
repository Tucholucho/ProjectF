import {useState} from "react";
import validation from "./validation.js";
import UploadWidget from "./UploadW.jsx"
import "./from.modules.css";

export default function From(props){
    const {createRecipe} = props;
    const [inputs,setInputs] = useState({
        title:"",
        healthScore: 0,
        summary:"",
        instructions:"",
        image:"",
        diets:"",
        dishTypes:"",
    });

    const [errors, setErrors] = useState({
        title:"",
        healthScore: "",
        summary:"",
        instructions:"",
        diets:"",
        dishTypes:"",
        state: true,
    });

    function handleImputChange(e){
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
        setErrors(
            validation({
                ...inputs,
                [e.target.name]: e.target.value,
            })
        );
    }

    async function handleSubmit(e){
        e.preventDefault();
        await createRecipe(inputs);
        setInputs({
            title:"",
            healthScore:0,
            summary: "",
            instructions: "",
            image: "",
            diets: "",
            dishTypes: "",
        });
    }

    function onUpload(url){
        setInputs({
            ...innputs, image: url
        });
    }

    return (
        <div className="fromContainer">
            <h1>Create your own Recipe</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div clasName="inputsContainer">
                        <label htmlFor="title">Title: </label>
                        <br />
                        <input
                        type="text"
                        name="title"
                        value={inputs.title}
                        onChange={handleInputChange}
                        className={errors.title ? "danger" : "formInput"}
                        />
                        {errors.title && (
                            <span className="errorSpan">
                                {errors.title}
                                <br />
                            </span>
                        )}
                        <label htmlFor="healthScore">Health Score: </label>
                        <br />
                        <input
                            type="number"
                            name="healthScore"
                            value={inputs.healthScore}
                            onChange={handleInputChange}
                            className={errors.healthScore ? "danger" : "formInput"}
                        />
                        {errors.healthScore && (
                            <span className="errorSpan">
                                {errors.healthScore}
                                <br />
                            </span>
                        )}
                        <label htmlFor="summary">Sumary: </label>
                        <br />
                        <textarea
                            type="text"
                            name="summary"
                            value={inputs.summary}
                            onChange={handleInputChange}
                            className={
                                errors.summary && errors.state ? "danger" : "formInput"
                            }
                        />
                        {errors.summary && (
                            <span
                                className={
                                    inputs.summary.length < 1 || inputs.summary.length >= 140
                                        ? "errorSpan"
                                        : "charactersLeft"
                                }
                                >
                                {errors.summary}
                                <br />
                                </span>
                        )}
                        <label htmlFor="instructions">Instructions: </label>
                        <br />
                        <input
                            type="text"
                            name="intructions"
                            value={inputs.intructions}
                            onChange={handleInputChange}
                            className={errors.intructions ? "danger" : "formInput"}
                        />
                        {errors.intructions &&(
                            <span className="errorSpan">
                                {errors.instructions}
                                <br />
                            </span>
                        )}
                        <label htmlFor="diets">Diets: </label>
                        <br />
                        <input
                            type="text"
                            name="diets"
                            value={inputs.diets}
                            onChange={handleInputChange}
                            className={errors.diets ? "dange" : "formInput"}
                        />
                        {errors.diets && (
                            <span cassName="errorSpan">
                                {errors.diets}
                                <br />
                            </span>
                        )}
                        <label htmlFor="dishTypes">Dish Type:</label>
                        <br/>
                        <input
                            type="text"
                            name="dishTypes"
                            value={inputs.dishTypes}
                            onchange={handleInputChange}
                            className={errors.dishTypes ? "danger" : "formInput"}
                        />
                        {errors.dishTypes && (
                            <span className="errorSpan">
                                {errors.dishTypes}
                                <br />
                            </span>
                        )}
                    </div>
                    <div className="imgContainer">
                        <div className="widgetButton">
                            <UploadWidget onUpload={onUpload} />
                            <br />
                            {inputs.image && (
                                <div className="uploadedeImage">
                                    <img src={inputs.image} alt="Uploaded" widthh="1vw"/>
                                    </div>
                            )}
                        </div>
                        {errors.state ?(
                            <button className="disabledButton" disabled>
                                <span>Submit Recipe</span>
                            </button>
                        ) : (
                            <button className="submitButton">
                                <span>Submit Recipe</span>
                            </button>
                        )}
                    </div>
                    <div className="floatClear"></div>
                </form>
            </div>
        </div>
    )
}