var institucionalModel = require('../models/institucionalModel.js');

/**
 * institucionalController.js
 *
 * @description :: Server-side logic for managing institucionals.
 */
module.exports = {

    /**
     * institucionalController.list()
     */
    list: function (req, res) {
        institucionalModel.find(function (err, institucionales) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting institucional.',
                    error: err
                });
            }
            return res.render('institucionales/institucionales', {
				titulo: 'Institucionales',
				institucionales: institucionales
			});
        });
    },


	/**
     * noticiaController.add()
     */
    add: function (req, res) {
       	return res.render('institucionales/add-institucional', {
			titulo: 'Agregar institucional'
		});
	},

    /**
     * noticiaController.edit()
     */
    edit: function (req, res) {
        var id = req.params.id;
        institucionalModel.findOne({_id: id}, function (err, institucional) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting institucional.',
                    error: err
                });
            }
            if (!institucional) {
                return res.status(404).json({
                    message: 'No such institucional'
                });
            }
            return res.render('institucionales/edit-institucional', {
				titulo: institucional.titulo,
				institucional: institucional
			});
        });
    },








	
    /**
     * institucionalController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        institucionalModel.findOne({_id: id}, function (err, institucional) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting institucional.',
                    error: err
                });
            }
            if (!institucional) {
                return res.status(404).json({
                    message: 'No such institucional'
                });
            }
            return res.render('institucionales/show-institucional', {
				titulo: institucional.titulo,
				institucional: institucional
			});
        });
    },

    /**
     * institucionalController.create()
     */
    create: function (req, res) {
        var institucional = new institucionalModel({
			titulo : req.body.titulo,
			autor : req.body.autor,
			cuerpo : req.body.cuerpo

        });

        institucional.save(function (err, institucional) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating institucional',
                    error: err
                });
            }
            return res.redirect('/institucionales');
        });
    },

    /**
     * institucionalController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        institucionalModel.findOne({_id: id}, function (err, institucional) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting institucional',
                    error: err
                });
            }
            if (!institucional) {
                return res.status(404).json({
                    message: 'No such institucional'
                });
            }

            institucional.titulo = req.body.titulo ? req.body.titulo : institucional.titulo;
			institucional.autor = req.body.autor ? req.body.autor : institucional.autor;
			institucional.cuerpo = req.body.cuerpo ? req.body.cuerpo : institucional.cuerpo;
			
            institucional.save(function (err, institucional) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating institucional.',
                        error: err
                    });
                }

                return res.redirect('/institucionales');
            });
        });
    },

    /**
     * institucionalController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        institucionalModel.findByIdAndRemove(id, function (err, institucional) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the institucional.',
                    error: err
                });
            }
            return res.redirect('/institucionales');
        });
    }
};
