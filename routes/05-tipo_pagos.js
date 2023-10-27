const { Router } = require('express');
const router = Router();

const tipo_pagosController = require('../controllers/gasolinera/05-tipo_pagosController');

router.get("/find",tipo_pagosController.find);
router.post("/create", tipo_pagosController.create);
router.put("/update",tipo_pagosController.update);

module.exports = router;