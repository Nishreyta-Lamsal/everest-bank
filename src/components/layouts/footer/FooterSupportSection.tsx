import FooterOfficerCard from './FooterOfficerCard';
import FooterSupportCard from './FooterSupportCard';

import { footerOfficers } from '@/data';

export default function FooterSupportSection() {
  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row xl:items-center">
      {footerOfficers.map((officer) => (
        <FooterOfficerCard key={officer.email} {...officer} />
      ))}
      <FooterSupportCard />
    </div>
  );
}
