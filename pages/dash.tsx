import type { NextPage } from 'next'
import FileUpload from '../components/FileUpload';

const Dashboard: NextPage = () => {
  return (
    <div className='flex flex-row justify-center'>
    <FileUpload />  
    </div>
  );
}

export default Dashboard;