import { auth } from "auth";
import React from 'react';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default async function Dashboard() {
  const session = await auth();
  console.log(session); // Keep it to see if we are getting user data correctly or not

  const newsArticles = [
    { id: 1, title: "Latest Market Trends", summary: "A deep dive into the latest market trends impacting our industry." },
    { id: 2, title: "Grad Gains Success Stories", summary: "Highlighting recent success stories from our Grad Gains community." },
    { id: 3, title: "Upcoming Networking Events", summary: "Don’t miss out on these upcoming networking opportunities." },
    { id: 4, title: "Innovation in Tech", summary: "Exploring new innovations in the technology sector." },
    { id: 5, title: "Global Economic Outlook", summary: "Analyzing the global economic outlook for the upcoming year." }
  ];
  
  //const cardBgColorClass = "bg-green-600";

  return (
    <div className="pt-20"> {/* Replace [height_of_navbar] with the actual height */}
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-5xl font-bold text-center my-10">Latest Financial News</h2>
        <Carousel className="w-full max-w-screen-md mx-auto"> 
          <CarouselContent>
            {newsArticles.map((article, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <h4 className="text-2xl font-semibold text-center">{article.title}</h4>
                      <p className="text-base text-center">{article.summary}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}