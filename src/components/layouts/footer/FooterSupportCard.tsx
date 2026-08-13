import { GlobeIcon, PhoneCallIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

export default function FooterSupportCard() {
  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-2xl bg-gradient-to-l from-[#fbc999] via-[#ffe8c8] to-[#fbc999] px-4 py-8 xl:h-71.5 xl:w-155 xl:shrink-0 xl:justify-between xl:gap-0 xl:p-8">
      <div className="flex flex-col gap-1 xl:contents">
        <p className="font-heading text-title-1-mobile text-grey-500 xl:text-title-1-desktop">
          Customer Support Center
        </p>
        <p className="text-body-3-mobile text-grey-400 xl:text-body-2-desktop">
          For any questions or support, please call our customer care centre-
          Global Connect. We are available 24/7 to serve you.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2 xl:flex-row xl:gap-11">
        <div className="flex items-center gap-2">
          <GlobeIcon className="text-grey-500 size-4 shrink-0 xl:size-5" />
          <p className="text-body-2-mobile-md text-grey-500 xl:text-body-2-desktop-md">
            SWIFT: EVBLNPKA
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PhoneCallIcon className="text-grey-500 size-4 shrink-0 xl:size-5" />
          <p className="text-body-2-mobile-md text-grey-500 xl:text-body-2-desktop-md">
            Toll free: 1660-01-66777
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-2 xl:flex-row xl:gap-4">
        <Button
          variant="tertiary-white"
          size="lg"
          className="h-[42px] w-full xl:h-[46px] xl:w-67.5"
          leftIcon={<PhoneCallIcon className="size-4" />}
        >
          Call Us
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="h-[42px] w-full text-red-500! xl:h-[46px] xl:w-67.5 xl:text-red-600!"
        >
          Make an enquire
        </Button>
      </div>
    </div>
  );
}
