'use client';
import { Mail } from 'lucide-react'; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      <main className="flex-grow min-h-screen flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-white  dark:bg-gray-800 text-black dark:text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 3000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
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

      <footer className="text-center p-4 md:p-6 text-black dark:text-white bg-white dark:bg-gray-900 border">
        © 2024 Shadowtalk All rights reserved.
      </footer>
    </>
  );
}
