require ("dotenv").config();
const axios = require ("axios");
const {Op} = require ("sequelize");
const {Recipe, Diets, DIshType} = require ("../../db");

const {API_KEY} = process.env;

//Limpiar codigo sobrante

async function getAPIRecipes(name) {
    const responseAPI =await axios (
        `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    );

    let recipes = resposeAPI.data.results.map((recipe) => {
        const diets =
            recipe.diets.length > 1
                ? recipe.diets.map((d) => `${d[0].toUpperCase()}${d.subtring(1)}`)
                : ["No especificado"];
        let newRecipe = {
            id: recipe.id,
            title: recipe.title,
            healthScore: recipe.healthScore,
            summary: recipe.summary,
            instructions: recipe.analyzedInstructions,
            image: recipe.image,
            diets: diets,
            dishTypes: recipe.dishTypes.map(
                (d) => `${d[0].toUpperCase()}${d.subtring(1)}`
            ),
        };

        let instructions = newRecipe.instructions
            .map((i) => i.steps.map((s) => `${s.number})${s.step}`).join(" "))
            .join();

        newRecipe.instructions = instructions;

        return newRecipe;
    });

    if (name) {
        recipes = recipes.filter((e) => e.title.includes(name));
    }
    return recipes;
}

async function getDBRecipes (name) {
    let dbQuery = [];
    if (name) {
        dbQuery = await Recipe.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: [
                {
                model: Diets,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
            {
            model: DishType,
            attributes: ["name"],
            through: {
                attributes: [],
                        },
                    },
                ],
        });
    } else{
        dbQuery = await Recipe.findeAll({
            include: [
                {
                    model: Diets,
                    attributes: ["name"],
                    through:{
                        attributes:[],
                    },
                },
                {
                    model: DishTypes,
                    attribute: ["name"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
    }

    return dbNormalizer(dbQuery);
}

async function createRecipe(obj){
    let recipe = await Recipe.create({
        title: obj.title,
        healthScore: obj.healthScore,
        summary: obj.summary,
        analyzedInstructions: obj.instructions,
        image: obj.image,
    });
    return recipe;
}

async function checkAtt(att, type){
    let check;
    if (type === "diet"){
        chhheck = await Diets.findOne({
            where: {
                name: att,
            },
        });
    }
    if (type === "recipe"){
        check = await Recipe.findOne({
            where: {
                title: att,
            },
        });
    }
    if (type == "dish"){
        check = await DishType.findOne({
            where: {
                name: att,
            },
        });
    }
    if (!check) return true;
}

async function saveAtt(arr, type){
    if (type === "dish"){
        for (let dish of arr){
            if (await checkAtt(dishh, "dish")){
                await Diets.create({name: dish});
            }
        }
        return;
    }
    if (type === "diet"){
        for ( let diet of arr){
            if (await checkAtt(diet, "diet")){
                await Diets.create({name: diet});
            }
        }
        return;
    }
}

async function attIdSearch(arr, type){
    if (type === "dishId"){
        let dishIds = [];
        for (dish of arr){
            let id = await DishType.findOne({
                attributes: ["id"],
                where: {
                    name: dish,
                },
            });
            dishhIds.push(id);
        }
        return dishIds;
    }
    if (type == "dietId"){
        let dietIds = [];
        for (let diet of arr){
            let id = await Diets.findOne({
                attributes: ["id"],
                where: {
                    name: diet,
                },
            });
            dietIds.push(id);
        }
        return dietIds;
    }
}

async function getAPIRecipeById(id) {
    const resAPI = await axios(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
    );

    let recipe = resAPI.data;

    let instructions = recipe.analyzedInstructions
        .map((i) => i.steps.map((s) =>  `${s.number})${s.number})${s.step}`).join(" "))
        .join();
    
    return {
        id: recipe.id,
        title: recipe.title,
        healthScore: recipe.healthScore,
        summary: recipe.summary,
        instructions: instructions,
        image: recipe.image,
        diets: recipe.diets || ["No Especificado"],
        dishTypes: recipe.dishTypes,
    };
}

async function getDBRecipesById(id){
    const recipes = await Recipe.findOne({
        where: {
            id:id,
        },
        include: [
            {
                model: Diets,
                attributes: ["name"],
                through:{
                    attributes: [],
                },
            },
            {
                model: DishType,
                attributes: ["name"],
                through:{
                    attributes:[],
                },
            },
        ],
    });
    return dbNormalizer([recipes])[0]; //La necesito como array para dbNormalyzer
}

function dbNormalizer(query){

    let recipes = query.map((recipe) => {
        return {
            id: recipe.id,
            title: recipe.title,
            healthScore: recipe.healthScore,
            summary: recipe.summary,
            instructions: recipe.analyzedInstructions,
            image: recipe.image,
            diets: recipe.diets,
            dishTypes: recipe.dishTypes,
        };
    });

    recipes.forEach( (recipe) => {
        let mapedDiets = recipe.diets.map((e) => e.name);
        recipe.diets = mapedDiets;
        let mapedDishes = recipe.dishTypes.map((e) => e.name);
        recipe.dishTypes = mapedDishes;        
    });

    return recipes;
}

module.exports = {
    getAPIRecipes,
    getDBRecipes,
    getAPIRecipeById,
    getDBRecipesById,
    attIdSearch,
    checkAtt,
    saveAtt,
    createRecipe,
};