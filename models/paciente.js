const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// El esquema se asigna a la coleccion de MongoDB
// Define el formato de todos los documentos de esa coleccion
// Todas las propiedades deben definirse un SchemaType

const pacienteSchema = new Schema({
    idpaciente: String, 
    nombrepaciente: String,
    apellidopaciente: String,
    dui: String,
    diagnostico: String,
    nombredoctor: String
});

// Crear un modelo
const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;