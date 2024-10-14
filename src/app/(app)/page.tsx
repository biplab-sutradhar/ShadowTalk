<<<<<<< HEAD
'use client';
=======
'use client'; 
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
<<<<<<< HEAD
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
=======
import {  Carousel,
  CarouselContent,
  CarouselItem, } from '@/components/ui/carousel';
 
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc

export default function Home() {
  return (
    <>
<<<<<<< HEAD
      <main className="flex-grow min-h-screen flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-white dark:bg-gray-800 text-black dark:text-white">
=======
      {/* Main content */}
      <main className="flex-grow min-h-screen flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
<<<<<<< HEAD

=======
 
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
<<<<<<< HEAD
                <Card className="bg-white dark:bg-gray-700">
                  <CardHeader>
                    <CardTitle className="text-black dark:text-white">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0 text-black dark:text-white" />
                    <div>
                      <p className="text-black dark:text-white">
                        {message.content}
                      </p>
                      <p className="text-xs text-muted-foreground dark:text-gray-300">
=======
                <Card>
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

<<<<<<< HEAD
=======

>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © 2024 True Feedback. All rights reserved.
      </footer>
    </>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 2ff8f5608bc6b6464652c83742421df2e92380cc