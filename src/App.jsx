import { useState, useEffect } from 'react';
import PricingPage from './PricingPage';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [glassMode, setGlassMode] = useState(false);
  const [calculationCount, setCalculationCount] = useState(0);
  const [showPricing, setShowPricing] = useState(false);
  const [input, setInput] = useState('0');
  const [previousInput, setPreviousInput] = useState(null);
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-glass-mode', glassMode);
  }, [theme, glassMode]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleGlassMode = () => {
    setGlassMode((prev) => !prev);
  };

  const handleNumberClick = (value) => {
    if (showPricing) return;
    if (input.length > 12) return;
    if (input === '0') {
      setInput(String(value));
    } else {
      setInput(input + value);
    }
  };

  const handleOperatorClick = (op) => {
    if (showPricing) return;
    if (operator !== null) {
      handleEquals();
    }
    setPreviousInput(input);
    setInput('0');
    setOperator(op);
  };

  const handleEquals = () => {
    if (showPricing) return;
    if (!operator || previousInput === null) return;

    const current = parseFloat(input);
    const previous = parseFloat(previousInput);
    let result;

    switch (operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '×':
        result = previous * current;
        break;
      case '÷':
        if (current === 0) {
          setInput('Error');
          setPreviousInput(null);
          setOperator(null);
          return;
        }
        result = previous / current;
        break;
      default:
        return;
    }

    setInput(String(result).slice(0, 12));
    setPreviousInput(null);
    setOperator(null);

    if (calculationCount >= 0) {
      setShowPricing(true);
    }
    setCalculationCount(calculationCount + 1);
  };

  const handleClear = () => {
    if (showPricing) return;
    setInput('0');
    setPreviousInput(null);
    setOperator(null);
  };

  const handlePlusMinus = () => {
    if (showPricing) return;
    setInput((prev) => String(parseFloat(prev) * -1));
  };

  const handlePercentage = () => {
    if (showPricing) return;
    setInput((prev) => String(parseFloat(prev) / 100));
  };

  const handleDecimal = () => {
    if (showPricing) return;
    if (!input.includes('.')) {
      setInput(input + '.');
    .
    }
  };

  const closePricingPage = () => {
    setShowPricing(false);
    setInput('0');
  };

  if (showPricing) {
    return <PricingPage theme={theme} glassMode={glassMode} close={closePricingPage} />;
  }

  return (
    <div className="app">
      <div className="calculator">
        <div className="header">
          <div className="toggles">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button onClick={toggleGlassMode} className="theme-toggle">
              {glassMode ? '💧' : '🧊'}
            </button>
          </div>
        </div>
        <div className="display">{input}</div>
        <div className="buttons">
          <button onClick={handleClear} className="btn function">AC</button>
          <button onClick={handlePlusMinus} className="btn function">+/-</button>
          <button onClick={handlePercentage} className="btn function">%</button>
          <button onClick={() => handleOperatorClick('÷')} className="btn operator">÷</button>
          <button onClick={() => handleNumberClick(7)} className="btn number">7</button>
          <button onClick={() => handleNumberClick(8)} className="btn number">8</button>
          <button onClick={() => handleNumberClick(9)} className="btn number">9</button>
          <button onClick={() => handleOperatorClick('×')} className="btn operator">×</button>
          <button onClick={() => handleNumberClick(4)} className="btn number">4</button>
          <button onClick={() => handleNumberClick(5)} className="btn number">5</button>
          <button onClick={() => handleNumberClick(6)} className="btn number">6</button>
          <button onClick={() => handleOperatorClick('-')} className="btn operator">-</button>
          <button onClick={() => handleNumberClick(1)} className="btn number">1</button>
          <button onClick={() => handleNumberClick(2)} className="btn number">2</button>
          <button onClick={() => handleNumberClick(3)} className="btn number">3</button>
          <button onClick={() => handleOperatorClick('+')} className="btn operator">+</button>
          <button onClick={() => handleNumberClick(0)} className="btn number zero">0</button>
          <button onClick={handleDecimal} className="btn number">.</button>
          <button onClick={handleEquals} className="btn operator">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
