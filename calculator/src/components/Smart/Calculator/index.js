import { useState, useEffect, useCallback } from 'react';

import './index.css';
import Display from '../../Dumb/Display';
import Number from '../../Dumb/Number';
import Operator from '../../Dumb/Operator';
import Clear from '../../Dumb/Clear';
import Negative from '../Negative';
import Percentage from '../Percentage';
import Point from '../../Dumb/Point';
import Context from '../../../context';

let total = 0;
let operation = '';
let newInput = 1;

function App() {
  const [input, setInput] = useState(total);

  useEffect(() => {
    const handleKeys = (evnt) => {
      const code = evnt.keyCode;
      let key = evnt.key;

      if((code >= 48 && code <= 57)
      || (code >= 96 && code <= 105)){
        if(key === '%')
          document.querySelector('.percentage').click();
        else handleInput(key);

      } else if(code === 13
           || code === 88
           || code === 106
           || code === 107
           || code === 109
           || code === 111
           || code === 187
           || code === 189){
        if(code === 13)
          key = '=';
        else if(code === 106
        || code === 88)
          key = 'x';
        else if(code === 111)
          key = '÷';
        else if(code === 189)
          key = '-';

        compute(key);

      } else if(code === 110
             || code === 190)
        append();

      else if(code === 8)
        backspace();

      else if(code === 27)
        clear();
    };

    window.addEventListener('keydown', handleKeys);

    return () => {
      window.removeEventListener('keydown', handleKeys);
    };
  });

  const handleInput = (value) => {
    if(!newInput)
      value = input+value;

    setInput(value);
    newInput = 0;
  };

  const clear = () => {
    total = 0;
    setInput(total);

    operation = '';
    newInput = 1;
  };

  const backspace = () => {
    let value = input;
    if(value) value = String(value).slice(0, -1);

    if(!value){
      value = 0;
      newInput = 1;
    }

    setInput(value);
  };

  const compute = useCallback((operator) => {
    const value = parseFloat(input);
    if(operation){
      if(operation === '+') total = total + value;
      else if(operation === '-') total = total - value;
      else if(operation === 'x') total = total * value;
      else if(operation === '÷') total = total / value;
      total = parseFloat(total.toFixed(2));
      setInput(total);

      if(operator === '='){
        operation = '';
      } else {
        operation = operator;
      }
    } else {
      operation = operator;
      total = value;
    }

    newInput = 1;
  }, [input]);

  const append = () => {
    let value = input;

    if(newInput)
      value = 0;

    if(String(value).indexOf('.') < 0)
      value = value+'.';

    setInput(value);
    newInput = 0;
  };

  const context = {
    value: input,
    setInput: setInput,
    handleInput: handleInput,
    compute: compute,
    clear: clear,
    backspace,
    append
  };

  return (
    <Context.Provider value={context}>
      <Display />
      <Clear />
      <Negative />
      <Percentage />
      <Operator text="÷" />
      <Number text="7" />
      <Number text="8" />
      <Number text="9" />
      <Operator text="x" />
      <Number text="4" />
      <Number text="5" />
      <Number text="6" />
      <Operator text="-" />
      <Number text="1" />
      <Number text="2" />
      <Number text="3" />
      <Operator text="+" />
      <Number text="0" />
      <Point />
      <Operator text="=" />
    </Context.Provider>
  );
}

export default App;
