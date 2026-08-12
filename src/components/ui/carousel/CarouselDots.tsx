import { cn } from '@/lib/utils';

type CarouselDotsProps = {
  total: number;
  activeIndex?: number;
  className?: string;
};

export default function CarouselDots({
  total,
  activeIndex = 0,
  className,
}: CarouselDotsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={cn(
            'bg-grey-25 h-1.25 rounded-full',
            index === activeIndex ? 'bg-white w-6' : 'w-1.25',
          )}
        />
      ))}
    </div>
  );
}
