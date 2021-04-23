import React from 'react';
import { parse } from 'papaparse';
import { averageHigh } from './parser';

function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [data, setData] = React.useState([]);

  return (
    <div>
      <h1 className="text-center text-4xl">File Import</h1>
      <div className={`p-6 my-2 mx-auto max-w-md border-2 ${highlighted ? 'border-green-600 bg-green-100' : 'border-gray-600'}`}
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

          Array.from(e.dataTransfer.files)
            .filter((file) => file.type === "text/csv")
            .forEach(async (file) => {
              const text = await file.text();
              const result = parse(text, {
                header: true,
                skipEmptyLines: true,
                transformHeader: (h) => { return h.replace(/\s/g, ''); }
              });
              console.log(averageHigh(result.data));
              setData(existing => [...existing, ...result.data]);
          })
       }}
      >DROP HERE</div>

      <div>
      </div>
   </div>
  );
}

export default App;
