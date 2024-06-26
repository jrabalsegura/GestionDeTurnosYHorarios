const Employee = require("../models/Employee")
const bcrypt = require('bcryptjs');

//Create employee user
const createUser = async (body) => {
    try {
        // Check if admin user exists before creating it
        const userExists = await Employee.findOne({ username: body.username });
        if (userExists) {
            return;
        }
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync(10);

        const employee = new Employee(body);
        employee.password = bcrypt.hashSync(body.password, salt);

        await employee.save();
        
        return employee;

    } catch (error) {
        console.log(error, 'Error creating user'); 
    }
    
}

module.exports = {
    createUser
}

