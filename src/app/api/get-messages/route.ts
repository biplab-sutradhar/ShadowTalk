import { getServerSession, User } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User'; 
import mongoose from 'mongoose';


export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!user || !session) {
    return Response.json(
      { success: false, message: 'Not authorized' },
      { status: 401 }
    );
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$messages' },
      {$sort: { 'messages.createdAt': -1 }},
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },

    ])
    if (!user || user.length === 0) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    };
    return Response.json({ success: true, messages: user[0].messages }, { status: 200 });

  } catch (error : any) {
    console.log("unexpected error", error);
    
    return Response.json(
      { success: false, message: 'User not found' },
      { status: 404 }
    );
  };
}