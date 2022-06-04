const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diagnosticoSchema = new Schema({
    idDiag: String,
    idpaciente: String,
    diag: String,

});


const Diagnostico = mongoose.model('Diagnostico', diagnosticoSchema);

module.exports = Diagnostico;