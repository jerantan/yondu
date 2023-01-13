import { useContext } from 'react';
import Context from '../../../context';

function Point() {
  const { append } = useContext(Context);
  return <div className="item" onClick={append}>.</div>;
}

export default Point;
