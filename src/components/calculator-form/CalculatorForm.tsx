import { useState } from 'react';
import styles from './CalculatorForm.module.css';

export interface FormData {
    filamentPrice: number;
    gramsUsed: number;
    hourlyRate: number;
    printHours: number;
    printMinutes: number;
    workHours: number;
    workMinutes: number;
    laborRate: number;  
    fixedCosts: number;
    testCosts: number;
    profitMultiplier: number;
}

interface CalculatorFormProps {
    onValuesChange: (data: FormData) => void;
}

export default function CalculatorForm({ onValuesChange }: CalculatorFormProps) {

    const [formData, setFormData] = useState<FormData>({
        filamentPrice: 22000, 
        gramsUsed: 0,
        hourlyRate: 0,
        printHours: 0,
        printMinutes: 0,
        workHours: 0,
        workMinutes: 0,  
        laborRate: 0,  
        fixedCosts: 0,
        testCosts: 0,
        profitMultiplier: 2,
    });
    
    const [displayValues, setDisplayValues] = useState<{[key: string]: string}>({
        filamentPrice: '22.000',
        gramsUsed: '0',
        hourlyRate: '0',
        printHours: '0',
        printMinutes: '0',
        workHours: '0',
        workMinutes: '0',
        laborRate: '0',
        fixedCosts: '0',
        testCosts: '0',
        profitMultiplier: '2',
    });

    const parseInputValue = (value: string): number => {
        const digits = value.replace(/[^\d]/g, '');
        return parseFloat(digits) || 0;
    };

    const handleInputChange = (field: keyof FormData, rawValue: string) => {

        if (rawValue === '') {
            setDisplayValues(prev => ({ ...prev, [field]: '' }));

            const newFormData = { ...formData, [field]: 0 };
            setFormData(newFormData);
            onValuesChange(newFormData);

            return;
        }

        const numValue = parseInputValue(rawValue);
        
        if (numValue === 0 && !rawValue.includes('0')) {
            return;
        }
        
        const formattedValue = numValue.toLocaleString('es-AR');
        
        setDisplayValues(prev => ({ ...prev, [field]: formattedValue }));

        const finalValue = field === 'profitMultiplier' 
            ? numValue || 1 
            : numValue;
            
        const newFormData = { ...formData, [field]: finalValue };
        setFormData(newFormData);
        onValuesChange(newFormData);
    };

    const handleBlur = (field: keyof FormData) => {
        const value = displayValues[field];

        if (value === '') {
            setDisplayValues(prev => ({ ...prev, [field]: '0' }));

            const newFormData = { ...formData, [field]: 0 };
            setFormData(newFormData);
            onValuesChange(newFormData);
        } else {
            const digits = value.replace(/[^\d]/g, '');
            const numValue = parseFloat(digits) || 0;
            const formattedValue = numValue.toLocaleString('es-AR');
            
            setDisplayValues(prev => ({ ...prev, [field]: formattedValue }));
        }
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
                            value={displayValues.filamentPrice}
                            onChange={(e) => handleInputChange('filamentPrice', e.target.value)}
                            onBlur={() => handleBlur('filamentPrice')}
                            className={styles.input}
                            inputMode="numeric"
                        />

                    </div>
                    
                    <div className={styles.inputGroup}>

                        <label htmlFor="gramsUsed">Gramos usados</label>
                        <input
                            id="gramsUsed"
                            type="number"
                            min="0"
                            step="1"
                            value={displayValues.gramsUsed}
                            onChange={(e) => handleInputChange('gramsUsed', e.target.value)}
                            onBlur={() => handleBlur('gramsUsed')}
                            className={styles.input}
                            inputMode="numeric"
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
                            value={displayValues.laborRate}
                            onChange={(e) => handleInputChange('laborRate', e.target.value)}
                            onBlur={() => handleBlur('laborRate')}
                            className={styles.input}
                            inputMode="numeric"
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
                            value={displayValues.hourlyRate}
                            onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                            onBlur={() => handleBlur('hourlyRate')}
                            className={styles.input}
                            inputMode="numeric"
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
                            value={displayValues.fixedCosts}
                            onChange={(e) => handleInputChange('fixedCosts', e.target.value)}
                            onBlur={() => handleBlur('fixedCosts')}
                            className={styles.input}
                            inputMode="numeric"
                        />
                        
                    </div>
                    
                    <div className={styles.inputGroup}>
                        
                        <label htmlFor="testCosts">Modelos de prueba</label>
                        <input
                        id="testCosts"
                        type="number"
                        min="0"
                        step="10"
                            value={displayValues.testCosts}
                            onChange={(e) => handleInputChange('testCosts', e.target.value)}
                            onBlur={() => handleBlur('testCosts')}
                            className={styles.input}
                            inputMode="numeric"
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

            </form>

        </div>

    );

};
