import transporter from "./nodeMailer.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

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



// async function sendTestEmail() {
//     try {
//         const info = await transporter.sendMail({
//             from: process.env.EMAIL, // Sender address
//             to: "natty.ayalew.code@gmail.com", // Recipient address
//             subject: "Test Email", // Subject
//             text: "This is a test2 email sent using Nodemailer!", // Plain text body
//         });

//         console.log("Email sent successfully: ", info.response);
//     } catch (error) {
//         console.error("Error sending email: ", error);
//     }
// }

// sendTestEmail();
