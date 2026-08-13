import { AccessibilityIcon, AiSparkleIcon, CallIcon } from '@/components/icons';

const sideMenuItems = [
  { label: 'AI Assistant', icon: AiSparkleIcon },
  { label: 'Accessibility', icon: AccessibilityIcon },
  { label: 'Call Us', icon: CallIcon },
];

export default function SideFixedMenu() {
  return (
    <div className="bg-cream-50 fixed top-1/2 right-0 z-40 flex -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-tl-3xl rounded-bl-lg px-2 py-4">
      {sideMenuItems.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="text-grey- flex size-7 cursor-pointer items-center justify-center transition-colors hover:text-red-500"
        >
          <Icon className="size-7" />
        </button>
      ))}
    </div>
  );
}
