const EventoTrabajo = require('../models/EventoTrabajo');
const RegistroTrabajo = require('../models/RegistroTrabajo');
const { getLastEventByEmployeeId } = require('../helpers/getLastEventByEmployeeId');
const { workEvents } = require('../config/config');
const getEvents = async (req, res) => {
    const eventos = await EventoTrabajo.find();
    res.status(200).json({ eventos });
}

const createEvent = async (req, res) => {
    const { type, employeeId, date } = req.body;

    try {
        const evento = new EventoTrabajo({ type, employeeId, date });
        await evento.save();

        console.log(evento);

        //Here, when event type = 'checkOut' we create a new registrosTrabajo'
        if (type === 'checkOut') {
            console.log('here');
            
            const prevEvent = await getLastEventByEmployeeId(employeeId);

            console.log(prevEvent);
            //Check if previous event is a checkin
            if (prevEvent.type === workEvents.checkin) {

                //Calc hours prom prev event to actual
                const hours = (date - prevEvent.date) / (1000 * 60 * 60);

                //If hours > 24, then there is an error
                if (hours > 24) {
                    return res.status(400).json({ "ok": false, msg: 'There is no checkin in the previous 24 hours' });
                }

                //Create a new registro
                const registro = new RegistroTrabajo({ employeeId, date, hours });
                await registro.save();
            }
        }


        res.status(201).json({ evento });

    } catch (error) {
        res.status(500).json({ "ok": false, error, msg: 'Error creating event' });
    }


}

const getLastHour = async (req, res) => {
    // Find all events generated in the last hour
    const events = await EventoTrabajo.find({ date: { $gte: new Date(new Date().getTime() - 3600000) } });
    res.json({ events });
}


module.exports = {
    getEvents,
    createEvent,
    getLastHour
}



