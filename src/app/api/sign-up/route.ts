import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import dbConnect from '@/libs/dbConnects';

import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

// Helper function for sending error responses
const sendErrorResponse = (message: string, status: number) => {
  return Response.json({ success: false, message }, { status });
};

// Helper function to hash password
const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

// Function to check if the user already exists by username or email
const checkExistingUser = async (username: string, email: string) => {
  const existingUserVerifiedByUsername = await UserModel.findOne({
    username,
    isVerified: true,
  });

  const existingUserVerifiedByEmail = await UserModel.findOne({
    email,
    isVerified: true,
  });

  return { existingUserVerifiedByUsername, existingUserVerifiedByEmail };
};

// Function to create or update a user in the database
const createOrUpdateUser = async (
  existingUser: any,
  username: string,
  email: string,
  password: string,
  verifyCode: string
) => {
  const hashedPassword = await hashPassword(password);
  const expiryDate = new Date();
  expiryDate.setHours(expiryDate.getHours() + 1);

  if (existingUser) {
    // Update the existing unverified user
    existingUser.password = hashedPassword;
    existingUser.verifyCode = verifyCode;
    existingUser.verifyCodeExpiry = expiryDate;
    await existingUser.save();
  } else {
    // Create a new user
    const newUser = new UserModel({
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
};

// Function to generate a random verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// The main POST function
export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, username, password } = await req.json();

    if (!email || !username || !password) {
      return sendErrorResponse('Missing required fields', 400);
    }

    const { existingUserVerifiedByUsername, existingUserVerifiedByEmail } =
      await checkExistingUser(username, email);

    if (existingUserVerifiedByUsername) {
      return sendErrorResponse('User already exists by username', 400);
    }

    const verifyCode = generateVerificationCode();

    // If email is already registered but unverified, update it
    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return sendErrorResponse('User already exists by email', 400);
      }
    }

    // Create or update user in the database
    await createOrUpdateUser(
      existingUserVerifiedByEmail,
      username,
      email,
      password,
      verifyCode
    );

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return sendErrorResponse(emailResponse.message, 500);
    }

    return Response.json(
      { success: true, message: 'User created successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error signing up', error);
    return sendErrorResponse('Error signing up', 500);
  }
}
