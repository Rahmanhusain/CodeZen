// utils.js

import nodemailer from 'nodemailer';

export const sendOtpEmail=async(email, content,subject)=>{
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // or another email service
    port: 587, // Mention port 587 here
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"GTB4love - OTP Service" <infofindyourdate@gmail.com>`, // Fixed "From" field
    to: email,
    subject: `GTB4Love - ${subject}`,
    text: content.replace(/<[^>]*>?/gm, ''), // Strips HTML for plain text fallback
    html: content, // HTML content for better styling
  };

  // Send email
  try {
    let info = await transporter.sendMail(mailOptions);
    if (!info.accepted.length) {
      throw new Error('Email not accepted');
    }
    return info;
  } catch (error) {
    error.message="otp limit exceeded"
    throw new Error(error.message);
  }
}


export const sendMultipleEmails = async (recipients) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // or another email service
    port: 587, // Mention port 587 here
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Function to generate email content dynamically
  const generateEmailContent = (username, email,userids) => `
    <div style="max-width: 600px; margin: 40px auto; background-color: #1a1a1a; padding: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); text-align: center;">
      <h1 style="font-size: 24px; font-weight: bold; color: white;">GTB4Love</h1>
      <h2 style="font-size: 20px; font-weight: bold; color: white; margin-top: 16px;">🎉 Great News! A Match is Found with <span style="color: #E1306C; font-weight: bold;">${username}</span>!</h2>
      <p style="margin-top: 16px; color: white;">We are excited to inform you that we have found a potential match for you on GTB4Love!</p>
      <p style="margin-top: 16px; color: white;">You have been matched with <span style="color: #E1306C; font-weight: bold;">${username}</span>!</p>
      <p style="margin-top: 16px; color: white;">Login to your account to view your match and start a conversation.</p>
      <a href="https://gtb4love.vercel.app/userprofile/${userids}" target="_blank" style="display: inline-block; margin-top: 24px; background-color: #ff006a; color: white; padding: 12px 24px; border-radius: 8px; font-weight: bold; text-decoration: none;">View Your Match</a>
      <p style="margin-top: 16px; color: white;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
      <p style="margin-top: 16px; color: white;">Happy Matching! <br> The GTB4Love Team</p>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #444;">
      <p style="font-size: 12px; color: #888; text-align: center;">
        You received this email because you signed up for GTB4Love. 
        If you wish to unsubscribe, <a href="https://gtb4love.vercel.app/unsubscribe?email=${email}" target="_blank" style="color: #ff006a; text-decoration: underline;">click here</a>.
      </p>
    </div>
  `;

  // Create email promises for each recipient
  const emailPromises = recipients.map(({ email, username ,userids}) => {
    const mailOptions = {
      from: `"GTB4Love - Match Found" <infofindyourdate@gmail.com>`,
      to: email,
      subject: `GTB4Love - Match Found!`,
      text: `We found a match for you: ${username}. Log in to your account to check.`,
      html: generateEmailContent(username, email,userids),
    };

    return transporter.sendMail(mailOptions);
  });

  try {
    const results = await Promise.all(emailPromises);
    return results;
  } catch (error) {
    throw new Error(`Failed to send emails: ${error.message}`);
  }
};