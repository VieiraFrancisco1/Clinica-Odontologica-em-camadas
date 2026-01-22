import React, { ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2';
  const variantClasses = {
    primary: 'bg-primary hover:bg-blue-600 text-white focus:ring-primary',
    secondary: 'bg-secondary hover:bg-purple-700 text-white focus:ring-secondary',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

interface TableProps {
  headers?: string[];
  rows?: (string | ReactNode)[][];
  columns?: { header: string; key: string }[];
  data?: any[];
  actions?: (row: any) => ReactNode;
}

export const Table: React.FC<TableProps> = ({ headers, rows, columns, data, actions }) => {
  // Se usar o novo formato (headers e rows)
  if (headers && rows) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="px-6 py-4 text-center text-gray-500">
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              rows.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="px-6 py-4 text-sm text-gray-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  // Se usar o formato antigo (columns, data e actions)
  if (columns && data !== undefined) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-4 text-center text-gray-500">
                  Nenhum registro encontrado
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-gray-800">
                      {row[col.key]}
                    </td>
                  ))}
                  {actions && <td className="px-6 py-4 text-sm">{actions(row)}</td>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'info' }) => {
  const variantClasses = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

