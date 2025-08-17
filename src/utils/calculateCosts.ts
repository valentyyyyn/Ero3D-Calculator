import type { FormData } from '../components/calculator-form/CalculatorForm';

export interface CalculationResults {
  materialCost: number;
  energyCost: number;
  totalCostWithoutSupplies: number;
  totalCostWithSupplies: number;
  finalPrice: number;

  // Datos adicionales útiles para mostrar
  totalTimeInHours: number;
  materialCostPerGram: number;
}

export const calculateCosts = (data: FormData): CalculationResults => {

  // 1. Calcular gasto de material = (gramos × precio_kg / 1000)
  const materialCostPerGram = data.filamentPrice / 1000;
  const materialCost = data.gramsUsed * materialCostPerGram;

  // 2. Calcular tiempo total en horas (para el cálculo de costo por hora)
  const totalTimeInHours = data.printHours + (data.printMinutes / 60);

  // 3. Calcular costo por hora de máquina = precio_hora × tiempo_total
  const energyCost = data.hourlyRate * totalTimeInHours;

  // 4. Calcular gasto total sin insumos = material + energía + pruebas
  const totalCostWithoutSupplies = materialCost + energyCost + data.testCosts;

  // 5. Calcular gasto total con insumos = sin insumos + insumos fijos
  const totalCostWithSupplies = totalCostWithoutSupplies + data.fixedCosts;

  // 6. Calcular precio final = gasto total × multiplicador
  const finalPrice = totalCostWithSupplies * data.profitMultiplier;

  return {
    materialCost: Math.round(materialCost * 100) / 100, // Redondear a 2 decimales
    energyCost: Math.round(energyCost * 100) / 100,
    totalCostWithoutSupplies: Math.round(totalCostWithoutSupplies * 100) / 100,
    totalCostWithSupplies: Math.round(totalCostWithSupplies * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    // Datos adicionales
    totalTimeInHours: Math.round(totalTimeInHours * 100) / 100,
    materialCostPerGram: Math.round(materialCostPerGram * 100) / 100,
  };

};

// Helper adicional para formatear montos en pesos argentinos
export const formatCurrency = (amount: number): string => {

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

};

// Helper para formatear tiempo
export const formatTime = (hours: number): string => {

  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;

};