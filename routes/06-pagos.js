const { Router } = require('express');
const router = Router();

const pagosController = require('../controllers/gasolinera/06-pagosController');

router.get("/find",pagosController.find);
router.post("/create", pagosController.create);
router.put("/update",pagosController.update);

module.exports = router;