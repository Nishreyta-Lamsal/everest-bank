import { GlobeIcon, PhoneCallIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

export default function FooterSupportCard() {
  return (
    <div className="flex h-[286px] w-[620px] shrink-0 flex-col items-start justify-between rounded-2xl bg-gradient-to-l from-[#fbc999] via-[#ffe8c8] to-[#fbc999] p-8">
      <p className="font-heading text-title-1-desktop text-grey-500">
        Customer Support Center
      </p>
      <p className="text-body-2-desktop text-grey-400">
        For any questions or support, please call our customer care centre-
        Global Connect. We are available 24/7 to serve you.
      </p>
      <div className="flex items-start gap-11">
        <div className="flex items-center gap-2">
          <GlobeIcon className="size-5 shrink-0 text-grey-500" />
          <p className="text-body-2-desktop-md text-grey-500">
            SWIFT: EVBLNPKA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PhoneCallIcon className="size-5 shrink-0 text-grey-500" />
          <p className="text-body-2-desktop-md text-grey-500">
            Toll free: 1660-01-66777
          </p>
        </div>
      </div>
      <div className="flex w-full items-start gap-4">
        <Button
          variant="tertiary-white"
          size="lg"
          className="w-67.5"
          leftIcon={<PhoneCallIcon className="size-4" />}
        >
          Call Us
        </Button>
        <Button variant="secondary" size="lg" className="w-67.5">
          Make an enquire
        </Button>
      </div>
    </div>
  );
}
