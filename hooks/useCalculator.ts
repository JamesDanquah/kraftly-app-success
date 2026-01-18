import { useState, useCallback } from 'react';

export type Operator = '+' | '-' | '*' | '/' | null;

interface HistoryItem {
  expression: string;
  result: string;
}

export const useCalculator = () => {
  const [current, setCurrent] = useState<string>('0');
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  const inputDigit = useCallback(
    (digit: string) => {
      if (waitingForNewValue) {
        setCurrent(digit);
        setWaitingForNewValue(false);
      } else {
        setCurrent(current === '0' ? digit : current + digit);
      }
    },
    [current, waitingForNewValue]
  );

  const inputDot = useCallback(() => {
    if (waitingForNewValue) {
      setCurrent('0.');
      setWaitingForNewValue(false);
    } else if (!current.includes('.')) {
      setCurrent(current + '.');
    }
  }, [current, waitingForNewValue]);

  const clear = useCallback(() => {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
    setWaitingForNewValue(false);
  }, []);

  const deleteLast = useCallback(() => {
    if (waitingForNewValue) return;
    setCurrent(current.length > 1 ? current.slice(0, -1) : '0');
  }, [current, waitingForNewValue]);

  const toggleSign = useCallback(() => {
    setCurrent((prev) => (parseFloat(prev) * -1).toString());
  }, []);

  const percentage = useCallback(() => {
    setCurrent((prev) => (parseFloat(prev) / 100).toString());
  }, []);

  const performOperation = useCallback(
    (nextOperator: Operator) => {
      const inputValue = parseFloat(current);

      if (previous === null) {
        setPrevious(current);
      } else if (operator) {
        const result = calculate(parseFloat(previous), inputValue, operator);
        setPrevious(String(result));
        setCurrent(String(result));
        addToHistory(previous, current, operator, String(result));
      }

      setWaitingForNewValue(true);
      setOperator(nextOperator);
    },
    [current, previous, operator]
  );

  const calculate = (a: number, b: number, op: string) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b === 0 ? 0 : a / b;
      default:
        return b;
    }
  };

  const equals = useCallback(() => {
    if (!operator || previous === null) return;

    const inputValue = parseFloat(current);
    const result = calculate(parseFloat(previous), inputValue, operator);

    addToHistory(previous, current, operator, String(result));
    setCurrent(String(result));
    setPrevious(null);
    setOperator(null);
    setWaitingForNewValue(true);
  }, [current, previous, operator]);

  const addToHistory = (a: string, b: string, op: string, result: string) => {
    setHistory((prev) => [
      { expression: `${a} ${op} ${b}`, result },
      ...prev.slice(0, 4), // Keep last 5
    ]);
  };

  return {
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
  };
};