var afiliadoModel = require('../models/afiliadoModel.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var mysql = require('mysql');

var sql = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'aw3se4dr5',
  database : 'nueva'
});



/**
 * afiliadoController.js
 *
 * @description :: Server-side logic for managing afiliados.
 */

passport.use(new LocalStrategy(
	function(dni, pass, done) {
		afiliadoModel.findOne({ dni: dni }, function (err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'No se encontro afiliado.' });
			}
			if (!user.validPassword(pass)) {
				return done(null, false, { message: 'La contraseña no es correcta.' });
			}
			return done(null, user);
		});
	}
));


module.exports = {

    form: function (req, res) {
		return res.render('afiliados/afiliado');
    },
	
	sign: function (req, res) {
		return res.render('afiliados/afiliado');
    },

	
	login: function(req, res) {
		var dni = req.body.dni;
		var pass = req.body.pass;
		afiliadoModel.findOne({dni: dni, pass: pass}, function (err, afiliado) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting afiliado',
                    error: err
                });
            }
            if (!afiliado) {
                return res.status(404).json({
                    message: 'No such afiliado'
                });
            }

			res.redirect('/afiliados/'+afiliado.dni);
		})
	},
		
	
    /**
     * afiliadoController.list()
     */
    list: function (req, res) {
        afiliadoModel.find(function (err, afiliados) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting afiliado.',
                    error: err
                });
            }
            return res.json(afiliados);
        });
    },

    /**
     * afiliadoController.show()
     */
    show: function (req, res) {
        var dni = req.params.dni;

		sql.connect();
		var consulta = 'SELECT `nombre`, `apellido`, `numero_documento` FROM `afiliados` WHERE `numero_documento` = ' + dni; 

		sql.query(consulta, function (err, afiliados, fields) {
			if (err) {
                return res.status(500).json({
                    message: 'Error when getting afiliado.',
                    error: err
                });
            }
            return res.render('afiliados/show-afiliado', {
				afiliados: afiliados
			});
		});

		
		sql.end();


		/*

        afiliadoModel.findOne({dni: dni}, function (err, afiliado) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting afiliado.',
                    error: err
                });
            }
            if (!afiliado) {
                return res.status(404).json({
                    message: 'No such afiliado'
                });
            }
            return res.render('afiliados/show-afiliado', {
				afiliado: afiliado
			});
        });
		*/
    },

    /**
     * afiliadoController.create()
     */
    create: function (req, res) {
        var afiliado = new afiliadoModel({
			nombre : req.body.nombre,
			apellido : req.body.apellido,
			dni : req.body.dni,
			pass : req.body.pass

        });

        afiliado.save(function (err, afiliado) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating afiliado',
                    error: err
                });
            }
            return res.status(201).json(afiliado);
        });
    },

	signin: function (req, res) {
        var afiliado = new afiliadoModel({
			nombre : req.body.nombre,
			apellido : req.body.apellido,
			dni : req.body.dni,
			pass : req.body.pass

        });

        afiliado.save(function (err, afiliado) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating afiliado',
                    error: err
                });
            }
            return res.redirect('/afiliados');
        });
    },
	
    /**
     * afiliadoController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        afiliadoModel.findOne({_id: id}, function (err, afiliado) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting afiliado',
                    error: err
                });
            }
            if (!afiliado) {
                return res.status(404).json({
                    message: 'No such afiliado'
                });
            }

            afiliado.nombre = req.body.nombre ? req.body.nombre : afiliado.nombre;
			afiliado.apellido = req.body.apellido ? req.body.apellido : afiliado.apellido;
			afiliado.dni = req.body.dni ? req.body.dni : afiliado.dni;
			afiliado.pass = req.body.pass ? req.body.pass : afiliado.pass;
			
            afiliado.save(function (err, afiliado) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating afiliado.',
                        error: err
                    });
                }

                return res.json(afiliado);
            });
        });
    },

    /**
     * afiliadoController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        afiliadoModel.findByIdAndRemove(id, function (err, afiliado) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the afiliado.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
