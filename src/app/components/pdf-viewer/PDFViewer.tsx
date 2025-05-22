'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import {
//   LoadingProgressData,
// } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { PDFPageProxy } from 'pdfjs-dist';
import { useStore } from '@/store/pdfStore';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const PDFViewer = (fileUrl: string) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [pageDimensions, setPageDimensions] = useState({ width: 1, height: 1 });
  const [pdfData, setPdfData] = useState(null);
  const pdfPages = useStore((s) => s.pdfPages);

  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const scale =
    Math.min(
      containerSize.width / pageDimensions.width,
      containerSize.height / pageDimensions.height
    ) || 1;

  useEffect(() => {
    console.log('zesty', pdfPages);
  }, [pdfPages]);

  return (
    <div
      ref={containerRef}
      className='h-full w-full bg-gray-100 flex items-center justify-center'
    >
      <Document
        file='/sample.pdf'
        onLoadSuccess={({
          originalWidth,
          originalHeight,
        }: {
          originalWidth: number;
          originalHeight: number;
        }) => {
          setPageDimensions({ width: originalWidth, height: originalHeight });
        }}
        onLoadError={(err: Error) => console.error(err)}
        onSourceError={(err: Error) => console.error('Source error:', err)}
      >
        <Page
          pageNumber={1}
          scale={scale}
          onLoadSuccess={(
            page: PDFPageProxy,
            width: number,
            height: number
          ) => {
            setPageDimensions({ width, height });
            page.getTextContent().then((content) => setPdfData(content));
          }}
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
