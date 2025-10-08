import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Download, Calendar } from 'lucide-react';
import { getAnalyticsData } from '../data/mockData';
import { ChartSkeleton, CardSkeleton } from '../components/Skeleton';
import { formatCurrency } from '../utils/formatters';
import { Card } from '../components/ui/Card';

type TimePeriod = '7d' | '30d' | '12m';

export default function Analytics() {
  const [period, setPeriod] = useState<TimePeriod>('12m');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(getAnalyticsData('12m'));

  useEffect(() => {
    // Simuler un chargement de données
    setLoading(true);
    const timer = setTimeout(() => {
      setData(getAnalyticsData(period));
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [period]);

  const handleExport = () => {
    // Simuler l'export des données
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analytics-${period}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const periodOptions = [
    { value: '7d' as TimePeriod, label: 'Last 7 days' },
    { value: '30d' as TimePeriod, label: 'Last 30 days' },
    { value: '12m' as TimePeriod, label: 'Last 12 months' },
  ];

  return (
    <div className="space-y-6">
      {/* Header avec filtres */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Deep dive into your business metrics and performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filtre de période */}
          <div className="relative">
            <select
              value={period}
              onChange={e => setPeriod(e.target.value as TimePeriod)}
              className="appearance-none pl-10 pr-10 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
                       rounded-lg text-sm text-gray-900 dark:text-white cursor-pointer
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              {periodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Bouton Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white
                     rounded-lg transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          <>
            <Card
              title="Total Revenue"
              value={formatCurrency(
                data.revenueVsProfit.reduce((sum, item) => sum + item.revenue, 0)
              )}
              iconName="DollarSign"
              iconColor="blue"
              hoverable
              trend={{ value: 23.5, isPositive: true }}
              trendText="vs previous period"
            />

            <Card
              title="Total Profit"
              value={formatCurrency(
                data.revenueVsProfit.reduce((sum, item) => sum + item.profit, 0)
              )}
              iconName="TrendingUp"
              iconColor="green"
              hoverable
              trend={{ value: 19.8, isPositive: true }}
              trendText="vs previous period"
            />

            <Card
              title="Global Reach"
              value={`${data.salesByRegion.length} Regions`}
              iconName="Globe"
              iconColor="purple"
              hoverable
            />
          </>
        )}
      </div>

      {/* Revenue vs Profit Chart */}
      <Card hoverable>
        {loading ? (
          <ChartSkeleton />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Revenue vs Profit Analysis
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Profit</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data.revenueVsProfit}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={value => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#10B981"
                  strokeWidth={2}
                  fill="url(#colorProfit)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </Card>

      {/* Grid avec 2 graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Region - Pie Chart */}
        <Card hoverable>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Sales by Region
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.salesByRegion}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ region, percentage }) => `${region}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="sales"
                  >
                    {data.salesByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {data.salesByRegion.map(region => (
                  <div key={region.region} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: region.color }}
                    ></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {region.region}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        {/* Performance Overview - Composed Chart */}
        <Card hoverable>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Monthly Performance Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={data.performance.slice(-6)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis
                    stroke="#9CA3AF"
                    tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === 'profitMargin') return `${value}%`;
                      return formatCurrency(value);
                    }}
                  />
                  <Legend />
                  <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                  <Bar dataKey="profit" fill="#10B981" name="Profit" />
                  <Line
                    type="monotone"
                    dataKey="profitMargin"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Profit Margin %"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
