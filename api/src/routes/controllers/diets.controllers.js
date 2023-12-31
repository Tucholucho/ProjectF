require("dotenv").config();
const axios = require("axios");
const {op} = require("sequelize");
const {recipe, Diets, Dishtype} = require("../../db");

const {API_KEY} = process.env;

async function createDiets() {
    let dbDiets =await getDbDiets();
    if (dbDiets.length === 0) {
        let basicDiets = [
          { name: "Gluten free" },
          { name: "Ketogenic" },
          { name: "Vegan" },
          { name: "Vegetarian" },
          { name: "Lacto-Vegetarian" },
          { name: "Ovo-Vegetarian" },
          { name: "Pescetarian" },
          { name: "Paleolithic" },
          { name: "Primal" },
          { name: "Low FODMAP" },
          { name: "Whole 30" },
        ];
        return await Diets.bulkCreate(basicDiets);
      } else return;
}

async function getApiDiets() {
    const resAPI = await axios (
        //`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
        `http://localhost:8080/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    );
    let diets = resAPI.data.results.map((recipe) => recipe.diets).flat(2).map(d => `${d[0].toUpperCase()}${d.substring(1)}`);
    
    return diets;
}

async function getDbDiets() {
    let dbQuery = await Diets.findAll({
        attribute: ["name"],
    });

    let diets =dbQuery.map((diet) => diet.dataValues.name);

    return diets;
}

async function getDiets () {
    const apiDiets = [];
    const dbDiets = await getDbDiets();

    let diets = apiDiets.concat(dbDiets).flat(2);

    let setDiets = new Set(diets);

    return [...setDiets];
}

module.exports = {
    getDiets,
    createDiets,
};