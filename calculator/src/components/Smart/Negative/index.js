import { useContext } from 'react';
import Context from '../../../context';

function Negative() {
  let { value, setInput } = useContext(Context);

  const negative = () => {
    if(value){
      value = String(value);
      if(value.indexOf('-') < 0)
        value = '-'+value;
      else value = value.replace('-', '');
    }

    setInput(value);
  };

  return <div className="item" onClick={negative}>±</div>;
}

export default Negative;
