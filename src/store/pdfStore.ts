import { create } from 'zustand';

type TextItem = {
  str: string;
  dir: string;
  width: number;
  height: number;
  transform: number[];
  fontName: string;
  hasEOL: boolean;
};

type PageData = {
  pageNumber: number;
  text: string;
  raw: TextItem[];
};

interface PdfMeta {
  numPages: number;
}

interface PdfStore {
  pdfPages: PageData[];
  pdfMeta: PdfMeta | null;
  setPdfPages: (pages: PageData[]) => void;
  setPdfMeta: (meta: PdfMeta) => void;
}

export const useStore = create<PdfStore>((set) => ({
  pdfPages: [],
  pdfMeta: null,
  setPdfPages: (pages) => set({ pdfPages: pages }),
  setPdfMeta: (meta) => set({ pdfMeta: meta }),
}));
