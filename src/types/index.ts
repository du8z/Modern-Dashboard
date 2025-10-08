// Métriques principales du dashboard
export interface DashboardMetrics {
  revenue: MetricValue;
  orders: MetricValue;
  customers: MetricValue;
  averageOrderValue: MetricValue;
}

// Valeur métrique avec croissance
export interface MetricValue {
  current: number;
  previous: number;
  growth: number; // Pourcentage de croissance
  trend: 'up' | 'down' | 'stable';
}

// Point de données temporel
export interface TimeSeriesDataPoint {
  date: string; // Format: YYYY-MM-DD
  value: number;
  label?: string; // Format lisible: "Jan 2024"
}

// Données de ventes dans le temps
export interface SalesOverTime {
  revenue: TimeSeriesDataPoint[];
  orders: TimeSeriesDataPoint[];
}

// Catégorie de produit
export interface ProductCategory {
  id: string;
  name: string;
  value: number; // Montant des ventes
  percentage: number;
  color: string;
  growth: number;
}

// Produit individuel
export interface Product {
  id: string;
  name: string;
  category: string;
  sales: number; // Montant des ventes
  units: number; // Nombre d'unités vendues
  growth: number;
  imageUrl?: string;
}

// Statistiques utilisateurs
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  retentionRate: number;
  churnRate: number;
  averageSessionDuration: number; // En minutes
  conversionRate: number;
}

// Données démographiques utilisateurs
export interface UserDemographics {
  ageGroups: DemographicGroup[];
  locations: LocationData[];
  devices: DeviceData[];
}

export interface DemographicGroup {
  label: string;
  value: number;
  percentage: number;
}

export interface LocationData {
  country: string;
  users: number;
  percentage: number;
  revenue: number;
}

export interface DeviceData {
  type: 'desktop' | 'mobile' | 'tablet';
  users: number;
  percentage: number;
  sessions: number;
}

// Données complètes du dashboard
export interface DashboardData {
  metrics: DashboardMetrics;
  salesOverTime: SalesOverTime;
  productCategories: ProductCategory[];
  topProducts: Product[];
  userStatistics: UserStatistics;
  userDemographics: UserDemographics;
  lastUpdated: string;
}

// Filtres de période
export type TimePeriod = '7d' | '30d' | '90d' | '12m' | 'ytd' | 'all';

// Configuration des graphiques
export interface ChartConfig {
  showLegend: boolean;
  showGrid: boolean;
  animate: boolean;
  colors: string[];
}

// Types hérités (pour compatibilité)
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  conversionRate: number;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  avatar?: string;
}
