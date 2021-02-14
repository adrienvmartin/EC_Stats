import React from 'react';
import { parse } from 'papaparse';

function App() {
  const [highlighted, setHighlighted] = React.useState(false);

  return (
    <div>
      <h1 className="text-center text-4xl">File Import</h1>
      <div className={`p-6 my-2 mx-auto max-w-md border-2 ${highlighted ? 'border-green-600 bg-green-10' : 'border-gray-600'}`}
        onDragEnter={() => {
          setHighlighted(true);
        }}
        onDragLeave={() => {
          setHighlighted(false);
        }}
        onDragOver={(e) => { e.preventDefault();}}
        onDrop={(e) => {
          e.preventDefault();
          setHighlighted(false);
          console.log(e); }}
      >DROP HERE</div>
   </div>
  );
}

export default App;
