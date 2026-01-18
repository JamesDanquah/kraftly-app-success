import React, { useEffect } from 'react';
import { Delete, Divide, Minus, Plus, X, Percent } from 'lucide-react';
import { Button } from './Button';
import { Display } from './Display';
import { useCalculator } from '../hooks/useCalculator';

export const Calculator: React.FC = () => {
  const {
    current,
    previous,
    operator,
    history,
    inputDigit,
    inputDot,
    clear,
    deleteLast,
    toggleSign,
    percentage,
    performOperation,
    equals,
  } = useCalculator();

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (/\d/.test(key)) {
        inputDigit(key);
      } else if (key === '.') {
        inputDot();
      } else if (key === 'Enter' || key === '=') {
        e.preventDefault();
        equals();
      } else if (key === 'Backspace') {
        deleteLast();
      } else if (key === 'Escape') {
        clear();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('*');
      } else if (key === '/') {
        e.preventDefault();
        performOperation('/');
      } else if (key === '%') {
        percentage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDot, equals, deleteLast, clear, performOperation, percentage]);

  return (
    <div className="relative bg-slate-800/60 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl w-full max-w-sm mx-auto">
      <Display value={current} previousValue={previous} operator={operator} history={history} />

      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button variant="secondary" onClick={clear} className="text-lg text-red-600">
          AC
        </Button>
        <Button variant="secondary" onClick={toggleSign}>
          +/-
        </Button>
        <Button variant="secondary" onClick={percentage}>
          <Percent size={20} />
        </Button>
        <Button variant="accent" onClick={() => performOperation('/')}>
          <Divide size={24} />
        </Button>

        {/* Row 2 */}
        <Button onClick={() => inputDigit('7')}>7</Button>
        <Button onClick={() => inputDigit('8')}>8</Button>
        <Button onClick={() => inputDigit('9')}>9</Button>
        <Button variant="accent" onClick={() => performOperation('*')}>
          <X size={24} />
        </Button>

        {/* Row 3 */}
        <Button onClick={() => inputDigit('4')}>4</Button>
        <Button onClick={() => inputDigit('5')}>5</Button>
        <Button onClick={() => inputDigit('6')}>6</Button>
        <Button variant="accent" onClick={() => performOperation('-')}>
          <Minus size={24} />
        </Button>

        {/* Row 4 */}
        <Button onClick={() => inputDigit('1')}>1</Button>
        <Button onClick={() => inputDigit('2')}>2</Button>
        <Button onClick={() => inputDigit('3')}>3</Button>
        <Button variant="accent" onClick={() => performOperation('+')}>
          <Plus size={24} />
        </Button>

        {/* Row 5 */}
        <Button onClick={() => inputDigit('0')} className="col-span-1 rounded-2xl w-full">
          0
        </Button>
        <Button onClick={inputDot}>.</Button>
        <Button onClick={deleteLast} variant="ghost" className="text-red-400 hover:text-red-300">
          <Delete size={24} />
        </Button>
        <Button variant="accent" onClick={equals} className="bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/20">
          =
        </Button>
      </div>
    </div>
  );
};