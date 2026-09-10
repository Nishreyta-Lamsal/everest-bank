import Image from 'next/image';

type SlideImageThumbnailProps = {
  src: string;
  alt?: string;
};

export default function SlideImageThumbnail({
  src,
  alt,
}: SlideImageThumbnailProps) {
  return (
    <span className="relative block h-[64px] w-[88px] shrink-0 overflow-hidden rounded-[6px] border border-[#e6ecf4] bg-[rgba(0,0,0,0.03)]">
      <Image
        src={src}
        alt={alt ?? ''}
        fill
        sizes="88px"
        className="object-cover"
      />
    </span>
  );
}
