import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from 'nodemailer';


// 🛠️ Initialize Supabase
const supabase = createClient("https://iffadcitwirnptuabcbr.supabase.co", process.env.SUPABASE_SERVICE_KEY);

/* export async function GET(req) {
    try {
      // Public Image URL
      const imageUrl =
        "https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages//mohit.jpg";
  
      // ✅ Extract Object Path from URL
      let filePath = imageUrl.replace(
        "https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages/",
        ""
      );
  
      // ✅ Remove any leading or trailing slashes
      filePath = filePath.replace(/^\/+|\/+$/g, "");
  
      console.log("Extracted File Path:", filePath); // Debugging
  
      if (!filePath) throw new Error("Invalid file path extracted.");
  
      // ✅ Delete Image from Supabase Storage
      const { data, error } = await supabase.storage
        .from("findyourdateuserimages") // Correct bucket name
        .remove([filePath]);
  
      console.log("Delete Response:", data, error); // Debugging
  
      if (error) throw error;
  
      return NextResponse.json(
        { message: "Image deleted successfully!", deletedFile: data },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  } */
    
    export const sendOtpEmail=async(email, content,subject)=>{
      // Create a transporter object using SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com', // or another email service
        port: 587, // Mention port 587 here
        secure: false, // true for 465, false for other ports
        auth: {
          user: "861e89001@smtp-brevo.com", // Your email address
          pass: "LYdpC7ZIDmfxN5PT", // Your email password
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
        console.log(error)
        error.message="otp limit exceeded"
        throw new Error(error.message);
      }
    }
    

    export async function GET(req) {
      try {
        await sendOtpEmail("rahmanhusain899@gmail.com", "Hello, world!", "Test Email");

        return NextResponse.json(
        { message: "Hello, world!" },
        { status: 200 }
        );
      } catch (error) {
        return NextResponse.json(
        { error: error.message },
        { status: 500 }
        );
      }
    }