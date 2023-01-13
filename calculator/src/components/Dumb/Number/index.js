import { useContext } from 'react';
import Context from '../../../context';

function Number({text}) {
  const { handleInput } = useContext(Context);
  return <div className="item" onClick={() => handleInput(text)}>{text}</div>;
}

export default Number;
