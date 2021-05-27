const hbs = require('hbs');
const fs = require('fs');
const Curso = require('../models/cursos');
const Estudiante = require('../models/estudiantes');

// hbs.registerHelper("listarCursos", (cursos) => {
//     if (cursos) {
//         let texto = `<div class="table-responsive"><table class="table table-hover"><thead class="table-dark"><th>CURSO</th><th>ID</th><th>VALOR</th><th>MODALIDAD</th><th>MATRICULADOS</th> <th>ESTADO</th><th>ELIMINAR</th></thead><tbody>`
//         cursos.forEach(curso => {
//             if (curso.estado != "disponible") {
//                 texto = texto + `<tr><td>${curso.nombre}</td><td>${curso.id}</td><td>${curso.costo}</td><td>${curso.modalidad}</td><td>Ver&nbsp;<button type="submit" name="idMostrar" value="${curso._id}" class="btn btn-sm"><i class="fas fa-eye"></i></button></td><td><button type="submit" value="${curso._id}" name="idCamb" class="btn btn-secondary btn-sm"><i class="fas fa-toggle-off"></i></button>&nbsp;${curso.estado}</td><td><button type="submit" value="${curso._id}" name="idDelete" class="btn btn-outline-dark btn-sm"><i class="fas fa-trash-alt"></i></button></td></tr>`
//             } else {
//                 texto = texto + `<tr><td>${curso.nombre}</td><td>${curso.id}</td><td>${curso.costo}</td><td>${curso.modalidad}</td><td>Ver&nbsp;<button type="submit" name="idMostrar" value="${curso._id}" class="btn btn-sm"><i class="fas fa-eye"></i></button></td><td><button type="submit" value="${curso._id}" name="idCamb" class="btn btn-success btn-sm"><i class="fas fa-toggle-on"></i></button>&nbsp; ${curso.estado}</td><td><button type="submit" value="${curso._id}" name="idDelete" class="btn btn-outline-dark btn-sm"><i class="fas fa-trash-alt"></i></button></td></tr>`
//             };
//         });
//         texto = texto + `</tbody></table></div>`
//         return texto;
//     }
// });




