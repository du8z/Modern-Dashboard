import {
  type DashboardData,
  type DashboardMetrics,
  type SalesOverTime,
  type ProductCategory,
  type Product,
  type UserStatistics,
  type UserDemographics,
  type TimeSeriesDataPoint,
  type MetricValue,
} from '../types/index';

// Fonction utilitaire pour générer des données temporelles cohérentes
function generateTimeSeriesData(
  baseValue: number,
  growthRate: number,
  variance: number,
  months: number = 12
): TimeSeriesDataPoint[] {
  const data: TimeSeriesDataPoint[] = [];
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentDate = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Croissance progressive avec variations saisonnières
    const seasonalFactor = 1 + Math.sin((monthIndex / 12) * Math.PI * 2) * 0.15;
    const randomVariance = 1 + (Math.random() - 0.5) * variance;
    const growthFactor = Math.pow(1 + growthRate, months - 1 - i);

    const value = Math.round(baseValue * growthFactor * seasonalFactor * randomVariance);

    data.push({
      date: date.toISOString().split('T')[0],
      value,
      label: `${monthNames[monthIndex]} ${year}`,
    });
  }

  return data;
}

// Fonction pour calculer une métrique avec croissance
function calculateMetric(current: number, growthPercentage: number): MetricValue {
  const previous = Math.round(current / (1 + growthPercentage / 100));
  return {
    current,
    previous,
    growth: growthPercentage,
    trend: growthPercentage > 0 ? 'up' : growthPercentage < 0 ? 'down' : 'stable',
  };
}

// Génération des métriques principales
const currentRevenue = 1847520;
const currentOrders = 12847;
const currentCustomers = 8942;
const currentAOV = Math.round(currentRevenue / currentOrders);

export const dashboardMetrics: DashboardMetrics = {
  revenue: calculateMetric(currentRevenue, 23.5),
  orders: calculateMetric(currentOrders, 18.2),
  customers: calculateMetric(currentCustomers, 12.7),
  averageOrderValue: calculateMetric(currentAOV, 4.4),
};

// Génération des données de ventes dans le temps
export const salesOverTime: SalesOverTime = {
  revenue: generateTimeSeriesData(125000, 0.035, 0.12),
  orders: generateTimeSeriesData(850, 0.03, 0.15),
};

// Catégories de produits avec couleurs cohérentes
export const productCategories: ProductCategory[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    value: 647850,
    percentage: 35.1,
    color: '#3B82F6',
    growth: 28.4,
  },
  {
    id: 'fashion',
    name: 'Fashion & Apparel',
    value: 516230,
    percentage: 27.9,
    color: '#8B5CF6',
    growth: 22.1,
  },
  {
    id: 'home',
    name: 'Home & Living',
    value: 368500,
    percentage: 19.9,
    color: '#EC4899',
    growth: 19.8,
  },
  {
    id: 'beauty',
    name: 'Beauty & Care',
    value: 203870,
    percentage: 11.0,
    color: '#F59E0B',
    growth: 31.2,
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    value: 111070,
    percentage: 6.1,
    color: '#10B981',
    growth: 15.7,
  },
];

// Top produits vendus
export const topProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'iPhone 15 Pro',
    category: 'Electronics',
    sales: 284750,
    units: 1245,
    growth: 42.3,
    imageUrl: '/products/iphone.jpg',
  },
  {
    id: 'prod-002',
    name: 'Sony WH-1000XM5 Headphones',
    category: 'Electronics',
    sales: 167890,
    units: 2847,
    growth: 35.8,
    imageUrl: '/products/headphones.jpg',
  },
  {
    id: 'prod-003',
    name: 'Nike Air Max 2024',
    category: 'Fashion & Apparel',
    sales: 145620,
    units: 1876,
    growth: 28.4,
    imageUrl: '/products/sneakers.jpg',
  },
  {
    id: 'prod-004',
    name: 'Samsung 55" OLED TV',
    category: 'Electronics',
    sales: 132450,
    units: 456,
    growth: 24.1,
    imageUrl: '/products/tv.jpg',
  },
  {
    id: 'prod-005',
    name: 'Dyson V15 Vacuum',
    category: 'Home & Living',
    sales: 118340,
    units: 892,
    growth: 31.9,
    imageUrl: '/products/vacuum.jpg',
  },
  {
    id: 'prod-006',
    name: 'MacBook Air M3',
    category: 'Electronics',
    sales: 98750,
    units: 234,
    growth: 19.6,
    imageUrl: '/products/macbook.jpg',
  },
  {
    id: 'prod-007',
    name: 'Lululemon Yoga Set',
    category: 'Fashion & Apparel',
    sales: 87650,
    units: 1543,
    growth: 26.7,
    imageUrl: '/products/yoga.jpg',
  },
  {
    id: 'prod-008',
    name: 'La Prairie Skin Serum',
    category: 'Beauty & Care',
    sales: 76340,
    units: 1289,
    growth: 44.2,
    imageUrl: '/products/serum.jpg',
  },
  {
    id: 'prod-009',
    name: 'Peloton Bike+',
    category: 'Sports & Outdoors',
    sales: 65890,
    units: 178,
    growth: 15.3,
    imageUrl: '/products/bike.jpg',
  },
  {
    id: 'prod-010',
    name: 'KitchenAid Stand Mixer',
    category: 'Home & Living',
    sales: 54230,
    units: 687,
    growth: 21.8,
    imageUrl: '/products/mixer.jpg',
  },
];

