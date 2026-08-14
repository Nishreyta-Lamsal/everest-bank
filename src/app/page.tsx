import { redirect } from 'next/navigation';

import { ROUTE } from '@/constants/route';

export default function RootPage() {
  redirect(ROUTE.PERSONAL_PAGE);
}
