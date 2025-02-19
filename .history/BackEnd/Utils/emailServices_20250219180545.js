import nodemailer  from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

//Email service function
export const sendEmail =async (to ,subject,text)=>{
    try{
        const transporter =nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.,
                pass:process.env.PASSWORD
            }
    }
}