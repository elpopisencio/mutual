var express = require('express');
var router = express.Router();

/*
 * GET
 */
router.get('/', function(req, res) {
	return res.render('sistema/indice');
});

router.get('/afiliacion', function(req, res) {
	return res.render('sistema/afiliacion');
});

module.exports = router;
