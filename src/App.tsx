import React, { useEffect, useState } from 'react';
import DropdownMenu from './components/Menu';
import ChartComponent from './components/Chart';
import { parseCsv } from './services/csvParser';
import './App.css';

interface DataRow {
  niveau_1: string;
  niveau_2: string;
  niveau_3: string;
  date: string;
  ventes: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);
  const [filteredData, setFilteredData] = useState<DataRow[]>([]);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const parsedData = await parseCsv('/data.csv');
      setData(parsedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedKey) {
      const filtered = data.filter(row => row.niveau_3 === selectedKey);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedKey, data]);

  return (
    <div>
      <h1>Test PricingHub</h1>
      <div className='menuChart'>
        <DropdownMenu data={data} onSelectionChange={setSelectedKey} />
        <ChartComponent data={filteredData} />
      </div>
    </div>
  );
};

export default App;
