import Image from 'next/image';

type FooterMountainBannerProps = {
  imageUrl?: string;
};

export default function FooterMountainBanner({
  imageUrl,
}: FooterMountainBannerProps) {
  return (
    <div className="relative h-[75vw] w-full overflow-hidden xl:h-[33.68vw]">
      <div className="absolute inset-x-0 top-0 h-[81.79vw] overflow-hidden xl:h-[30.21vw]">
        <Image
          src={imageUrl ?? '/images/footer/mountain-climbers-bg.png'}
          alt=""
          width={4093}
          height={2198}
          className="absolute top-[-37.91%] left-[-19.55%] h-[176.42%] w-[173.01%] max-w-none xl:top-[-57.01%] xl:left-[-19.18%] xl:h-[229.7%] xl:w-[129.33%]"
        />
      </div>
      <div
        aria-hidden
        className="absolute top-[-13.48%] left-[-23.33%] h-[26.65%] w-[171.54%] bg-white blur-[20px] xl:top-[-16.08%] xl:left-[-1.18%] xl:h-[31.96%] xl:w-[102.43%] xl:blur-[22.45px]"
      />
      <div
        aria-hidden
        className="bg-grey-bluish-grey absolute top-[86.83%] left-[-8.72%] h-[26.02%] w-[141.79%] blur-[33px] xl:top-[81.03%] xl:left-[-1.18%] xl:h-[23.09%] xl:w-[102.43%]"
      />
      <div
        aria-hidden
        className="bg-grey-bluish-grey absolute top-[-0.21%] left-[5%] hidden h-[90.1%] w-[10%] opacity-32 blur-[33px] xl:block"
      />
      <div
        aria-hidden
        className="bg-grey-bluish-grey absolute top-[-0.21%] left-[106.39%] hidden h-[90.1%] w-[12.78%] opacity-32 blur-[33px] xl:block"
      />
      <p className="font-heading absolute inset-x-0 bottom-0 text-center text-[32px] leading-none font-semibold text-red-500 xl:text-[84px]">
        दिगो • दरिलो • विश्वासिलो
      </p>
    </div>
  );
}
