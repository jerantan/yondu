import { useContext } from 'react';
import Context from '../../../context';

function Percentage() {
  const { value, setInput } = useContext(Context);

  const percentage = () => {
    if(String(value).indexOf('0.') < 0)
      setInput(value / 100);
  };

  return <div className="item percentage" onClick={percentage}>%</div>;
}

export default Percentage;
