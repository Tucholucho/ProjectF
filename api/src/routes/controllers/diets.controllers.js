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