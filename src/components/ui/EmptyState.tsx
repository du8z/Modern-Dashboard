import type { ReactNode } from 'react';
import { Package, Search, Database, FileX, AlertCircle, Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: 'package' | 'search' | 'database' | 'file' | 'alert' | 'inbox';
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const icons = {
  package: Package,
  search: Search,
  database: Database,
  file: FileX,
  alert: AlertCircle,
  inbox: Inbox,
};

export function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="relative p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
          <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

export interface LoadingStateProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingState({ text = 'Loading...', size = 'md', className = '' }: LoadingStateProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 dark:border-gray-700`}></div>
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-blue-600 dark:border-blue-400 border-t-transparent absolute top-0 left-0 animate-spin`}
        ></div>
      </div>
      {text && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 animate-spin ${className}`}
    />
  );
}
