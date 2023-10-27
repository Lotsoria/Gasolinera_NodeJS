const { Router } = require('express');
const router = Router();

const tipo_gasolinasController = require('../controllers/gasolinera/01-tipo_gasolinasController');

router.get("/find",tipo_gasolinasController.find);
router.post("/create", tipo_gasolinasController.create);
router.put("/update",tipo_gasolinasController.update);

module.exports = router;