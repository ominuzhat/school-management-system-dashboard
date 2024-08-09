export type TServiceDataTypes = {
    id: number;
    title: string;
    subtitle: string;
    slug: string;
    description: string;
    icon: string;
    keyPoints: string;
    images: string[];
    faqs: [
      {
        question: string;
        answer: string;
      }
    ];
  };
  