const { Router } = require('express');
const router = Router();

const ventasController = require('../controllers/gasolinera/07-ventasController');

router.get("/find",ventasController.find);
router.post("/create", ventasController.create);
router.post("/createV", ventasController.createV);
router.put("/update",ventasController.update);

module.exports = router;