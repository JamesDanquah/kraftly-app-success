import React from 'react';
import { History } from 'lucide-react';
import { cn } from '../lib/utils';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operator: string | null;
  history: Array<{ expression: string; result: string }>;
}

export const Display: React.FC<DisplayProps> = ({ value, previousValue, operator, history }) => {
  // Format numbers to fit display and add commas
  const formatNumber = (num: string) => {
    if (!num) return '';
    const [integer, decimal] = num.split('.');
    const formattedInteger = parseInt(integer).toLocaleString('en-US');
    return decimal !== undefined ? `${formattedInteger}.${decimal}` : formattedInteger;
  };

  return (
    <div className="relative flex flex-col justify-end p-6 mb-4 bg-slate-900/40 rounded-3xl h-48 w-full overflow-hidden border border-white/5 shadow-inner">
      {/* History Fade Overlay */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-slate-900/40 to-transparent z-10 pointer-events-none" />

      {/* Recent History (Subtle) */}
      <div className="flex flex-col items-end gap-1 mb-auto opacity-40 text-xs font-mono">
        {history.slice(0, 2).reverse().map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <span>{item.expression} =</span>
            <span className="text-white">{formatNumber(item.result)}</span>
          </div>
        ))}
      </div>

      {/* Current Operation Status */}
      <div className="flex justify-end items-center gap-2 text-slate-400 text-sm h-6 font-medium">
        {previousValue && (
          <>
            <span>{formatNumber(previousValue)}</span>
            <span className="text-indigo-400">{operator}</span>
          </>
        )}
      </div>

      {/* Main Display */}
      <div className="text-right">
        <span
          className={cn(
            'text-white font-light tracking-tight transition-all duration-200',
            value.length > 9 ? 'text-4xl' : 'text-6xl'
          )}
        >
          {formatNumber(value)}
        </span>
      </div>
    </div>
  );
};