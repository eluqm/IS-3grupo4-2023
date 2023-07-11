const controller = {};

controller.mostrarHome = (req, res) => {
    res.render('home', {usuario:req.usuario})
};
controller.funcion2 = (req, res) => {

};

controller.funcion3 = (req, res) => {

}

module.exports = controller;
