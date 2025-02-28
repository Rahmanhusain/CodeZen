import { NextResponse } from "next/server";
import User from "@/Modal/User";
import connectDB from "@/lib/DB/Dbconnection";
import { sendMultipleEmails } from "@/utils/SendOtpEmail";

export async function POST(request) {
  try {
    await connectDB();
    const { email, password, userid1, userid2 } = await request.json();
    let data;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      // Find the user with userid1
      const user1 = await User.findOne({ userid: userid1 });
      if (!user1) {
        return NextResponse.json({ error: "User1 not found" }, { status: 404 });
      }

      // Find the user with userid2
      const user2 = await User.findOne({ userid: userid2 });
      if (!user2) {
        return NextResponse.json({ error: "User2 not found" }, { status: 404 });
      }

      // Push userid2 to userid1's matchrequest array if not already present
      if (!user1.matchrequest.includes(userid2)) {
        user1.matchrequest.push(userid2);
        await user1.save();
      }

      // Check if userid1 is present in userid2's matchrequest array
      const isMatched = user2.matchrequest.includes(userid1);

      // If matched, update both users' matched arrays
      if (isMatched) {
        if (!user1.matched.includes(userid2)) {
          user1.matched.push(userid2);
          await user1.save();
        }
        if (!user2.matched.includes(userid1)) {
          user2.matched.push(userid1);
          await user2.save();
        }
        // Increase notififlastindex for both users
        await user1.save();
        await user2.save();
        await sendMultipleEmails([
          { email: user1.email, username: user2.Profilename, userids: user2.userid },
          { email: user2.email, username: user1.Profilename, userids: user1.userid },
          ]);
      }

    

      return NextResponse.json({
        message: "Request processed successfully",
        matched: isMatched,
        status: 201,
      });
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(request) {
  try {
    await connectDB();
    const { email, password, userid } = await request.json();

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Fetch the target user first to get `matched.length`
    const targetUser = await User.findOne({ userid });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Now update `notififlastindex` with the correct matched length
    const updatedUser = await User.findOneAndUpdate(
      { userid },
      { $set: { notififlastindex: targetUser.matched.length } },
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      message: "Notification index updated successfully",
      notififlastindex: updatedUser.notififlastindex,
      status: 200,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



export async function GET() {
  return NextResponse.json({ message: "Hello, world!" }, { status: 200 });
}