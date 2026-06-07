export interface DuckHealthRecord {
  id: string;
  tagNo: string;
  status: 'healthy' | 'warning' | 'sick';
  behavior: string;
  temperature: number;
  lastChecked: string;
}

export interface MetricState {
  foodLevel: number; // 0 - 100 %
  waterLevel: number; // 0 - 100 %
  temperature: number; // Celsius
  humidity: number; // %
}

export interface FarmAlert {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  resolved: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
