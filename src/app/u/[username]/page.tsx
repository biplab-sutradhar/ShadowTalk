"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messagesSchema"; // Ensure this path is correct
import { toast } from "@/hooks/use-toast"; // Ensure this path is correct
import { ApiResponse } from "@/types/ApiResponse"; // Ensure this path is correct

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString = "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function Message_page() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const messageContent = form.watch("content");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(parseStringMessages(initialMessageString));

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        ...data,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });

      form.reset(); // Reset the form after submission
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const fetchSuggestedMessages = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/suggest-messages");
      const messages = parseStringMessages(response.data.generatedMessage || "");
      setSuggestedMessages(messages);
      toast({
        title: "New messages generated!",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch new suggested messages. Using default messages.",
        variant: "destructive",
      });
      // If the generation fails, suggestedMessages will remain the same.
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
    <div className="container mx-auto my-8 p-6 rounded max-w-4xl flex-grow">
      <h1 className="text-4xl font-bold mb-6 text-center text-black dark:text-white">
        Public Profile Link
      </h1>
  
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="border  space-y-6">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black dark:text-white">
                  Send Anonymous Message to @{username}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous message here"
                    className="resize-none border "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !messageContent}>
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>
  
      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <p className="text-black dark:text-white">
            Click on any message below to select it.
          </p>
        </div>
  
        <Card className="bg-white dark:bg-gray-700">
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Messages
            </h3>
            <Button variant="default" onClick={fetchSuggestedMessages}>
              Generate New Messages
            </Button>
          </CardHeader>
  
          <CardContent className="flex flex-col space-y-4">
            {suggestedMessages.map((message, index) => (
              <Button
                key={index}
                variant="outline"
                className="mb-2 text-black dark:text-white"
                onClick={() => handleMessageClick(message)}
              >
                {message}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  
  );
}
