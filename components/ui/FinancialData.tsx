import styles from './FinancialData.module.css';

const financialData = [
  // Placeholder data
  { name: 'Stock A', price: '$100' },
  { name: 'Stock B', price: '$200' },
];

const FinancialData = () => {
  return (
    <div className={styles.financialData}>
      <h2>Financial Data</h2>
      <ul>
        {financialData.map((data, index) => (
          <li key={index} className={styles.dataItem}>
            <span>{data.name}</span>
            <span>{data.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancialData;
