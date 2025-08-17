import styles from "./Results.module.css";
import type { CalculationResults } from "../../utils/calculateCosts";
import { formatCurrency, formatTime } from "../../utils/calculateCosts";

interface ResultsProps {
  results: CalculationResults;
}

export default function Results({ results }: ResultsProps) {

  return (

    <div className={styles.container}>

      <h2 className={styles.title}>💰 Resultados</h2>

      <div className={styles.grid}>

        <div className={styles.card}>
          <span className={styles.label}>Gasto material</span>
          <span className={styles.value}>{formatCurrency(results.materialCost)}</span>
        </div>

        <div className={styles.card}>
          <span className={styles.label}>Mano de obra</span>
          <span className={styles.value}>{formatCurrency(results.laborCost)}</span>
        </div>

        <div className={styles.card}>

          <span className={styles.label}>Gasto luz</span>
          <span className={styles.value}>{formatCurrency(results.energyCost)}</span>

        </div>

        <div className={styles.card}>

          <span className={styles.label}>Total sin insumos</span>
          <span className={styles.value}>{formatCurrency(results.totalCostWithoutSupplies)}</span>

        </div>

        <div className={styles.card}>

          <span className={styles.label}>Total con insumos</span>
          <span className={styles.value}>{formatCurrency(results.totalCostWithSupplies)}</span>

        </div>

      </div>

      <div className={styles.finalPrice}>
        <div><strong>💵 Precio Final:</strong> {formatCurrency(results.finalPrice)}</div>
        <div className={styles.profit}>
          <span>💰 Ganancias: </span>
          <span>{formatCurrency(results.finalPrice - results.totalCostWithSupplies)}</span>
        </div>
      </div>
    </div>

  );

}
