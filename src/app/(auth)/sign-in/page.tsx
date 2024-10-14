"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { signinSchema } from "@/schemas/signInSchema";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signinSchema>) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

     
    console.error("Error during sign-in:", result?.error);



    setIsSubmitting(false);

    if (result?.error) {
      let errorMessage;
      switch (result.error) {
        case "CredentialsSignin":
          errorMessage = "Incorrect username or password.";
          break;
        case "Error: User not found with this email":
          errorMessage = "No account found with this email.";
          break;
        default:
          errorMessage = "An unknown error occurred. Please try again.";
          break;
      }

    return( toast({
        title: "Signin failed",
        description: errorMessage,
        variant: "destructive",
      }))
    } else if (result?.url) {
      
  
     
      setTimeout(() => {
        router.replace('/dashboard');
      }, 1000);  

      return(toast({
        title: "Sign-in successful",
        description: "Redirecting to dashboard...",
        variant: "default",
      }))

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join ShadowTalk
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email or username" />
                  </FormControl>
                  <FormMessage />
                  <p className="text-muted text-gray-400 text-sm">
                    We will send you a verification code
                  </p>
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
<<<<<<< HEAD
                  {/* Please wait */}
=======
                  Please wait
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>


        <Link href={"/sign-up"}>
          <div className=" text-center w-full mt-4 hover:font-semibold">Create Your Account</div>
        </Link>


      </div>
    </div>

  );
};

export default Page;
