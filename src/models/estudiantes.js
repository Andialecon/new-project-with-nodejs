const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    nombre : {
        type : String,
        trim:true
    },
    cedula : {
        type : Number,
        require : true
    },
    correo : {
        type : String,
        trim:true
    },
    contrasena : {
		type : String,
		required : true
	},
    cursos :[{
        type : Schema.Types.ObjectId,
        ref : 'Curso'
    }]
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante 
