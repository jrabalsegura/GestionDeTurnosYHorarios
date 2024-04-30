const Nomina = require('../models/Nomina');

const getNominas = async (req, res) => {

    //Find all then nominas by employeeId
    const id = req.uid;

    try {
        const nominas = await Nomina.find({employeeId: id});
        res.status(200).json({ok: true, nominas});
    } catch (error) {
        res.status(500).json({ok: false, msg: 'Error fetching nominas'});
    }
}

const createNomina = async (req, res) => {
    const {employeeId, month, year, baseSallary, horasExtra, socialSecurity, pago} = req.body;

    const nomina = await Nomina.find({employeeId, month, year});
    if (nomina) {
        res.status(500).json({ok: false, msg: 'Nomina ya existe para empleado y mes'});
    }
    try {
        const newNomina = new Nomina({employeeId, month, year, baseSallary, horasExtra, socialSecurity, pago});
        await newNomina.save();
        res.status(200).json({ok: true, nomina});
    } catch (error) {
        res.status(500).json({ok: false, msg: 'Error creating nomina'});
    }
}

module.exports = {
    getNominas,
    createNomina
}

