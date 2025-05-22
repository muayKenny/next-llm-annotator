'use-client';

import { useEffect } from 'react';
import { getDocument, PDFDocumentProxy } from 'pdfjs-dist';
import { useStore } from '@/store/pdfStore';
import PDFViewer from './PDFViewer';

interface PDFLoaderContainerProps {
  fileUrl: string;
}

const PDFLoaderContainer = ({ fileUrl }: PDFLoaderContainerProps) => {
  const setPdfPages = useStore((s) => s.setPdfPages);
  const setPdfMeta = useStore((s) => s.setPdfMeta);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = getDocument(fileUrl);
      const pdf: PDFDocumentProxy = await loadingTask.promise;

      setPdfMeta({ numPages: pdf.numPages });

      const pages = await Promise.all(
        Array.from({ length: pdf.numPages }, async (_, i) => {
          const page = await pdf.getPage(i + 1);
          const content = await page.getTextContent();
          const text = content.items.map((item: any) => item.str).join(' ');

          return {
            pageNumber: i + 1,
            text,
            raw: content.items,
          };
        })
      );

      setPdfPages(pages);
    };

    loadPdf().catch(console.error);
  }, [fileUrl, setPdfPages, setPdfMeta]);

  return <PDFViewer fileUrl={fileUrl} />;
};

export default PDFLoaderContainer;
