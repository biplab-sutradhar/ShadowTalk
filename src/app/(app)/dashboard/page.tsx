'use client';
import { MessageCard } from '@/components/MessagedCard';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { decrypt } from '@/helpers/cryptFunction';
import { useToast } from '@/hooks/use-toast';
import { Messages } from '@/model/User';
import { acceptMessagesSchema } from '@/schemas/acceptMessagesSchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2, RefreshCcw } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

const Page = () => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const key = process.env.KEY || "e4a0b083f53a07d62b7858311a58f33b8f02c8a74f6cb8319356502b46c6cf25"; // Ensure default key is correct

  // console.log(messages[0].length);

  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  });

  const {  watch, setValue } = form;
  const acceptMessages = watch('acceptMessages');

  // Always call hooks first before any conditional rendering
  const fetchAcceptMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/accept-messages');
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

  const fetchMessages = useCallback(
    async (refresh = false) => {
      setLoading(true);
      setIsSwitching(false);
      try {
        const response = await axios.get<ApiResponse>('/api/get-messages');
        console.log(response);
  
        // Iterate over the nested messages and decrypt each content
        const decryptedMessages = response.data.messages.map((messageGroup) =>
          messageGroup.map((message) => ({
            ...message,
            content: decrypt(message.content, key),
          }))
        );
  
        // Update state with the decrypted messages
        setMessages(decryptedMessages);
  
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
  
  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptMessages();
    fetchMessages();
  }, [session, fetchAcceptMessages, fetchMessages]);

  if (!session || !session.user) {
    return (
      <div className="text-black dark:text-white w-full flex items-center justify-center">
        Please sign in
      </div>
    );
  }

  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const handleSwitchChange = async (checked: boolean) => {
    setIsSwitching(true);
    try {
      const response = await axios.post('/api/accept-messages', {
        acceptMessages: checked,
      });
      setValue('acceptMessages', checked); // Update form state
      toast({
        title: 'Success',
        description: 'Messages switched successfully',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to switch messages',
        variant: 'destructive',
      });
    } finally {
      setIsSwitching(false);
    }
  };

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(profileUrl);
  //   toast({
  //     title: 'URL Copied!',
  //     description: 'Profile URL has been copied to clipboard.',
  //   });
  // };

  return (
    <div className="min-h-screen my-0 mx-0 p-6 bg-gray-100 dark:bg-black flex flex-col">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        User Dashboard
      </h1>
      

      <div className="mb-4">
        <Switch
          checked={acceptMessages}
          onCheckedChange={(checked) => handleSwitchChange(checked)}
          disabled={isSwitching}
        />
        <span className="ml-2 text-black dark:text-white">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>

      <Separator />

      <Button
        className="mt-4 w-min flex items-center border-gray-400 dark:border-gray-600"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-gray-800 dark:text-gray-200" />
        ) : (
          <RefreshCcw className="h-4 w-4 text-gray-800 dark:text-gray-200" />
        )}
      </Button>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-6">
        {messages[0]?.length > 0 ? (
          messages[0].map((message) => (
            <MessageCard
              key={uuid()}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p className="text-black dark:text-white">No messages to display.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
