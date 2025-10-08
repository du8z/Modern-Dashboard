import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export interface CardProps {
  children?: ReactNode;
  variant?: 'default' | 'gradient' | 'bordered' | 'glass';
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;

  // StatCard props
  title?: string;
  value?: string | number;
  icon?: LucideIcon;
  iconName?: keyof typeof LucideIcons;
  iconColor?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  iconBgColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  trendText?: string;
  loading?: boolean;
  animated?: boolean;
  prefix?: string;
  suffix?: string;
}

const iconColorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  red: 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
};

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function Card({
  children,
  variant = 'default',
  className = '',
  hoverable = false,
  onClick,
  // StatCard props
  title,
  value,
  icon,
  iconName,
  iconColor = 'blue',
  iconBgColor,
  trend,
  trendText = 'vs last month',
  loading = false,
  animated = false,
  prefix = '',
  suffix = '',
}: CardProps) {
  const baseClasses = 'rounded-xl p-6 transition-all duration-300';

  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg',
    bordered: 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600',
    glass:
      'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50',
  };

  const hoverClasses = hoverable
    ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]'
    : '';

  // Si c'est une StatCard (title et value sont fournis)
  const isStatCard = title !== undefined && value !== undefined;

  // Récupérer l'icône Lucide si iconName est fourni
  const LucideIcon = iconName ? (LucideIcons[iconName] as LucideIcon) : icon;

  if (loading && isStatCard) {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className} animate-pulse`}>
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (isStatCard) {
    return (
      <div
        className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className} group`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</p>
            <p
              className={`text-2xl font-bold transition-all duration-300 ${
                variant === 'gradient'
                  ? 'text-white'
                  : 'text-gray-900 dark:text-white group-hover:scale-105'
              }`}
            >
              {animated && typeof value === 'number' ? (
                <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
              ) : (
                `${prefix}${value}${suffix}`
              )}
            </p>
            {trend && (
              <p
                className={`text-sm mt-2 flex items-center gap-1 ${
                  trend.isPositive
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {LucideIcons.TrendingUp && <LucideIcons.TrendingUp className="w-4 h-4" />}
                {trend.isPositive ? '+' : ''}
                {trend.value}% {trendText}
              </p>
            )}
          </div>
          {LucideIcon && (
            <div
              className={`p-3 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                iconBgColor ||
                (variant === 'gradient' ? 'bg-white/20' : iconColorClasses[iconColor])
              }`}
            >
              <LucideIcon className="w-6 h-6" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Card standard
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, action, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex items-start justify-between mb-4 ${className}`}>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={className}>{children}</div>;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}
