import Image from 'next/image';

export default function MountainDivider() {
  return (
    <div className="relative h-69.75 w-full overflow-hidden">
      <div className="absolute top-0 h-63 w-full">
        <Image
          src="/images/shared/mountain-panorama-divider.png"
          alt="Mountain image"
          fill
          className="object-cover"
        />
      </div>

      <div className="bg-grey-bluish-grey absolute inset-x-0 -bottom-20 h-50 blur-[50px]" />
    </div>
  );
}
