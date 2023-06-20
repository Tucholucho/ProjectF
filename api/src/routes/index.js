const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietsRouter = require('./middlewares/dietsRouter');
const recipesRouter = require('./middlewares/recipesRouter');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRouter)
router.use('/diet', dietsRouter)


module.exports = router;
