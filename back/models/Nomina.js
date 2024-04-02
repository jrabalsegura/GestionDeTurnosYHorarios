const {Schema, model} = require('mongoose');

const NominaSchema = Schema({
    date: {
        type: Date,
        required: true
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'Empleado',
        required: true
    },
    file: {
        //Ruta del archivo
        type: String
    }
});

module.exports = model('Nomina', NominaSchema);


