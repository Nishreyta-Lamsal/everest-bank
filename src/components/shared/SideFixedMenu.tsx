import { icon } from '@/components/icons';

const sideMenuItems = [
  { label: 'AI Assistant', icon: icon.aiSparkle },
  { label: 'Accessibility', icon: icon.accessibility },
  { label: 'Call Us', icon: icon.call },
];

export default function SideFixedMenu() {
  return (
    <div className="bg-cream-50 fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-tl-3xl rounded-bl-lg px-2 py-4">
      {sideMenuItems.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="text-grey-500 flex size-[24px] cursor-pointer items-center justify-center transition-colors hover:text-red-500 lg:size-[28px]"
        >
          <Icon className="size-[24px] lg:size-[28px]" />
        </button>
      ))}
    </div>
  );
}
