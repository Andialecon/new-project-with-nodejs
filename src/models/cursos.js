const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursosSchema = new Schema ({
    nombre : {
        type : String
    },
    id : {
        type : Number,
        require : true
    },
    descripcion : {
        type : String
    },
    modalidad : {
        type : String
    },
    costo : {
        type : Number
    },
    estado : {
        type : String
    }
});

const Curso = mongoose.model('Curso', cursosSchema);
module.exports = Curso 
