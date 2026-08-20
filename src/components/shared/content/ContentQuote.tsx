type ContentQuoteProps = {
  title: string;
};

export default function ContentQuote({ title }: ContentQuoteProps) {
  return (
    <div className="flex items-center justify-center border-l-2 border-orange-500 px-4 py-2 lg:border-l-4">
      <p className="font-heading text-title-1-mobile-md lg:text-heading-h4-desktop-md text-grey-500 w-full max-w-[330px] leading-[130%] md:max-w-[485px]">
        {title}
      </p>
    </div>
  );
}
