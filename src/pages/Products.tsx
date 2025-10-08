import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { topProducts } from '../data/mockData';
import { DataTable } from '../components/ui/DataTable';
import type { Column } from '../components/ui/DataTable';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { formatCurrency } from '../utils/formatters';
import type { Product } from '../types';

export default function Products() {
  const [loading] = useState(false);

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Product Name',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
            {row.name.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{row.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{row.category}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      sortable: true,
      render: (row) => (
        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium">
          {row.category}
        </span>
      ),
    },
    {
      key: 'sales',
      header: 'Sales',
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatCurrency(row.sales)}
        </span>
      ),
    },
    {
      key: 'units',
      header: 'Units Sold',
      sortable: true,
      render: (row) => (
        <span className="text-gray-600 dark:text-gray-400">
          {row.units.toLocaleString()} units
        </span>
      ),
    },
    {
      key: 'growth',
      header: 'Growth',
      sortable: true,
      render: (row) => (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
            row.growth > 30
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              : row.growth > 20
              ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300'
          }`}
        >
          +{row.growth}%
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your product inventory and catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card hoverable className="group">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
              {topProducts.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active in catalog</p>
          </div>
        </Card>

        <Card hoverable className="group">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Sales</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
              {formatCurrency(topProducts.reduce((sum, p) => sum + p.sales, 0))}
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">+24.5% this month</p>
          </div>
        </Card>

        <Card hoverable className="group">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Units Sold</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
              {topProducts.reduce((sum, p) => sum + p.units, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Across all products</p>
          </div>
        </Card>

        <Card hoverable className="group">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Growth</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform">
              {(topProducts.reduce((sum, p) => sum + p.growth, 0) / topProducts.length).toFixed(1)}%
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">Strong performance</p>
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Product Catalog</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            View and manage all your products
          </p>
        </div>

        {topProducts.length === 0 ? (
          <EmptyState
            icon="package"
            title="No products found"
            description="Get started by adding your first product to the catalog."
            action={
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Add Product
              </button>
            }
          />
        ) : (
          <DataTable
            data={topProducts}
            columns={columns}
            itemsPerPage={5}
            loading={loading}
            onRowClick={(product) => {
              console.log('Product clicked:', product);
            }}
          />
        )}
      </Card>
    </div>
  );
}
