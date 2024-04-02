// "use client"
// import React, { useEffect, useState } from 'react';
// import { fetchNews, NewsItem } from '@/lib/alpaca';

// const NewsPage = () => {
//   const [news, setNews] = useState<NewsItem[]>([]);

//   useEffect(() => {
//     fetchNews().then(setNews).catch(console.error);
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
//       <h1>Latest News</h1>
//       <div style={{ maxWidth: '600px' }}>
//         {news.map((item, index) => (
//           <div key={index} style={{ marginBottom: '20px' }}>
//             <h2>{item.headline}</h2>
//             <p>{item.summary}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


// export default NewsPage;

