import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import FileUpload from '../components/FileUpload';
import StatementTable from '../components/StatementTable';
import { getTransactionData } from '../util/parsing';

const Dashboard: NextPage = () => {
  const [pdfText, setPdfText] = useState();
  useEffect(() => {
    if(pdfText) {
      console.log(getTransactionData(pdfText));
    }
  } , [pdfText]);
  return (
    <div className='flex flex-row justify-center'>
    {!pdfText && <FileUpload setPDFText={setPdfText}/> }
    {pdfText && <StatementTable data={getTransactionData(pdfText)}/> }
    </div>
  );
}

export default Dashboard;