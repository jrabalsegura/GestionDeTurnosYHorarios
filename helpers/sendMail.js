const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (subject, text) => {
    const msg = {
        to: 'admin@joserabalsegura.com',
        from: 'admin@joserabalsegura.com',
        subject,
        text
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    sendMail
}