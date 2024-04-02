import fetch from 'node-fetch';

export type NewsItem = {
  headline: string;
  summary: string;
  url: string;
  
};

interface AlpacaNewsResponse {
  news: NewsItem[];
}

export const fetchNews = async (): Promise<NewsItem[]> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'APCA-API-KEY-ID': 'PK9A3THNGBB3IFUSYS2N',
      'APCA-API-SECRET-KEY': 'ekkBMXPCztqHjduzJNoF2mfNgcRgkBuol2jjm7z5',
    },
  };

  try {
    const response = await fetch('https://data.alpaca.markets/v1beta1/news?sort=desc', options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as AlpacaNewsResponse;
    return data.news;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};