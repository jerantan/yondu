import { useContext } from 'react';
import Context from '../../../context';

function Display() {
  let { value } = useContext(Context);
  value = (String(value).indexOf('.') < 0)? parseFloat(value).toLocaleString('en-US') : value;
  return <div className="item display">{value}</div>;
}

export default Display;
