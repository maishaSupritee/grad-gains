import Head from 'next/head';
import NewsList from '@/components/ui/NewsList';
import FinancialData from '@/components/ui/FinancialData';
import styles from '@/components/ui/news.module.css';


export default function news() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Financial News Dashboard</title>
        <meta name="description" content="A dashboard for the latest financial news and data"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Financial News Dashboard
        </h1>
        <NewsList />
        <FinancialData />
        
      </main>
    </div>
    );
}
