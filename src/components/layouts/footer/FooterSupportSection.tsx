import FooterOfficerCard from './FooterOfficerCard';
import FooterSupportCard from './FooterSupportCard';

import { footerOfficers } from '@/data';

export default function FooterSupportSection() {
  return (
    <div className="flex w-full items-center gap-6">
      {footerOfficers.map((officer) => (
        <FooterOfficerCard key={officer.email} {...officer} />
      ))}
      <FooterSupportCard />
    </div>
  );
}
