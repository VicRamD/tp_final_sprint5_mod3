import {body} from 'express-validator';

//Validaciones
export const paisValidator = [body('nombreComunPais').notEmpty().isString().trim().isLength({min: 3, max: 90})
    .withMessage('El nombre común del país debe tener entre 3 y 60 carácteres').escape(),
    body('nombreOficialPais').notEmpty().isString().trim().isLength({min: 3, max: 90})
    .withMessage('El nombre oficial del país debe tener entre 3 y 60 carácteres').escape(),
    body('areaPais').notEmpty().isNumeric().trim()
    .custom( value => {
        //console.log('en custom area');
        return parseInt(value) >= 0;
    })
    .withMessage('El área debe ser un número no negativo').escape(),
    body('poblacionPais').notEmpty().isNumeric().trim()
    .custom( value => {
        //console.log('en custom area');
        return parseInt(value) >= 0;
    }).withMessage('La población debe ser un número no negativo').escape(),
    body('paisesFrontera').exists({checkFalsy: true}).isArray() 
    .withMessage('paisesFrontera no es un array - formato incorrecto').escape(),
    //elementos del array poderes
    body('paisesFrontera.*').notEmpty().trim().isString().isLength({min: 3, max: 3})
    .withMessage('El poder debe tener 3 carácteres que sean letras mayúsculas').escape()
]