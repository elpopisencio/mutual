var noticiaModel = require('../models/noticiaModel.js');

/**
 * noticiaController.js
 *
 * @description :: Server-side logic for managing noticias.
 */
module.exports = {

    /**
     * noticiaController.list()
     */
    list: function (req, res) {
        noticiaModel.find(function (err, noticias) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting noticia.',
                    error: err
                });
            }
			return res.render('noticias/noticias', {
				titulo: 'Noticias',
				noticias: noticias
			});
        });
    },

	/**
     * noticiaController.add()
     */
    add: function (req, res) {
       	return res.render('noticias/add-noticia', {
			titulo: 'Agregar noticia'
		});
	},

    /**
     * noticiaController.show()
     */
    edit: function (req, res) {
        var id = req.params.id;
        noticiaModel.findOne({_id: id}, function (err, noticia) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting noticia.',
                    error: err
                });
            }
            if (!noticia) {
                return res.status(404).json({
                    message: 'No such noticia'
                });
            }
            return res.render('noticias/edit-noticia', {
				titulo: noticia.titulo,
				noticia: noticia
			});
        });
    },

	
    /**
     * noticiaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        noticiaModel.findOne({_id: id}, function (err, noticia) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting noticia.',
                    error: err
                });
            }
            if (!noticia) {
                return res.status(404).json({
                    message: 'No such noticia'
                });
            }
            return res.render('noticias/show-noticia', {
				titulo: noticia.titulo,
				noticia: noticia
			});
        });
    },

    /**
     * noticiaController.create()
     */
    create: function (req, res) {
        var noticia = new noticiaModel({
			titulo : req.body.titulo,
			cuerpo : req.body.cuerpo,
			autor : req.body.autor

        });

        noticia.save(function (err, noticia) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating noticia',
                    error: err
                });
            }
            return res.redirect('/noticias');
        });
    },

    /**
     * noticiaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        noticiaModel.findOne({_id: id}, function (err, noticia) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting noticia',
                    error: err
                });
            }
            if (!noticia) {
                return res.status(404).json({
                    message: 'No such noticia'
                });
            }

            noticia.titulo = req.body.titulo;
			noticia.cuerpo = req.body.cuerpo;
			noticia.autor = req.body.autor;
			
            noticia.save(function (err, noticia) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating noticia.',
                        error: err
                    });
                }
				return res.redirect('/noticias');
            });
        });
    },

    /**
     * noticiaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        noticiaModel.findByIdAndRemove(id, function (err, noticia) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the noticia.',
                    error: err
                });
            }
			return res.redirect('/noticias');
        });
    }
};
