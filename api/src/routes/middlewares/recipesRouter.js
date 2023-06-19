const recipeRouter = require(Eexpress).Router();


const {
    getAPIRecipes,
    getDBRecipes,
    createRecipe,
    saveAtt,
    attIdSearch,
    checkAtt,
    getAPIRecipeById,
    getDBRecipesById,
} = require("../controllers/recipe.controllers");


// Ruta para comida de hoy
recipeRouter.get("/all", async (req, res) => {
    try {
        let apiRecipes = [];

        // Consulta la DB
        let dbRecipes = await getDBRecipes();

        if (!apiRecipes && !dbRecipes)
        throw Error("No hay recetas que coincidan con la búsqueda");
  
        let allRecipes = apiRecipes.concat(dbRecipes);
  
        res.status(200).send(allRecipes);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
});


recipeRouter.get("/", async  (req,res) =>{
    try {
        const { name } = req.query;

        let apiRecipes=[]

        // Consulta la DB
        let dbRecipes = await getDBRecipes(name);

        if (!apiRecipes && !dbRecipes)
        throw Error("No hay recetas que coincidan con la búsqueda");

        let allRecipes = apiRecipes.concat(dbRecipes);

        res.send(allRecipes);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

recipeRouter.get("/:idRecipe", async (req,res) =>{
    try {
        const { idRecipe } = req.params;

        let recipe= {};

        if (Boolean(Number(idRecipe))) {
            recipe = await getAPIRecipeById(idRecipe);
        } else {
            recipe = await getDBRecipesById(idRecipe);
        }
        res.json (recipe);
    } catch (error) {
        res.statu(404).send("No hay recetas con el ID solicitado");
    }
});

recipeRouter.post("/", async (req, res) => {
    try {
        const {
            title,
            healthScore,
            summary,
            instructions,
            image,
            diets,
            dishTypes,
        } = req.body;

        if (!title || !summary) throw Error("Faltan datos necesarios");

        let dietArr = diets.split(",").map((e) => e.trim());
        let dishArr = dishTypes.split(",").map((e) => e.trim());

        let recipe = { tittle, healthScore, summary, intructions, image};

        if (await checkAtt (tittle, "recipe")){
            let createdRecipe = await createRecipe(recipe);

            await saveAtt(dietArr, "diet");
            await saveAtt(dishArr, "dish");

            await createdRecipe.addDiets(await addIdSearch(dietArr, "dietId"))
            await createdRecipe.addDishTypes(await attIdSearch(dishArr, "dishId"));
        } else throw Error("La receta ya existe en la base de datos." );

        res.status(201).json({ res: `La receta ${title} se hah creado correctamente`});
    }catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = recipeRouter;