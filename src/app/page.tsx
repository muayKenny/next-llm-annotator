'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Point to the worker script (needed for pdfjs)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function HomePage() {
  const [numPages, setNumPages] = useState<number | null>(null);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen p-8'>
      <h1 className='text-2xl mb-4'>PDF Viewer</h1>
      <Document
        file='/sample.pdf' // Put a sample.pdf in /public
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <Page pageNumber={1} />
      </Document>
    </main>
  );
}
