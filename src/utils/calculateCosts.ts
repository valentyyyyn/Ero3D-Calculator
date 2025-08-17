import type { FormData } from '../components/calculator-form/CalculatorForm';

export interface CalculationResults {
  materialCost: number;
  energyCost: number;
  laborCost: number;
  workHours: number;
  totalCostWithoutSupplies: number;
  totalCostWithSupplies: number;
  finalPrice: number;
  totalTimeInHours: number;
  materialCostPerGram: number;
}

export const calculateCosts = (data: FormData): CalculationResults => {

  // gasto de material 
  const materialCostPerGram = data.filamentPrice / 1000;
  const materialCost = data.gramsUsed * materialCostPerGram;

  // gasto de energia
  const totalTimeInHours = data.printHours + (data.printMinutes / 60);
  const energyCost = data.hourlyRate * totalTimeInHours;

  // costo de mano de obra
  const totalWorkHours = data.workHours + (data.workMinutes / 60);
  const laborCost = totalWorkHours * data.laborRate;

  // gasto total sin insumos
  const totalCostWithoutSupplies = materialCost + energyCost + data.testCosts + laborCost;

  // gasto total con insumos 
  const totalCostWithSupplies = totalCostWithoutSupplies + data.fixedCosts;

  // precio final
  const finalPrice = totalCostWithSupplies * data.profitMultiplier;

  return {
    materialCost: Math.round(materialCost * 100) / 100, 
    energyCost: Math.round(energyCost * 100) / 100,
    laborCost: Math.round(laborCost * 100) / 100,
    workHours: totalWorkHours,
    totalCostWithoutSupplies: Math.round(totalCostWithoutSupplies * 100) / 100,
    totalCostWithSupplies: Math.round(totalCostWithSupplies * 100) / 100,
    finalPrice: Math.round(finalPrice * 100) / 100,
    totalTimeInHours: Math.round(totalTimeInHours * 100) / 100,
    materialCostPerGram: Math.round(materialCostPerGram * 100) / 100,
  };

};

export const formatCurrency = (amount: number): string => {

  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

};

export const formatTime = (hours: number): string => {

  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;

};