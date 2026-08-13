import Image from 'next/image';

export default function MountainDivider() {
  return (
    <div className="relative h-40 w-full overflow-hidden lg:h-69.75">
      <div className="absolute top-0 h-32 w-full lg:h-63">
        <Image
          src="/images/shared/mountain-panorama-divider.png"
          alt="Mountain image"
          fill
          className="object-cover"
        />
      </div>

      <div className="bg-grey-bluish-grey absolute inset-x-0 -bottom-35 h-50 blur-[12px] lg:-bottom-20 lg:blur-[50px]" />
    </div>
  );
}
