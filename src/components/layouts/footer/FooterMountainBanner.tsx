import Image from 'next/image';

export default function FooterMountainBanner() {
  return (
    <div className="relative h-[485px] w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[435px] overflow-hidden">
        <Image
          src="/images/footer/mountain-climbers-bg.png"
          alt=""
          width={4093}
          height={2198}
          className="absolute top-[-57.01%] left-[-19.18%] h-[229.7%] w-[129.33%] max-w-none"
        />
      </div>
      <div
        aria-hidden
        className="bg-white absolute left-[-1.18%] top-[-16.08%] h-[31.96%] w-[102.43%] blur-[22.45px]"
      />
      <div
        aria-hidden
        className="bg-grey-bluish-grey absolute left-[-1.18%] top-[81.03%] h-[23.09%] w-[102.43%] blur-[33px]"
      />
      <div
        aria-hidden
        className="bg-grey-bluish-grey absolute top-[-0.21%] left-[5%] h-[90.1%] w-[10%] opacity-32 blur-[33px]"
      />
      <div
        aria-hidden
        className="bg-grey-bluish-grey absolute top-[-0.21%] left-[106.39%] h-[90.1%] w-[12.78%] opacity-32 blur-[33px]"
      />
      <p className="font-heading text-red-500 absolute inset-x-0 bottom-0 text-center text-[84px] leading-none font-semibold">
        दिगो • दरिलो • विश्वासिलो
      </p>
    </div>
  );
}
