import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodeUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodeUsername });

    if (!username || !code ) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found?' },
        { status: 404 }
      );
    };

    const isCodeValid = user.verifyCode === code;
    const isCodeExpired = new Date() < new Date(user.verifyCodeExpiry);
    if(isCodeValid || isCodeExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: 'Email verified successfully' },
        { status: 200 }
      );
    } else {
      return Response.json(
        { success: false, message: 'Invalid verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error sending verification email', error);
    return Response.json(
      { success: false, message: 'Error sending verification email' },
      { status: 500 }
    );
  }
}
