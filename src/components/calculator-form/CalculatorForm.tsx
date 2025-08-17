import { useState } from 'react';
import styles from './CalculatorForm.module.css';
import { formatCurrency } from '../../utils/calculateCosts';

export interface FormData {
    filamentPrice: number;
    gramsUsed: number;
    hourlyRate: number;
    printHours: number;
    printMinutes: number;
    workHours: number;
    workMinutes: number;
    laborRate: number;  // Tasa por hora de mano de obra
    fixedCosts: number;
    testCosts: number;
    profitMultiplier: number;
}

interface CalculatorFormProps {
    onValuesChange: (data: FormData) => void;
}

export default function CalculatorForm({ onValuesChange }: CalculatorFormProps) {

    const [formData, setFormData] = useState<FormData>({
        filamentPrice: 20000, // Precio por kg en pesos
        gramsUsed: 0,
        hourlyRate: 300,
        printHours: 1,
        printMinutes: 0,
        workHours: 0,
        workMinutes: 30,  // 30 minutos por defecto
        laborRate: 4000,  // Valor por defecto $4000/h
        fixedCosts: 0,
        testCosts: 0,
        profitMultiplier: 2,
    });

    const handleInputChange = (field: keyof FormData, value: string) => {
        const numValue = field === 'profitMultiplier' 
            ? parseFloat(value) || 1 
            : parseFloat(value) || 0;

        const newFormData = { ...formData, [field]: numValue };
        setFormData(newFormData);
        onValuesChange(newFormData);
    };

    const handleCalculate = () => {
        onValuesChange(formData);
    };


    return (

        <div className={styles.formContainer}>
        
            <form className={styles.form} onSubmit={e => e.preventDefault()}>

                <div className={styles.section}>

                    <h3>Material</h3>

                    <div className={styles.inputGroup}>

                        <label htmlFor="filamentPrice">Precio filamento ($/kg)</label>
                        <input
                            id="filamentPrice"
                            type="number"
                            min="0"
                            step="100"
                            value={formData.filamentPrice}
                            onChange={(e) => handleInputChange('filamentPrice', e.target.value)}
                            className={styles.input}
                        />

                    </div>
                    
                    <div className={styles.inputGroup}>

                        <label htmlFor="gramsUsed">Gramos usados</label>
                        <input
                            id="gramsUsed"
                            type="number"
                            min="0"
                            step="1"
                            value={formData.gramsUsed}
                            onChange={(e) => handleInputChange('gramsUsed', e.target.value)}
                            className={styles.input}
                        />

                    </div>

                </div>

                <div className={styles.section}>

                    <h3>Mano de Obra</h3>

                    <div className={styles.inputGroup}>

                        <label htmlFor="laborRate">Valor por hora</label>
                        <input
                            id="laborRate"
                            type="number"
                            min="0"
                            step="100"
                            value={formData.laborRate}
                            onChange={(e) => handleInputChange('laborRate', e.target.value)}
                            className={styles.input}
                        />

                    </div>
                    
                    <div className={styles.timeInputs}>

                        <div className={styles.inputGroup}>

                            <label htmlFor="workHours">Horas</label>
                            <input
                                id="workHours"
                                type="number"
                                min="0"
                                max="999"
                                value={formData.workHours}
                                onChange={(e) => handleInputChange('workHours', e.target.value)}
                                className={styles.input}
                                style={{ maxWidth: '90%' }}
                            />

                        </div>
                        
                        <div className={styles.inputGroup}>

                            <label htmlFor="workMinutes">Minutos</label>
                            <input
                                id="workMinutes"
                                type="number"
                                min="0"
                                max="59"
                                value={formData.workMinutes}
                                onChange={(e) => handleInputChange('workMinutes', e.target.value)}
                                className={styles.input}
                                style={{ maxWidth: '90%' }}
                            />

                        </div>

                    </div>

                </div>

                <div className={styles.section}>

                    <h3>Energía</h3>
                    
                    <div className={styles.inputGroup}>
                        
                        <label htmlFor="hourlyRate">Precio por hora de energía</label>
                        <input
                            id="hourlyRate"
                            type="number"
                            min="0"
                            step="1"
                            value={formData.hourlyRate}
                            onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                            className={styles.input}
                        />
                        
                    </div>
                    
                    <div className={styles.timeInputs}>

                        <div className={styles.inputGroup}>
                            
                            <label htmlFor="printHours">Horas</label>
                            <input
                                id="printHours"
                                type="number"
                                min="0"
                                max="99"
                                value={formData.printHours}
                                onChange={(e) => handleInputChange('printHours', e.target.value)}
                                className={styles.input}
                                style={{ maxWidth: '90%' }}
                            />

                        </div>
                            
                        <div className={styles.inputGroup}>

                            <label htmlFor="printMinutes">Minutos</label>
                            <input
                                id="printMinutes"
                                type="number"
                                min="0"
                                max="59"
                                value={formData.printMinutes}
                                onChange={(e) => handleInputChange('printMinutes', e.target.value)}
                                className={styles.input}
                                style={{ maxWidth: '90%' }}
                            />

                        </div>

                    </div>

                </div>

                <div className={styles.section}>

                    <h3>Costos Adicionales</h3>

                    <div className={styles.inputGroup}>

                        <label htmlFor="fixedCosts">Insumos fijos</label>
                        <input
                            id="fixedCosts"
                            type="number"
                            min="0"
                            step="10"
                            value={formData.fixedCosts}
                            onChange={(e) => handleInputChange('fixedCosts', e.target.value)}
                            className={styles.input}
                        />
                        
                    </div>
                    
                    <div className={styles.inputGroup}>
                        
                        <label htmlFor="testCosts">Modelos de prueba</label>
                        <input
                        id="testCosts"
                        type="number"
                        min="0"
                        step="10"
                        value={formData.testCosts}
                        onChange={(e) => handleInputChange('testCosts', e.target.value)}
                        className={styles.input}
                        />
                    </div>

                </div>

                <div className={styles.section}>

                    <h3>Ganancia</h3>

                    <div className={styles.inputGroup}>

                        <label htmlFor="profitMultiplier">Multiplicador (x{formData.profitMultiplier})</label>
                        <input
                            id="profitMultiplier"
                            type="number"
                            min="1"
                            max="10"
                            step="0.1"
                            value={formData.profitMultiplier}
                            onChange={(e) => handleInputChange('profitMultiplier', e.target.value)}
                            className={styles.input} 
                        />

                    </div>

                </div>

                <div className={styles.buttonContainer}>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={handleCalculate}
                    >
                        Calcular
                    </button>
                </div>


            </form>

        </div>

    );

};
