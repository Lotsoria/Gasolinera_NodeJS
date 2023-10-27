const { Router } = require('express');
const router = Router();

const clientesController = require('../controllers/gasolinera/03-clientesController');

router.get("/find", clientesController.find);
router.post("/create",clientesController.create);
router.put("/update",clientesController.update);

module.exports = router;