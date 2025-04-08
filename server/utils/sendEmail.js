
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


export const sendRSVPConfirmation = async (to, name, eventTitle, seats) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail", // Or use another SMTP service
            auth: {
                user: process.env.EMAIL_USER, // 🔐 Store in .env
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject: `🎉 RSVP Confirmation for ${eventTitle}`,
            html: `
                <h2>Hi ${name},</h2>
                <p>Thanks for RSVPing to <strong>${eventTitle}</strong>!</p>
                <p>You have reserved <strong>${seats}</strong> seat(s).</p>
                <p>We look forward to seeing you at the event! 🎊</p>
                <br/>
                <p style="color:gray;">This is an automated message, please do not reply.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
    } catch (error) {
        console.error("❌ Failed to send email:", error.message);
    }
};

export const sendWelcomeEmail = async (to, name) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: `"GoGather 🎉" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Welcome to GoGather!",
        html: `
      <h2>Hey ${name}, welcome aboard! 🎊</h2>
      <p>We're thrilled to have you join our GoGather community!</p>
      <p>You can now RSVP to events, get reminders, and more!</p>
      <br/>
      <p>– Team GoGather  🚀</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Welcome email sent to", to);
    } catch (error) {
        console.error("❌ Failed to send welcome email:", error);
    }
};
