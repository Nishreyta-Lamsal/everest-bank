import { SearchIcon } from '@/components/icons';

export default function NavbarSearchInput() {
  return (
    <label className="bg-grey-25 flex h-8 items-center gap-1 rounded-[4px] p-4 text-grey-400">
      <SearchIcon className="size-4 shrink-0" />
      <input
        type="search"
        placeholder="Search for anything"
        className="w-full bg-transparent text-body-4-desktop text-grey-400 outline-none placeholder:text-grey-400"
      />
    </label>
  );
}
