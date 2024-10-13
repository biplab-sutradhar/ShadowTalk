import { NextResponse } from 'next/server';
import { getServerSession, User } from 'next-auth';
import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(request: Request, { params }: { params: { messageId: string } }) {
  const messageId = params.messageId;
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!user || !session) {
    return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: 'Message not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Message deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ success: false, message: 'An error occurred' }, { status: 500 });
  }
}
