const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicamentoSchema = new Schema({
    
    idmedi: String,
    idpaciente: String,
    namemedi: String,
    recetaDate: String,

});


const Medicamento = mongoose.model('Medicamento', medicamentoSchema);

module.exports = Medicamento;