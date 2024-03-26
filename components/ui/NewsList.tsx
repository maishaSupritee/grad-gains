import styles from './NewsList.module.css';

const newsArticles = [
  // Placeholder data
  { title: 'Article 1', summary: 'Summary of article 1...' },
  { title: 'Article 2', summary: 'Summary of article 2...' },
];

const NewsList = () => {
  return (
    <div className={styles.newsList}>
      <h2>Latest Financial News</h2>
      <ul>
        {newsArticles.map((article, index) => (
          <li key={index} className={styles.article}>
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
