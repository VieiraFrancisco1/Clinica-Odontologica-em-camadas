import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>

        <div className="px-6 py-4">{children}</div>

        <div className="border-t px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-primary text-white hover:bg-blue-600 rounded-lg font-medium"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[];
  defaultTab?: number;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div>
      <div className="flex border-b">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === idx
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-6">{tabs[activeTab].content}</div>
    </div>
  );
};

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const colors = {
    success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', icon: '✓' },
    error: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: '✕' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800', icon: '!' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: 'ℹ' },
  };

  const color = colors[type];

  return (
    <div className={`${color.bg} border ${color.border} rounded-lg p-4 mb-4 ${color.text}`}>
      <div className="flex items-start">
        <span className="font-bold text-lg mr-3">{color.icon}</span>
        <div className="flex-1">
          {title && <h3 className="font-bold mb-1">{title}</h3>}
          <p>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-xl font-bold opacity-50 hover:opacity-100"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

interface LoadingSkeletonProps {
  count?: number;
  height?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 1, height = 'h-12' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`${height} bg-gray-200 rounded-lg mb-4 animate-pulse`}
        />
      ))}
    </>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
      >
        ← Anterior
      </button>

      <div className="flex space-x-1">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded ${
              page === currentPage
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
      >
        Próxima →
      </button>
    </div>
  );
};

interface BadgeProps {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
  const colors = {
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-purple-100 text-purple-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${colors[variant]}`}>
      {children}
    </span>
  );
};

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex text-sm text-gray-600 mb-6">
      {items.map((item, idx) => (
        <span key={idx}>
          {item.href ? (
            <a href={item.href} className="text-primary hover:underline">
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
          {idx < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))}
    </nav>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <select
          ref={ref}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
