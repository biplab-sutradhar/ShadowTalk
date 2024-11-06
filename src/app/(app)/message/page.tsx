"use client";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "@/hooks/use-toast";
import { encrypt } from "@/helpers/cryptFunction";


// Parse messages by separator
const specialChar = "||";
const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};
const initialMessageString = "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function MessagePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messageContent, setMessageContent] = useState<string>("");
  const [usernameSearch, setUsernameSearch] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ id: string; username: string } | null>(null);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>(parseStringMessages(initialMessageString));

  const form = useForm({ defaultValues: { content: "" } });

  const fetchUserSuggestions = async (searchTerm: string) => {
    if (searchTerm) {
      try {
        const response = await axios.get<ApiResponse>("/api/search-user", { params: { q: searchTerm } });
        // console.log("response", response);
        
        if (response.data.success) {
          setUserSearchResults(response.data.users);
          setShowSuggestions(true);
        } else {
          setUserSearchResults([]);
          setShowSuggestions(false);
        }
        toast({ title: response.data.message, variant: "default" });
      } catch (error) {
        toast({ title: "Error", description: "Failed to fetch user suggestions.", variant: "destructive" });
        setUserSearchResults([]);
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleUserSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsernameSearch(value);
    fetchUserSuggestions(value);
  };

  const handleUserSelect = (user: { id: string; username: string }) => {
    setSelectedUser(user);
    setUsernameSearch(user.username);
    setShowSuggestions(false);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(e.target.value);
  };

  const onSubmit = async (data: { content: string }) => {
    if (!selectedUser) {
      toast({ title: "Error", description: "Please select a recipient.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
   
  const key = process.env.KEY || "e4a0b083f53a07d62b7858311a58f33b8f02c8a74f6cb8319356502b46c6cf25"; // Ensure default key is correct

  try {
     
    const encryptedMessage = encrypt(data.content, key);  const response = await axios.post<ApiResponse>("/api/send-message", {
        username: selectedUser.username,  
      content: encryptedMessage,
      });
// console.log("response", response);

      toast({ title: response.data.message, variant: "default" });
      form.reset();
      setMessageContent("");
      setSelectedUser(null);
      setUsernameSearch("");
    } catch (error) {
      console.log("error", error);
      
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

  const fetchSuggestedMessages = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/suggest-messages");
      const messages = parseStringMessages(response.data.generatedMessage || "");
      setSuggestedMessages(messages);
      toast({ title: "New messages generated!", variant: "default" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch new suggested messages. Using default messages.",
        variant: "destructive",
      });
    }
  };

  const handleSuggestedMessageClick = (message: string) => {
    setMessageContent(message);
    form.setValue("content", message);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto my-8 p-6 max-w-4xl bg-white dark:bg-gray-800 shadow-lg rounded-lg flex-grow">
        <h1 className="text-3xl font-semibold mb-6 text-center">Send a Message</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormItem>
              <FormLabel className="text-sm font-semibold">Recipient Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type @username"
                  value={usernameSearch}
                  onChange={handleUserSearchChange}
                  className="border border-gray-300 dark:border-gray-600 rounded"
                />
              </FormControl>
              <FormMessage />
              {showSuggestions && userSearchResults.length > 0 && (
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 w-min rounded-lg shadow p-2 mt-2">
                  <ul className="space-y-1">
                    {userSearchResults.map((user) => (
                      <li key={user.id}>
                        <Button variant="ghost" onClick={() => handleUserSelect(user)} className="w- text-">
                          @{user.username}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </FormItem>

            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here"
                      {...field}
                      value={messageContent}
                      onChange={handleMessageChange}
                      className="border border-gray-300 dark:border-gray-600 rounded resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              {isLoading ? (
                <Button disabled className="px-6 py-2 bg-gray-500 dark:bg-gray-600 text-white rounded">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!messageContent || !selectedUser}
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded"
                >
                  Send Message
                </Button>
              )}
            </div>
          </form>
        </Form>

        <Card className="bg-gray-50 dark:bg-gray-700 mt-8 p-4 rounded-lg shadow">
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Suggested Messages</h3>
            <Button variant="ghost" onClick={fetchSuggestedMessages} className="text-blue-500 dark:text-blue-400">
              Generate New
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedMessages.map((message, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full text-left bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg py-2 px-4 text-sm font-normal"
                onClick={() => handleSuggestedMessageClick(message)}
              >
                {message}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
