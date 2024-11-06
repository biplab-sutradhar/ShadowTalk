import { getServerSession, User } from 'next-auth';
import dbConnect from '@/libs/dbConnects';
import UserModel from '@/model/User';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user = session?.user as User;

  // Check if the user is authorized
  if (!user || !session) {
    return new Response(
      JSON.stringify({ success: false, message: 'Not authorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Extract search term from query parameters
    const searchTerm = new URL(request.url).searchParams.get('q') || '';

    if (!searchTerm) {
      return new Response(
        JSON.stringify({ success: false, message: 'Search term is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Perform case-insensitive search for users based on the search term
    const users = await UserModel.find({
      username: { $regex: `^${searchTerm}`, $options: 'i' }
    }).limit(10);

    console.log("users", users.length);
    
    if (users.length == 0) {
      return new Response(
        JSON.stringify({ success: false, message: 'No users found' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Map user data to desired format
    const result = users.map((user) => ({
      id: user._id.toString(),
      username: user.username
    }));

    return new Response(
      JSON.stringify({ success: true, users: result }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.log("An unexpected error occurred", error?.message);
    return new Response(
      JSON.stringify({ success: false, message: "An unexpected error occurred" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
