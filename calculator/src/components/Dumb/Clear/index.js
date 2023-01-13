import { useContext } from 'react';
import Context from '../../../context';

function Clear() {
  let { value, clear, backspace } = useContext(Context);

  let func = clear;
  let text = 'AC';

  if(value){
    func = backspace;
    text = '←';
  }

  return <div className="item" onClick={func}>{text}</div>;
}

export default Clear;
