import { cn } from '@/lib/utils';

type CarouselDotsProps = {
  total: number;
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
};

export default function CarouselDots({
  total,
  activeIndex = 0,
  onSelect,
  className,
}: CarouselDotsProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {Array.from({ length: total }).map((_, index) => {
        const dotClassName = cn(
          'bg-grey-25 h-1.25 rounded-full transition-all',
          index === activeIndex ? 'w-6 bg-white' : 'w-1.25',
        );

        if (!onSelect) {
          return <span key={index} className={dotClassName} />;
        }

        return (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => onSelect(index)}
            className={cn(dotClassName, 'cursor-pointer')}
          />
        );
      })}
    </div>
  );
}
