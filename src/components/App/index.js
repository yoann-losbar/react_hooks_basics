import React from 'react';
import Input from '../Input';
import Values from '../Values';

// Un hook React est (entre autres) une simple fonction, comme la fonction App ici
const App = () => {
  return (
    <div>
      <h3> Bitcoin converter </h3>
      <Input />
      <br /><br />
      <Values />
    </div>
  );
}

export default App;
