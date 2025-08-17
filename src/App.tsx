import { useState } from 'react'
import styles from './App.module.css'
import CalculatorForm from './components/calculator-form/CalculatorForm.tsx'
import type { FormData } from './components/calculator-form/CalculatorForm.tsx'
import type { CalculationResults } from './utils/calculateCosts.ts'
import { calculateCosts } from './utils/calculateCosts.ts'
import Results from './components/results/Results.tsx'

export default function App() {
  const [calculatorData, setCalculatorData] = useState<FormData | null>(null);
  const [results, setResults] = useState<CalculationResults | null>(null);

  console.log(calculatorData)

  const handleValuesChange = (data: FormData) => {
    setCalculatorData(data);
    const calculatedResults = calculateCosts(data);
    setResults(calculatedResults);
  };

  return (

    <section className={styles.content}>
      
      <h1 className={styles.title}>Print3D Calculator</h1>

      <CalculatorForm onValuesChange={handleValuesChange} />

      {
        results && <Results results={results} />
      }

    </section>
  )
}