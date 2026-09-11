export type ApprovalStatus = 'inReview' | 'readyToPublish';

export type ApprovalItem = {
  id: string;
  title: string;
  description: string;
  timeAgo: string;
  urgency: string;
  status: ApprovalStatus;
};

export const approvalItems: ApprovalItem[] = [
  {
    id: '1',
    title: 'Treasury Desk sent Loan rate card — effective 1 Shrawan 2083',
    description:
      'Home loan base rate 9.75% → 9.50%, auto loan unchanged, SME overdraft +0.25%.',
    timeAgo: '2 hours ago',
    urgency: 'Urgent',
    status: 'inReview',
  },
  {
    id: '2',
    title: 'Treasury Desk sent Loan rate card — effective 1 Shrawan 2083',
    description:
      'Home loan base rate 9.75% → 9.50%, auto loan unchanged, SME overdraft +0.25%.',
    timeAgo: '2 hours ago',
    urgency: 'Urgent',
    status: 'inReview',
  },
  {
    id: '3',
    title: 'Treasury Desk sent Loan rate card — effective 1 Shrawan 2083',
    description:
      'Home loan base rate 9.75% → 9.50%, auto loan unchanged, SME overdraft +0.25%.',
    timeAgo: '2 hours ago',
    urgency: 'Urgent',
    status: 'readyToPublish',
  },
];
