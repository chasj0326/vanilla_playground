import { RootDocuments, DocumentContent } from '@/types';

export const rootDocuments: RootDocuments = [
  {
    id: 1,
    title: '제목1',
    documents: [
      {
        id: 2,
        title: '제목1-1',
        documents: [
          {
            id: 3,
            title: '제목1-1-1',
            documents: [],
          },
        ],
      },
      {
        id: 4,
        title: '제목1-2',
        documents: [],
      },
    ],
  },
  {
    id: 5,
    title: '제목2',
    documents: [
      {
        id: 6,
        title: '제목2-1',
        documents: [],
      },
    ],
  },
];

export const documentContent: DocumentContent = {
  id: 2,
  title: '제목1-1',
  content: '내용1-1입니다요',
  createdAt: '',
  updatedAt: '',
  documents: [
    {
      id: 3,
      title: '제목1-1-1',
      createdAt: '',
      updatedAt: '',
    },
  ],
};
