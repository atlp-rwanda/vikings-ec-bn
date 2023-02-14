import nodemailer from "nodemailer"
 
module.exports = async(email,subject,text) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.PORT,
            service: process.env.SERVICE,
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS, 
            }
        })

        transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log(email)
        console.log("email sent successfull")
    } catch (error) {
        console.log(error,"email not sent")
    }
}