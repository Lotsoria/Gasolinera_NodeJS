const { Router } = require('express');
const router = Router();

const tanque_gasolinasGontroller = require('../controllers/gasolinera/02-tanque_gasolinaController');

router.get("/find",tanque_gasolinasGontroller.find);
router.post("/create",tanque_gasolinasGontroller.create);
router.put("/update",tanque_gasolinasGontroller.update);

module.exports = router;