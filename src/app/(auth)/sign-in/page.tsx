"use client";
import { useToast } from "@/hooks/use-toast";
import { signupSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const debouncedUserName = useDebounceValue(userName, 300);
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUserName.length < 3 || isCheckingUserName) {
        return; // Ensure username has at least 3 characters
      }
      setIsCheckingUserName(true);
      try {
        await axios.get(`/api/check-username-unique?username=${debouncedUserName}`);
        setUserNameMessage(""); // Clear message if unique
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response?.status === 409) {
          setUserNameMessage(axiosError.response.data.message ?? "Username already taken");
        }
      } finally {
        setIsCheckingUserName(false);
      }
    };

    checkUsernameUnique();
  }, [debouncedUserName]);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      await axios.post<ApiResponse>("/api/signup", data);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      router.replace(`verify/${data.username}`); // Use data.username
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        variant: "destructive",
        description: axiosError.response?.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8   rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome  
          </h1>
          <p className="mb-4">Sign in to pick up your Shadow conversations</p>
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
                    
                  <Input {...field} onChange={(e) =>{
                    field.onChange(e);
                    setUserName(e.target.value);
                  }}/>
                  </FormControl>
                  <FormMessage />
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
                    
                  <Input type="password" {...field} onChange={(e) =>{
                    field.onChange(e);
                    setUserName(e.target.value);
                  }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;