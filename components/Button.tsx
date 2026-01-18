import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'accent' | 'ghost';
  size?: 'default' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'default',
  ...props
}) => {
  const baseStyles =
    'relative overflow-hidden transition-all duration-200 active:scale-95 flex items-center justify-center font-medium select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500';

  const variants = {
    default: 'bg-slate-700/50 hover:bg-slate-600/50 text-white backdrop-blur-sm shadow-sm',
    secondary: 'bg-slate-300 text-slate-900 hover:bg-slate-200 shadow-sm font-semibold',
    accent:
      'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/20 font-semibold',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-400 hover:text-white',
  };

  const sizes = {
    default: 'h-16 w-16 rounded-2xl text-xl',
    lg: 'h-16 w-[calc(100%+1rem)] rounded-2xl text-xl', // Span 2 columns
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};