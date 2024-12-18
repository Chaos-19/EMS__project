import transporter from "./nodeMailer.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    

    try {
        const info = await transporter.sendMail({
            from: "Events",
            to: email,
            subject: "Email Verification",
            text: " ",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
    
}

export const sendWelcomeEmail = async (email, name) => {
    try {
        const info = await transporter.sendMail({
            from: "Events",
            to: email,
            subject: "Welcome to Events",
            text: " ",
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
        })
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const info = await transporter.sendMail({
            from: "Events",
            to: email,
            subject: "Password Reset",
            text: " ",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        })
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
}

export const sendPasswordResetSuccessEmail = async (email) => {
    try {
        const info = transporter.sendMail({
            from: "Events",
            to: email,
            subject: "Password Reset Success",
            text: " ",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        })
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error); 
       }
}