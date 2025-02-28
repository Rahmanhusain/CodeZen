import { NextResponse } from "next/server";
import connectDB from "@/lib/DB/Dbconnection";
import { sendOtpEmail } from "@/utils/SendOtpEmail";
import Secret from "@/Modal/Secret";
import User from "@/Modal/User";
import bcrypt from "bcrypt";

const generateOtpAndEncrypt = async () => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const secret = await bcrypt.hash(otp, 10);
  return { otp, secret };
};

const addsecret = async (email, secret, otp) => {
  /* console.log('addsecret'); */
  try {
    const isuserexist = await User.findOne({ email }).exec();
    if (isuserexist) {
      throw new Error("User already exists");
    }
    const existingSecret = await Secret.findOne({ email }).exec();
    if (existingSecret) {
      await Secret.deleteOne({ email }).exec();
    }
    const newSecret = new Secret({ email: email, secret: secret });
    const htmlContent = `
    <div style="max-width: 600px; margin: 40px auto; background-color: #1a1a1a; padding: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); text-align: center;">
      <h1 style="font-size: 24px; font-weight: bold; color: white;">GTB4Love</h1>
      <h2 style="font-size: 20px; font-weight: bold; color: white; margin-top: 16px;">OTP Verification</h2>
      <p style="margin-top: 16px; color: white;">Your One-Time Password (OTP) for verification is:</p>
      <p style="margin-top: 8px; font-size: 24px; font-weight: bold; color: #ff006a;">${otp}</p>
      <p style="margin-top: 16px; color: white;">Please enter this OTP on the website to complete your verification process.</p>
      <p style="margin-top: 16px; font-size: 14px; color: white;">By submitting the OTP on our website, you agree to our <a href="https://drive.google.com/file/d/1_try-L11JBRFVy45VIRxALG18lPfWzr1/view?usp=sharing" target="_blank" style="color: #3b82f6; text-decoration: underline;">Terms and Conditions</a> and <a href="https://drive.google.com/file/d/1BIh_Y0yrHZbCHlkZYpoxrFcNc1sbhVKg/view?usp=sharing" target="_blank" style="color: #3b82f6; text-decoration: underline;">Privacy Policy</a>.</p>
      <p style="margin-top: 24px; color: white;">If you did not request this OTP, please ignore this email or contact our support team.</p>
      <p style="margin-top: 16px; color: white;">Thank you, <br> The GTB4Love Team</p>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #444;">
      <p style="font-size: 12px; color: #888; text-align: center;">
        You received this email because you signed up for GTB4Love. 
        If you wish to unsubscribe, <a href="https://gtb4love.vercel.app/unsubscribe?email=${email}" target="_blank" style="color: #ff006a; text-decoration: underline;">click here</a>.
      </p>
    </div>`;
  
    await sendOtpEmail(email, htmlContent, "OTP to Create Account");
    await newSecret.save();

  } catch (error) {
    if (error.message === "User already exists") {
      throw new Error("User already exists");
    } else if (error.code === 11000) {
      throw new Error("Duplicate key error");
    } else {
      throw new Error(error.message || "Unknown error");
    }
  }
};

const addsecretforget = async (email, secret, otp) => {
  /*   console.log("addsecretforget"); */
  try {
    const isuserexist = await User.findOne({ email }).exec();
    if (!isuserexist) {
      throw new Error("User do not exists");
    }
    const existingSecret = await Secret.findOne({ email }).exec();
    if (existingSecret) {
      await Secret.deleteOne({ email }).exec();
    }
    const newSecret = new Secret({ email: email, secret: secret });
    const htmlContent = `
    <div style="max-width: 600px; margin: 40px auto; background-color: #1a1a1a; padding: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); text-align: center;">
      <h1 style="font-size: 24px; font-weight: bold; color: white;">GTB4Love</h1>
      <h2 style="font-size: 20px; font-weight: bold; color: white; margin-top: 16px;">Reset Your Password</h2>
      <p style="margin-top: 16px; color: white;">We received a request to reset your password.</p>
      <p style="margin-top: 8px; color: white;">Your One-Time Password (OTP) to reset your password is:</p>
      <p style="margin-top: 8px; font-size: 24px; font-weight: bold; color: #ff006a;">${otp}</p>
      <p style="margin-top: 16px; color: white;">Please enter this OTP on the website to proceed with resetting your password.</p>
      <p style="margin-top: 16px; font-size: 14px; color: white;">By using this OTP, you agree to our <a href="https://drive.google.com/file/d/1_try-L11JBRFVy45VIRxALG18lPfWzr1/view?usp=sharing" target="_blank" style="color: #3b82f6; text-decoration: underline;">Terms and Conditions</a> and <a href="https://drive.google.com/file/d/1BIh_Y0yrHZbCHlkZYpoxrFcNc1sbhVKg/view?usp=sharing" target="_blank" style="color: #3b82f6; text-decoration: underline;">Privacy Policy</a>.</p>
      <p style="margin-top: 24px; color: white;">If you did not request a password reset, please ignore this email or contact our support team.</p>
      <p style="margin-top: 16px; color: white;">Thank you, <br> The GTB4Love Team</p>
      <hr style="margin: 24px 0; border: none; border-top: 1px solid #444;">
      <p style="font-size: 12px; color: #888; text-align: center;">
        You received this email because you signed up for GTB4Love. 
        If you wish to unsubscribe, <a href="https://gtb4love.vercel.app/unsubscribe?email=${email}" target="_blank" style="color: #ff006a; text-decoration: underline;">click here</a>.
      </p>
    </div>`;
  

    await sendOtpEmail(email, htmlContent, "OTP to Reset Password");
    await newSecret.save();

  } catch (error) {
    if (error.message === "User do not exists") {
      throw new Error("User do not exists");
    } else {
      throw new Error(error.message || "Unknown error");
    }
  }
};

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  try {
    const { email, isforget } = data;
    /* email && email!==null && email!=='' && await sendOtpEmail(email,otp) */
    const { otp, secret } = await generateOtpAndEncrypt();
    isforget
      ? await addsecretforget(email, secret, otp)
      : await addsecret(email, secret, otp);

    return NextResponse.json({
      message: "Email send successfully ",
      otp: otp,
      status: 201,
    });
  } catch (error) {
    console.log(error.message);
    if (
      error.message === "User already exists" ||
      error.message === "User do not exists"
    ) {
      return NextResponse.json({
        error: "User with this email already exists",
        status: 409,
      });
    } else if (error.message === "Duplicate key error") {
      return NextResponse.json({ error: "Duplicate key error", status: 409 });
    }else if(error.message==="otp limit exceeded"){
      return NextResponse.json({ error: "Failed to send OTP request limit", status: 620 });

    }
     else {
      return NextResponse.json({ error: "Failed to send OTP", status: 500 });
    }
  }
}
