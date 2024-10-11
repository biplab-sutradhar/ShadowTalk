'use client'

import React from 'react';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/hooks/use-toast';
import { Messages } from '@/model/User';

type MessageCardProps = {
  message: Messages;
  onMessageDelete: (messageId: string) => void;
};

export function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      console.log("message in delete", message);
      
      console.log("response in delete", response);
      
  
      if (response.data.success) {
        toast({
          title: 'Success',
          description: 'Message deleted successfully',
          variant: 'default',
        });
        onMessageDelete(message._id as string); // Call the function to remove from UI
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("error in delete", error);
      
      toast({
        title: 'Error',
        description:
          axiosError.response?.data.message ?? 'Failed to delete message',
        variant: 'destructive',
      });
    } 
  };
  
  return (
    <Card className="bg-white shadow-md rounded-lg border relative border-gray-200 p-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold truncate">
            <span className="block max-h-16 overflow-hidden line-clamp-5">
              {message.content}
            </span>
          </CardTitle>
          <AlertDialog >
            <AlertDialogTrigger asChild>
              <Button variant='destructive' >
                <X className="w-5 h-5 absolute" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-lg text-black font-semibold'>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction className='bg-red-500' onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm text-gray-500">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      <CardContent />
    </Card>
  );
}
