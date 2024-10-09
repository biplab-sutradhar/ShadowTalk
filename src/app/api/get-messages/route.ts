import { getServerSession, User } from 'next-auth';
import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User'; 
import mongoose from 'mongoose';
import { authOptions } from '../auth/[...nextauth]/options';

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
    const user = await UserModel
      .aggregate([
        { $match: { _id: userId } },
        {
          $unwind: {
            path: "$message",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { "message.createdAt": -1 },
        },
        { $group: { _id: "$_id", message: { $push: "$message" } } },
      ])
      .exec();

    // console.log("user data -> ", user);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "user nahi found",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: user[0].message, // sending whole message array 
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("An unexpected error occured", error);
    return Response.json(
      {
        success: false,
        message: "An unexpected error occured",
      },
      { status: 500 }
    );
  }
}