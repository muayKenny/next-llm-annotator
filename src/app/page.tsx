'use client';

import { PDFLoaderContainer } from './components/pdf-viewer/index';
import ChatBox from './components/ChatBox';

export default function HomePage() {
  return (
    <main className='flex flex-row min-h-screen w-full justify-between px-6'>
      <div className='w-1/2 border-r overflow-auto'>
        <PDFLoaderContainer fileUrl='/sample.pdf' />
      </div>
      <div className='w-1/2 overflow-auto'>
        <ChatBox />
      </div>
    </main>
  );
}
