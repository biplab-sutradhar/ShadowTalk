<<<<<<< HEAD
'use client';
import { useToast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
=======
"use client"
import { useToast } from '@/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
<<<<<<< HEAD
} from '@/components/ui/form';
=======
} from "@/components/ui/form";
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { verifySchema } from '@/schemas/verifySchema';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
<<<<<<< HEAD
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post('/api/verify-code', {
        username: params.username,
        code: data.code,
      });

      toast({
        title: 'Success',
        description: response.data.message,
        variant: 'default',
      });
      router.replace('/sign-in');
=======

  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {

    try {
      const response = await axios.post('/api/verify-code', {
        username: params.username,
        code: data.code
      });

      toast({
        title: "Success",
        description: response.data.message,
        variant: "default"
      });
      router.replace('/sign-in')
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log(error);

      const errorMessage = axiosError.response?.data.message;
      toast({
<<<<<<< HEAD
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };
=======
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md ">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
<<<<<<< HEAD
            Verify Account
          </h1>
          <p className="mb-6 text-gray-600">
            Enter the code sent to your email
          </p>
=======
          Verify Account
      </h1>
      <p className="mb-6 text-gray-600">Enter the code sent to your email</p>
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter code"
                      className="input input-bordered w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center mt-6">
              <Button className="btn btn-primary w-full">Verify</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
<<<<<<< HEAD
  );
};

export default VerifyAccount;
=======

  )
}

export default VerifyAccount
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
