export interface CompoundData {
  month: number;
  pessimiste: number;
  normal: number;
  optimiste: number;
}

export interface Scenario {
  name: string;
  rate: number;
  color: string;
  key: keyof Omit<CompoundData, 'month'>;
}

export interface CompoundParams {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency?: number;
}

export interface SimulationResult {
  finalAmount: number;
  totalInterest: number;
  monthlyData: CompoundData[];
}