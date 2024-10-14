<<<<<<< HEAD
'use client';
import { MessageCard } from '@/components/MessagedCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
=======
"use client"
import { MessageCard } from '@/components/MessagedCard';
import { Button } from '@/components/ui/button';
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Messages } from '@/model/User';
import { acceptMessagesSchema } from '@/schemas/acceptMessagesSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
<<<<<<< HEAD
=======
import { randomUUID } from 'crypto';
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
<<<<<<< HEAD
import { v4 as uuid } from 'uuid';
=======
import {v4 as uuid} from 'uuid';
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc

const Page = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
<<<<<<< HEAD

  // console.log(messages[0].length);

=======
  
  // console.log(messages[0].length);
  
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  // Always call hooks first before any conditional rendering
  const fetchAcceptMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/accept-messages');
<<<<<<< HEAD
=======

>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
      setValue('acceptMessages', response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setIsSwitching(false);
    }
  }, [setValue]);

<<<<<<< HEAD
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setLoading(true);
      setIsSwitching(false);
      try {
        const response = await axios.get<ApiResponse>('/api/get-messages');
        // console.log(response?.data?.messages);

        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: 'Success',
            description: 'Messages refreshed successfully',
            variant: 'default',
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast({
          title: 'Error',
          description: 'Failed to fetch messages',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
        setIsSwitching(false);
      }
    },
    [setMessages]
  );
=======
  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setLoading(true);
    setIsSwitching(false);
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages');
      // console.log(response?.data?.messages);
      
      setMessages(response.data.messages || []);
      if (refresh) {
        toast({
          title: 'Success',
          description: 'Messages refreshed successfully',
          variant: 'default',
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: 'Error',
        description: 'Failed to fetch messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setIsSwitching(false);
    }
  }, [setMessages]);
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc

  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptMessages();
    fetchMessages();
  }, [session, fetchAcceptMessages, fetchMessages]);

  if (!session || !session.user) {
<<<<<<< HEAD
    return (
      <div className="text-black dark:text-white w-full flex items-center justify-center">
        Please sign in
      </div>
    );
=======
    return <div>Please sign in</div>;
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
  }

  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

<<<<<<< HEAD
  const handleSwitchChange = async (checked: boolean) => {
    setIsSwitching(true);
    try {
=======

  const handleSwitchChange = async (checked: boolean) => {
    setIsSwitching(true);
    try {
      
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
      const response = await axios.post('/api/accept-messages', {
        acceptMessages: checked,
      });
      setValue('acceptMessages', checked); // Update form state
      toast({
        title: 'Success',
<<<<<<< HEAD
        description: 'Messages switched successfully',
        variant: 'default',
      });
    } catch (error) {
=======
        description: "Messages switched successfully",
        variant: 'default',
      });
    } catch (error ) {
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
      toast({
        title: 'Error',
        description: 'Failed to switch messages',
        variant: 'destructive',
      });
    } finally {
      setIsSwitching(false);
    }
  };

<<<<<<< HEAD
=======


>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: 'URL Copied!',
      description: 'Profile URL has been copied to clipboard.',
    });
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen my-0 mx-0 p-6 bg-gray-100 dark:bg-black flex flex-col">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        User Dashboard
      </h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-black dark:text-white">
          Copy Your Unique Link
        </h2>
        <div className="flex items-center">
          <Input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2 border-gray-400 dark:border-gray-600 text-black dark:text-white bg-white dark:bg-gray-800"
          />
          <Button onClick={copyToClipboard} variant={'default'}>
            Copy
          </Button>
=======
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6  rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">UserDashboard</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
        </div>
      </div>

      <div className="mb-4">
        <Switch
          checked={acceptMessages}
          onCheckedChange={(checked) => handleSwitchChange(checked)}
          disabled={isSwitching}
        />
<<<<<<< HEAD
        <span className="ml-2 text-black dark:text-white">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>

      <Separator />

      <Button
        className="mt-4 w-min flex items-center border-gray-400 dark:border-gray-600"
=======

        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {loading ? (
<<<<<<< HEAD
          <Loader2 className="h-4 w-4 animate-spin text-gray-800 dark:text-gray-200" />
        ) : (
          <RefreshCcw className="h-4 w-4 text-gray-800 dark:text-gray-200" />
        )}
      </Button>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6">
        {messages[0]?.length > 0 ? (
          messages[0].map((message) => (
=======
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages[0]?.length > 0 ? (

          messages[0]?.map((message) => (
            
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
            <MessageCard
              key={uuid()}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
<<<<<<< HEAD
          <p className="text-black dark:text-white">No messages to display.</p>
=======
          <p>No messages to display.</p>
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
        )}
      </div>
    </div>
  );
};

export default Page;
