export type Director = {
  id: string;
  name: string;
  title: string;
  image: string | null;
  position: number;
};

export const directors: Director[] = [
  {
    id: '1',
    name: 'Dr. Bal Gopal Baidya',
    title: 'Chairman/Promoter',
    image: '/images/about/board-of-directors/director-bal-gopal-baidya.png',
    position: 1,
  },
  {
    id: '2',
    name: 'Mr. Kiran Krishna Shrestha',
    title: 'Promoter/Director',
    image:
      '/images/about/board-of-directors/director-kiran-krishna-shrestha.png',
    position: 2,
  },
  {
    id: '3',
    name: 'Mr. Nabin Bhakta Shrestha',
    title: 'Public Director',
    image:
      '/images/about/board-of-directors/director-nabin-bhakta-shrestha.png',
    position: 3,
  },
  {
    id: '4',
    name: 'Mrs. Urmila Shrestha',
    title: 'Public Director',
    image: '/images/about/board-of-directors/director-urmila-shrestha.png',
    position: 3,
  },
  {
    id: '5',
    name: 'Mr. Santosh Kumar',
    title: 'PNB Nominee Director',
    image: '/images/about/board-of-directors/director-santosh-kumar.png',
    position: 4,
  },
  {
    id: '6',
    name: 'Mr. Bigyan Bickram Sijapati',
    title: 'Independent Director',
    image:
      '/images/about/board-of-directors/director-bigyan-bickram-sijapati.png',
    position: 5,
  },
];
