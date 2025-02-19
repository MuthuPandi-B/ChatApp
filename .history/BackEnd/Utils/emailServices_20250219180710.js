import nodemailer  from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//Email service function
export const sendEmail =async (to ,subject,text)=>{
    try{
        const transporter =nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.PASS_MAIL,
                pass:process.env.PASS_KEY,
            },
        });
        const mailOptions ={
            from:process.env.PASS_MAIL,
            to,
            subject,
            text,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }catch(error){
        console.error("Error sending email",error);
    }  

};
export de