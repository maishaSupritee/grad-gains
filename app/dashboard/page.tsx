"use client"
import React, { useEffect, useState } from 'react';
import { fetchNews, NewsItem } from '@/lib/alpaca';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import fetchRssFeed from '@/lib/rss';
// import { RssFeedItem } from '@/lib/rssfeeditem';

interface RssFeedItem {
  title: string;
  link: string;
  contentSnippet: string;
  
}

const Dashboard = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [rssFeedItems, setRssFeedItems] = useState<RssFeedItem[]>([]);

  
  useEffect(() => {
    fetchNews().then(setNews).catch(console.error);
    const fetchRssFeed = async () => {
      try {
        const res = await fetch('/api/fetchrss');
        const data = await res.json();
        setRssFeedItems(data); // Update the state with the fetched RSS feed items
      } catch (error) {
        console.error('Failed to load RSS feed:', error);
      }
    };

    fetchRssFeed();
  }, []);

  return (
    <div className="pt-20">
      <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-5xl font-bold text-center my-10">Latest Financial News</h2>
        <div className="relative w-full max-w-screen-md mx-auto">
          {/* Carousel wrapper */}
          <Carousel>
            {/* Carousel content */}
            <CarouselContent>
              {news.map((article, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h4 className="text-2xl font-semibold text-center">{article.headline}</h4>
                        <p className="text-base text-center">{article.summary}</p>
                      </a>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel navigation */}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="rss-feed-container my-10">
            <h3 className="text-3xl font-bold text-center mb-5">More Financial Tips</h3>
            {rssFeedItems.map((item, index) => (
              <div key={index} className="mb-4">
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p>{item.contentSnippet}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;


