import { SearchIcon } from '@/components/icons';

export default function NavbarSearchInput() {
  return (
    <label className="bg-grey-25 text-grey-400 flex h-8 items-center gap-1 rounded-[4px] p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-red-500">
      <span className="sr-only">Search for anything</span>
      <SearchIcon className="size-4 shrink-0" />
      <input
        type="search"
        placeholder="Search for anything"
        className="text-body-4-desktop text-grey-400 placeholder:text-grey-400 w-full bg-transparent outline-none"
      />
    </label>
  );
}
