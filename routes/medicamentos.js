const express = require('express');
var router = express.Router();
const medica = require('../models/medicamento');

// rutas
router.get('/', (req, res) => {
    res.render('pages/medicamento/agregarMedicamentos', {
        viewTitle: "Nuevo Medicamento"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    insertMedicamento(req, res)
    else
    updateMedicamento(req, res)
});

//metodos para insertar y actualizar
function insertMedicamento(req, res){
    var medicamento = new medica();
    medicamento.idmedi = req.body.idmedi;
    medicamento.idpaciente = req.body.idpaciente;
    medicamento.namemedi = req.body.namemedi;
    medicamento.recetaDate = req.body.recetaDate;
    medicamento.save(e => {
        if(!e)
        res.redirect('medicamento/listaMedicamentos');
        else
        console.log("Error", e);
    });
}
function updateMedicamento(req, res){
    medica.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, doc) => {
        if(!err){
            res.redirect('medicamento/listaMedicamentos');
        } else {
            res.render('medicamento/agregarMedicamentos', {
                paciente: req.body
            })
        }
    });
}

router.get('/listaMedicamentos', (req, res) => {
    medica.find((error, docs) => {
        if(!error){
            res.render("pages/medicamento/listaMedicamentos", {
                viewTitle: "Lista Medicamentos",
                list: docs
            })
        } else {
            console.log("Error", error);
        }
    });
})

router.get('/:id', (req, res) => {
    medica.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('pages/medicamento/agregarMedicamentos', {
                viewTitle: "Medicamento Actualizado",
                medicamento: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    medica.findByIdAndRemove(req.params.id, (err) => {
        if(!err){
            res.redirect('/medicamento/listaMedicamentos');
        } else {
            console.log("Error", err);
        }
    });
})

module.exports = router;
