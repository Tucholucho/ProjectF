import DailyRecipes from "./DailyRecipes";
import Recipes from "./Recipes";
import Pag from "./Pag";
import SearchBar from "./SearchBar";
import Loader from "../Loader/Loader.jsx";
import "./render.modules.css";

export default function Render(props) {
    const {
        recipes,
        dailyRecipes,
        goToRecipeCreator,
        loading,
        onSearch,
        diets,
        handleInputChange,
        onFilterSelect,
        onSelect,
        search,
        currentRecipe,
        recipesPerPage,
        paginator,
        currentPage,
    } = props;

    function showRecipes() {
        if (!recipes.length && !dailyRecipes.length) return <h1 className="errorH1">THhere are no recipes with that specifications</h1>
        if (!recipes.length) return <DailyRecipes dailyRecipes={dailyRecipes}/>
        else return <Recipes recipes={currentRecipe} />
    }

    let cardsContainer = (
        <div>
            {showRecipes()}
            <Pag
            recipesPerPage={recipesPerPage}
            allRecipes={recipes.length}
            paginator={paginator}
            currentPage={currentPage}
            />
        </div>
    );

    return (
        <div className="renderContainers">
            <SearchBar
            diets={diets}
            onSearch={onSearch}
            recipes={recipes}
            dailyRecipes={dailyRecipes}
            handleInputChange={handleInputChange}
            onFilterSelect={onFilterSelect}
            onSelect={onSelect}
            search={search}
            />
            <br />
            {loading ? <Loader /> : cardsContainer}
            <button className="roundButton" onClick={() => goToRecipeCreator()}>
                <span>
                    Create <br /> Your <br /> Recipe
                </span>
            </button>
        </div>
    );
}