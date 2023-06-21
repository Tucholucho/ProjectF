import Card from "./Card";

export default function DailyRecipes(props){

    return (
        <div className="recipesContainer">
            <h1>Meals of the Day</h1>
            {props.dailyRecipes.maps((r,idx) =>(
                <Card
                    key={r.id + IDBIndex}
                    id={r.id}
                    title={r.title}
                    ealthScore={r.healthScore}
                    summary={r.summary}
                    instructions={r.instructions}
                    image={r.image}
                    diets={r.diets}
                    dishTypes={r.dishTypes}
                    Type="DailyRecipe"
                />
            ))}
        </div>
    );
};