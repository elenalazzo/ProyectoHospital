const express = require('express');
var router = express.Router();
const Diagnos = require('../models/diagnostico');

// rutas
router.get('/', (req, res) => {
    res.render('pages/diagnostico/agregarDiagnostico', {
        viewTitle: "Nuevo Diagnostico"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    insertdiagnostico(req, res)
    else
    updatediagnostico(req, res)
});

//metodos para insertar y actualizar
function insertdiagnostico(req, res){
    var diagnostico = new Diagnos();
    diagnostico.idDiag = req.body.idDiag;
    diagnostico.idpaciente = req.body.idpaciente;
    diagnostico.diag = req.body.diag;
    diagnostico.save(e => {
        if(!e)
        res.redirect('diagnostico/listaDiagnostico');
        else
        console.log("Error", e);
    });
}
function updatediagnostico(req, res){
    Diagnos.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, doc) => {
        if(!err){
            res.redirect('diagnostico/listaDiagnostico');
        } else {
            res.render('diagnostico/agregarDiagnostico', {
                diagnostico: req.body
            })
        }
    });
}

router.get('/listaDiagnostico', (req, res) => {
    Diagnos.find((error, docs) => {
        if(!error){
            res.render("pages/diagnostico/listaDiagnostico", {
                viewTitle: "Diagnostico",
                list: docs
            })
        } else {
            console.log("Error", error);
        }
    });
})

router.get('/:id', (req, res) => {
    Diagnos.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('pages/diagnostico/agregarDiagnostico', {
                viewTitle: "Diagnostico Actualizado",
                diagnostico: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Diagnos.findByIdAndRemove(req.params.id, (err) => {
        if(!err){
            res.redirect('/diagnostico/listaDiagnostico');
        } else {
            console.log("Error", err);
        }
    });
})

module.exports = router;
