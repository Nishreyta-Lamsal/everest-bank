export type FaqEntry = {
  question: string;
  answer: string;
};

export type FaqListProps = {
  items: FaqEntry[];
};

export type FaqItemProps = {
  item: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
};
