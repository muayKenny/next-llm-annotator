'use client';

import PDFViewer from './components/PDFViewer';
import ChatBox from './components/ChatBox';

export default function HomePage() {
  return (
    <main className='flex flex-row min-h-screen w-full justify-between px-6'>
      <div className='w-1/2 border-r overflow-auto'>
        <PDFViewer />
      </div>
      <div className='w-1/2 overflow-auto'>
        <ChatBox />
      </div>
    </main>
  );
}