// Statistiques utilisateurs
export const userStatistics: UserStatistics = {
  totalUsers: 47892,
  activeUsers: 28456,
  newUsers: 4237,
  retentionRate: 68.5,
  churnRate: 8.3,
  averageSessionDuration: 12.4,
  conversionRate: 3.87,
};

// Données démographiques
export const userDemographics: UserDemographics = {
  ageGroups: [
    { label: '18-24', value: 7184, percentage: 15.0 },
    { label: '25-34', value: 16756, percentage: 35.0 },
    { label: '35-44', value: 13158, percentage: 27.5 },
    { label: '45-54', value: 7184, percentage: 15.0 },
    { label: '55+', value: 3610, percentage: 7.5 },
  ],
  locations: [
    { country: 'United States', users: 18915, percentage: 39.5, revenue: 729630 },
    { country: 'United Kingdom', users: 7184, percentage: 15.0, revenue: 277128 },
    { country: 'Germany', users: 5751, percentage: 12.0, revenue: 221703 },
    { country: 'France', users: 4789, percentage: 10.0, revenue: 184752 },
    { country: 'Canada', users: 3832, percentage: 8.0, revenue: 147802 },
    { country: 'Australia', users: 2873, percentage: 6.0, revenue: 110851 },
    { country: 'Japan', users: 2394, percentage: 5.0, revenue: 92376 },
    { country: 'Others', users: 2154, percentage: 4.5, revenue: 83138 },
  ],
  devices: [
    { type: 'desktop', users: 22099, percentage: 46.2, sessions: 142567 },
    { type: 'mobile', users: 20963, percentage: 43.8, sessions: 187234 },
    { type: 'tablet', users: 4830, percentage: 10.0, sessions: 31456 },
  ],
};

// Export des données complètes du dashboard
export const dashboardData: DashboardData = {
  metrics: dashboardMetrics,
  salesOverTime,
  productCategories,
  topProducts,
  userStatistics,
  userDemographics,
  lastUpdated: new Date().toISOString(),
};

// Fonction pour obtenir les données filtrées par période
export function getDashboardData(period: '7d' | '30d' | '90d' | '12m' = '12m'): DashboardData {
  const monthsMap = {
    '7d': 1,
    '30d': 1,
    '90d': 3,
    '12m': 12,
  };

  const months = monthsMap[period];

  // Générer des données adaptées à la période
  const periodSalesOverTime: SalesOverTime = {
    revenue: generateTimeSeriesData(125000, 0.035, 0.12, months),
    orders: generateTimeSeriesData(850, 0.03, 0.15, months),
  };

  return {
    ...dashboardData,
    salesOverTime: periodSalesOverTime,
    lastUpdated: new Date().toISOString(),
  };
}

// Export des données héritées pour compatibilité
export const dashboardStats = {
  totalRevenue: currentRevenue,
  totalOrders: currentOrders,
  totalCustomers: currentCustomers,
  conversionRate: userStatistics.conversionRate,
};

export const revenueData = salesOverTime.revenue.map(item => ({
  month: item.label?.split(' ')[0] || '',
  revenue: item.value,
  expenses: Math.round(item.value * 0.65),
  profit: Math.round(item.value * 0.35),
}));

export const categoryData = productCategories.map(cat => ({
  name: cat.name,
  value: cat.percentage,
}));

// Données pour Analytics - Répartition par région
export const salesByRegion = [
  { region: 'North America', sales: 729630, percentage: 39.5, color: '#3B82F6' },
  { region: 'Europe', sales: 683583, percentage: 37.0, color: '#8B5CF6' },
  { region: 'Latin America', events: 92376, percentage: 5.0, color: '#F59E0B' },
  { region: 'Asia Pacific', sales: 313916, percentage: 17.0, color: '#EC4899' },
  { region: 'Middle East', sales: 27926, percentage: 1.5, color: '#10B981' },
];

// Données pour le Composed Chart - Performance mensuelle détaillée
export const monthlyPerformance = salesOverTime.revenue.map((item, idx) => ({
  month: item.label?.split(' ')[0] || '',
  revenue: item.value,
  profit: Math.round(item.value * 0.35),
  expenses: Math.round(item.value * 0.65),
  orders: salesOverTime.orders[idx]?.value || 0,
  profitMargin: 35,
}));

// Fonction pour obtenir les données Analytics par période
export function getAnalyticsData(period: '7d' | '30d' | '12m' = '12m') {
  const monthsMap = {
    '7d': 1,
    '30d': 1,
    '12m': 12,
  };

  const months = monthsMap[period];
  const revenueTimeSeries = generateTimeSeriesData(125000, 0.035, 0.12, months);
  const ordersTimeSeries = generateTimeSeriesData(850, 0.03, 0.15, months);

  return {
    revenueVsProfit: revenueTimeSeries.map(item => ({
      month: item.label?.split(' ')[0] || '',
      date: item.date,
      revenue: item.value,
      profit: Math.round(item.value * 0.35),
    })),
    performance: revenueTimeSeries.map((item, idx) => ({
      month: item.label?.split(' ')[0] || '',
      revenue: item.value,
      profit: Math.round(item.value * 0.35),
      expenses: Math.round(item.value * 0.65),
      orders: ordersTimeSeries[idx]?.value || 0,
      profitMargin: 35,
    })),
    salesByRegion,
  };
}
