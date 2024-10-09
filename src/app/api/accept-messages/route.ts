import { getServerSession, User } from 'next-auth'; 
import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  await dbConnect();
  getServerSession(authOptions);
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!user || !session) {
    return Response.json(
      { success: false, message: 'Not authorized' },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ success: false, message: error }, { status: 500 });
  }
}

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

  const userId = user._id;

  try {
    const foundUser = await UserModel.findById(userId);

  if (!foundUser) {
    return Response.json(
      {
        success: false,
        message: 'User not found?',
      },
      {
        status: 404,
      }
    );
  }

  return Response.json({ success: true, isAcceptingMessage: foundUser.isAcceptingMessage }, { status: 200 });
  } catch (error) {
    console.log("Failed to fetch user", error);
    return Response.json({ success: false, message: "Error in getting messages acceptance  " }, { status: 500 });
    
  }
}
