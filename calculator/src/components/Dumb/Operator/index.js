import { useContext } from 'react';
import Context from '../../../context';

function Operator({text}) {
  const { compute } = useContext(Context);
  return <div className="item" onClick={() => compute(text)}>{text}</div>;
}

export default Operator;
