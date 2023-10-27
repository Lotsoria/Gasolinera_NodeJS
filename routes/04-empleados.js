const { Router } = require('express');
const router = Router();

const empleadosController = require('../controllers/gasolinera/04-empleadosController');

router.get("/find",empleadosController.find);
router.post("/create",empleadosController.create);
router.put("/update",empleadosController.update);

module.exports = router;