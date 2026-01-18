import React from 'react';
import { Calculator } from './components/Calculator';
import { Calculator as CalculatorIcon } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black flex flex-col items-center justify-center p-4 selection:bg-indigo-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 mb-8 flex items-center gap-3">
        <div className="p-3 bg-white/5 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
          <CalculatorIcon className="text-indigo-400 w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          React Calc
        </h1>
      </header>

      <main className="relative z-10 w-full flex justify-center">
        <Calculator />
      </main>
      
      <footer className="relative z-10 mt-12 text-slate-500 text-sm font-medium">
        <p>Press keys or click buttons</p>
      </footer>
    </div>
  );
};

export default App;