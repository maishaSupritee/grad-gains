"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { NewsItem } from "@/lib/alpaca";
import { fetchNews } from "@/lib/alpaca";
import { useEffect, useState } from "react";
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
    const fetchRssFeed = async (): Promise<void> => {
      try {
        const res: Response = await fetch("/api/fetchrss");
        const data: RssFeedItem[] = (await res.json()) as RssFeedItem[];
        setRssFeedItems(data); // Update the state with the fetched RSS feed items
      } catch (error) {
        console.error("Failed to load RSS feed:", error);
      }
    };

    void fetchRssFeed();
  }, []);

  return (
    <div className="pt-20">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="my-10 text-center text-5xl font-bold">Latest Financial News</h2>
        <div className="relative mx-auto w-full max-w-screen-md">
          {/* Carousel wrapper */}
          <Carousel>
            {/* Carousel content */}
            <CarouselContent>
              {news.map((article, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        <h4 className="text-center text-2xl font-semibold">{article.headline}</h4>
                        <p className="text-center text-base">{article.summary}</p>
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
            {/* <h3 className="text-3xl font-bold text-center mb-5">More Financial Tips</h3> */}
            {rssFeedItems.map((item: RssFeedItem, index: number) => (
              <div key={index} className="mb-4">
                <h4 className="text-xl font-semibold">{item.title}</h4>
                <p>{item.contentSnippet}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
