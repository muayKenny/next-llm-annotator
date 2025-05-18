'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const PDFViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [pageDimensions, setPageDimensions] = useState({ width: 1, height: 1 });

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
    console.log(
      'container',
      containerSize,
      'pdf',
      pageDimensions,
      'scale',
      scale
    );
  }, [containerSize, pageDimensions, scale]);

  return (
    <div
      ref={containerRef}
      className='h-full w-full bg-gray-100 flex items-center justify-center'
    >
      <Document
        file='/sample.pdf'
        onLoadSuccess={({ originalWidth, originalHeight }) => {
          setPageDimensions({ width: originalWidth, height: originalHeight });
        }}
        onLoadError={(err) => console.error(err)}
        onLoadProgress={(data) => console.log('Loading...', data)}
        onSourceError={(err) => console.error('Source error:', err)}
      >
        <Page
          pageNumber={1}
          scale={scale}
          onLoadSuccess={({ width, height }) => {
            setPageDimensions({ width, height });
          }}
        />
      </Document>
    </div>
  );
};

export default PDFViewer;
