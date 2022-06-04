const express = require('express');
var router = express.Router();
const Pacient = require('../models/paciente');

// rutas
router.get('/', (req, res) => {
    res.render('pages/paciente/agregarPacientes', {
        viewTitle: "Nuevo Paciente"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    insertPaciente(req, res)
    else
    updatePaciente(req, res)
});

//metodos para insertar y actualizar
function insertPaciente(req, res){
    var paciente = new Pacient();
    paciente.idpaciente = req.body.idpaciente;
    paciente.nombrepaciente = req.body.nombrepaciente;
    paciente.apellidopaciente = req.body.apellidopaciente;
    paciente.dui = req.body.dui;
    paciente.diagnostico = req.body.diagnostico;
    paciente.nombredoctor = req.body.nombredoctor;
    paciente.save(e => {
        if(!e)
        res.redirect('paciente/listaPacientes');
        else
        console.log("Error", e);
    });
}
function updatePaciente(req, res){
    Pacient.findOneAndUpdate({_id: req.body._id}, req.body, {new:true}, (err, doc) => {
        if(!err){
            res.redirect('paciente/listaPacientes');
        } else {
            res.render('paciente/agregarPacientes', {
                paciente: req.body
            })
        }
    });
}

router.get('/listaPacientes', (req, res) => {
    Pacient.find((error, docs) => {
        if(!error){
            res.render("pages/paciente/listaPacientes", {
                viewTitle: "Pacientes",
                list: docs
            })
        } else {
            console.log("Error", error);
        }
    });
})

router.get('/:id', (req, res) => {
    Pacient.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render('pages/paciente/agregarPacientes', {
                viewTitle: "Actualizar Paciente",
                paciente: doc
            });
        }
    });
});


router.get('/delete/:id', (req, res) => {
    Pacient.findByIdAndRemove(req.params.id, (err) => {
        if(!err){
            res.redirect('/paciente/listaPacientes');
        } else {
            console.log("Error", err);
        }
    });
})

module.exports = router;
