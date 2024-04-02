import { NextApiRequest, NextApiResponse } from 'next';
import Parser from 'rss-parser';

const parser = new Parser();

// The API handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // The URL of the RSS feed you want to fetch
  const feedUrl = 'https://www.makingsenseofcents.com/category/money-management/save-money/feed/';

  try {
    // Parse the RSS feed from the specified URL
    const feed = await parser.parseURL(feedUrl);
    
    // Send the feed items back as the response
    res.status(200).json(feed.items);
  } catch (error) {
    // If there's an error, send back a 500 server error code and the error message
    res.status(500).json({ error: 'Failed to fetch the RSS feed.', details: (error as Error).message });
  }
}