import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const generateVerifyCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return Response.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existingUserVerifiedbyUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedbyUsername) {
      return Response.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }

    const existingUserVerifiedByEmail = await UserModel.findOne({
      email,
      isVerified: true,
    });

    const verifyCode = generateVerifyCode();
    const hashedPassword = await hashPassword(password);

    if (existingUserVerifiedByEmail) {
      existingUserVerifiedByEmail.password = hashedPassword;
      existingUserVerifiedByEmail.verifyCode = verifyCode;
      existingUserVerifiedByEmail.verifyCodeExpiry = new Date(
        Date.now() + 3600000
      );
      await existingUserVerifiedByEmail.save();
    } else {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = await new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }

    return Response.json(
      { success: true, message: 'User created successfully' },
      { status: 200 }
    );
  } catch (error : any) {
    console.error('Error signing up', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}