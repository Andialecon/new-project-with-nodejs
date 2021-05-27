const express = require("express");
const app = express();
// const parseurl = require('parseurl');
const path = require('path');
const hbs = require('hbs');
const Estudiante = require('./../models/estudiantes');
const Curso = require('./../models/cursos');
const bcrypt= require('bcrypt');
const saltRounds = 10;

const dirPartials = path.join(__dirname, '../../template/partials');
const dirViews = path.join(__dirname, '../../template/views');

require('./../helpers/helpers')

//HBS
app.set('view engine', 'hbs')
app.set('views', dirViews)
hbs.registerPartials(dirPartials)

//PAGINAS
app.get('/inicio', (req, res) => {
    res.redirect('/')
});

app.get('/', (req, res) => {
    Curso.find({}, (err, cursos) => {
        if (err) {
            return console.log(err)
        }
        res.render('index', {
            cuenta: "Interesado",
            todosLosCursos: cursos
        })
    })
});

app.post('/iniciarSesion', (req, res) => {
    Estudiante.findOne({nombre:req.body.usuario}, (err, estudiante) => {
        texto = "";
        if (err) {
            return console.log(err)
        } else if (estudiante){
            if(bcrypt.compareSync(req.body.contrasena, estudiante.contrasena)){
                req.session.usuario = estudiante._id;
                return res.redirect('estudiante')
            }else {
                texto = `Contraseña incorrecta`
                Curso.find({}, (err, cursos) => {
                    if (err) {
                        return console.log(err)
                    }
                    res.render('index', {
                        cuenta: "Interesado",
                        todosLosCursos: cursos,
                        mostrar:texto                    })
                })
            }
        }else{
            texto = `No se ha encontrado ninguna coincidencia con ese usuario`
            Curso.find({}, (err, cursos) => {
                if (err) {
                    return console.log(err)
                }
                res.render('index', {
                    cuenta: "Interesado",
                    todosLosCursos: cursos,
                    mostrar:texto
                })
            })
        }   
    })
});

app.post('/inscripcion', (req, res) => {
    Estudiante.findOne({cedula:req.body.cedula},(err, matriculado)=>{
        if(err){
            return console.log(err)
        }
        if(matriculado){
            Estudiante.findOneAndUpdate({_id:matriculado._id},{"$push": {cursos : req.body.idCurso}},{new:true},(err, modificado)=>{
                if(err){
                    return console.log(err)
                }
                Curso.find({}, (err, cursos) => {
                    if (err) {
                        return console.log(err)
                    }
                    curso = cursos.find(elemento=>elemento._id==req.body.idCurso)

                    res.render('index', {
                        cuenta: "Interesado",
                        todosLosCursos: cursos,
                        mostrar: `<div class="alert alert-info alert-dismissible fade show" role="alert">
                                     Te has matriculado al curso ${curso.nombre}
                                     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                 </div>`
                    })
                })
            })
        }else{
            const salt = bcrypt.genSaltSync(saltRounds);
            let estudiante = new Estudiante({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                contrasena : bcrypt.hashSync(req.body.clave, salt),
                cursos:[]
            })
            estudiante.cursos.push(req.body.idCurso);

            estudiante.save((err, resultado) => {
                if (err) {
                    return console.log(err)
                }
                Curso.find({}, (err, cursos) => {
                    if (err) {
                       return console.log(err)
                    }
                    curso = cursos.find(elemento=>elemento._id==req.body.idCurso)
                    res.render('index', {
                        cuenta: "Interesado",
                        todosLosCursos: cursos,
                        mostrar: `<div class="alert alert-info alert-dismissible fade show" role="alert">
                                     Te has matriculado al curso ${curso.nombre}
                                     <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                 </div>`
                    })
                })
            })
        }
    })
});

app.post('/salir', (req, res) => {
	req.session.destroy((err) => {
  		if (err) return console.log(err) 	
	})	
	res.redirect('/')	
})

//ERROR 404
app.get('*', function (req, res) {
    res.render('error');
})

module.exports = app
