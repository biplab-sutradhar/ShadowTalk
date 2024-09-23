import { resend } from "@/libs/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ username, otp : verifyCode}),
    })
    return { success: true, message: "Verification email sent successfully" };

  } catch (error) {
     console.error("Error sending verification email", error);
     return { success: false, message: "Error sending verification email" };
     
  }
}