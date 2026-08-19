import Image from 'next/image';

import { PlusIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

type CustomerAvatarStackProps = {
  avatars: string[];
  countLabel: string;
  className?: string;
  countClassName?: string;
};

export default function CustomerAvatarStack({
  avatars,
  countLabel,
  className,
  countClassName,
}: CustomerAvatarStackProps) {
  return (
    <div className={cn('hidden flex-col items-start gap-6', className)}>
      <div className="flex items-start">
        {avatars.map((avatar, index) => (
          <Image
            key={avatar}
            src={avatar}
            alt=""
            width={60}
            height={60}
            className={cn(
              'size-[34px] shrink-0 rounded-full lg:size-[60px]',
              index !== 0 && '-ml-3 lg:-ml-6',
            )}
          />
        ))}
        <div className="bg-cream-50 text-grey-200 -ml-3 flex size-[34px] shrink-0 items-center justify-center rounded-full lg:-ml-6 lg:size-[60px]">
          <PlusIcon className="size-[10px] lg:size-[14px]" />
        </div>
      </div>
      <p
        className={cn(
          'font-heading text-heading-h5-desktop text-grey-400',
          countClassName,
        )}
      >
        {countLabel}
      </p>
    </div>
  );
}
