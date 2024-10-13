import { NextResponse } from 'next/server';


const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Prepare the request body
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    
    const responseData = await response.json();

    // Extract the generated message from the response
    const generatedMessage = responseData.candidates[0].content.parts[0].text;

    // Return the generated message in the response
    return NextResponse.json({ generatedMessage });
  } catch (error) {
    console.error(' Error making API request:', error);
    throw new Error('Error making API request: ' + error);
  }
}
