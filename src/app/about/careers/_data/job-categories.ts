export type JobOpening = {
  id: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  applyHref: string;
};

export type JobCategory = {
  id: string;
  name: string;
  jobs: JobOpening[];
};

export const jobCategories: JobCategory[] = [
  {
    id: '1',
    name: 'Information Technology',
    jobs: [
      {
        id: '1-1',
        title: 'Compliance / Internal Audit Officer',
        description:
          'Compliance internal audit officer job description goes here.',
        location: 'Kathmandu',
        employmentType: 'Full-time',
        applyHref: '#',
      },
      {
        id: '1-2',
        title: 'Compliance / Internal Audit Officer',
        description:
          'Compliance internal audit officer job description goes here.',
        location: 'Kathmandu',
        employmentType: 'Full-time',
        applyHref: '#',
      },
    ],
  },
  {
    id: '2',
    name: 'Information Technology',
    jobs: [
      {
        id: '2-1',
        title: 'Compliance / Internal Audit Officer',
        description:
          'Compliance internal audit officer job description goes here.',
        location: 'Kathmandu',
        employmentType: 'Full-time',
        applyHref: '#',
      },
      {
        id: '2-2',
        title: 'Compliance / Internal Audit Officer',
        description:
          'Compliance internal audit officer job description goes here.',
        location: 'Kathmandu',
        employmentType: 'Full-time',
        applyHref: '#',
      },
    ],
  },
];
