import Image from 'next/image';

export default function MountainDivider() {
  return (
    <div className="relative h-[160px] w-full overflow-hidden lg:h-[279px]">
      <div className="absolute top-0 h-[128px] w-full lg:h-[252px]">
        <Image
          src="/images/shared/mountain-panorama-divider.png"
          alt="Mountain image"
          fill
          className="object-cover"
        />
      </div>

      <div className="bg-grey-bluish-grey absolute inset-x-0 -bottom-35 h-[200px] blur-[12px] lg:-bottom-20 lg:blur-[50px]" />
    </div>
  );
}
