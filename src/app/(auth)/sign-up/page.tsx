"use client";
import { useToast } from "@/hooks/use-toast";
import { signupSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";

const Page = () => {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const checkUsernameUnique = useDebounceCallback(async (debouncedUserName) => {
    if (debouncedUserName.length < 3) {
      setUserNameMessage(""); 
      return;
    }

    setIsCheckingUserName(true);
    try {
      await axios.get(`/api/check-username-unique?username=${debouncedUserName}`);
      setUserNameMessage(""); 
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response?.status === 409) {
        setUserNameMessage(axiosError.response.data.message ?? "Username already taken");
      }
    } finally {
      setIsCheckingUserName(false);
    }
  }, 300); 

  useEffect(() => {
    checkUsernameUnique(userName); 
  }, [userName, checkUsernameUnique]);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);
    try {
      await axios.post<ApiResponse>("/api/signup", data);
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      router.replace(`verify/${data.username}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        variant: "destructive",
        description: axiosError.response?.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome  
          </h1>
          <p className="mb-4">Sign in to pick up your Shadow conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUserName(e.target.value); // Update username state
                      }}
                    />
                    {isCheckingUserName && <Loader2 className="w-4 h-4 animate-spin" />}
                  </FormControl>
                  <FormMessage>{userNameMessage}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit" disabled={isSubmitting}>Sign In</Button>
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
