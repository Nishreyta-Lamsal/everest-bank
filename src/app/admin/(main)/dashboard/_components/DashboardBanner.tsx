import Image from 'next/image';

export default function DashboardBanner() {
  return (
    <section className="relative h-[200px] w-full overflow-hidden rounded-md bg-[linear-gradient(101deg,#ba2025_0%,#ad0309_100%)] p-4 md:p-5 lg:h-[230px]">
      <Image
        src="/admin/images/dashboard-banner-pattern.svg"
        alt=""
        width={805}
        height={644}
        className="absolute top-[-118px] right-[-280px] h-[644px] w-[805px]"
      />
      <div className="flex h-full flex-col justify-between">
        <Image
          src="/admin/icons/everest-logo.svg"
          alt="Everest Bank"
          width={240}
          height={35}
          className="h-[23px] w-[158px] md:h-[29px] md:h-[35px] md:w-[240px]"
        />
        <div className="flex flex-col gap-3 text-white">
          <p className="text-heading-2-medium">Good Morning, Steve Jobs</p>
          <p className="text-paragraph">Tuesday, 17 June</p>
        </div>
      </div>
    </section>
  );
}
