import dbConnect from "@/libs/dbConnects";
import { Message } from "@/model/User"; 
export async function POST(request: Request) {
  await dbConnect();
  const { username, content} = await request.json();
  try {
    const user = await UserModel.findOne({ username }).exec();
    if (!user) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }
    
    // Check if the user is accepting messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        { message: 'User is not accepting messages', success: false },
        { status: 403 } // 403 Forbidden status
      );
    }
    const newMessage = { content, createdAt: new Date() };
    // Push the new message to the user's messages array
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      { message: 'Message sent successfully', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error sending message:", error);
    
    return Response.json(
      { message: 'Error sending message', success: false },
      { status: 500 }
    );
    
  }
}