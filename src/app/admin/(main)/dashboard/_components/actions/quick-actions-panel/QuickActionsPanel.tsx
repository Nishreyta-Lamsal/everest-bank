import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';

const noticeCardClassName =
  'flex flex-col items-start gap-3.5 p-3.25 shadow-[0px_1px_2px_0px_rgba(15,23,42,0.04)]';

export default function QuickActionsPanel() {
  return (
    <Card className="flex w-full flex-col items-start gap-2.5 lg:shrink-0 xl:w-[410px]">
      <p className="text-paragraph-lg-medium w-full text-[rgba(15,23,42,0.8)]">
        Quick Actions
      </p>

      <Card className={noticeCardClassName}>
        <p className="text-paragraph-medium text-black-alpha-90 w-full">
          The Ashar-end branch hours notice expired 32 days ago and is still
          live.
        </p>
        <div className="flex w-full flex-col items-start gap-2">
          <p className="text-paragraph-sm text-neutral-700">
            USD buys 139.20 · sells 139.80.
          </p>
          <Button variant="ghost" size="small">
            Open the rates desk
            <icon.arrowUpRight />
          </Button>
        </div>
      </Card>

      <Card className="flex flex-col items-start gap-2 p-3.25 shadow-[0px_1px_2px_0px_rgba(15,23,42,0.04)]">
        <p className="text-paragraph-medium text-black-alpha-90 w-full">
          The auction notice for Biratnagar expires in 24 days.
        </p>
        <Button variant="ghost" size="small">
          Review
          <icon.arrowUpRight />
        </Button>
      </Card>

      <Card className={noticeCardClassName}>
        <p className="text-paragraph-medium text-black-alpha-90 w-full">
          Today&apos;s forex rates went up today · 9:05 am by
          <br />
          Treasury Desk
        </p>
        <div className="flex w-full flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-paragraph-sm text-neutral-700">
            USD buys 139.20 · sells 139.80.
          </p>
          <Button variant="ghost" size="small">
            Open the rates desk
            <icon.arrowUpRight />
          </Button>
        </div>
      </Card>

      <Card className="p-3.25 shadow-[0px_1px_2px_0px_rgba(15,23,42,0.04)]">
        <p className="text-paragraph-medium text-black-alpha-90">
          Right now everestbanklrd.com has{' '}
          <span className="font-semibold">6 pages</span> an{' '}
          <span className="font-semibold">7 products</span> live, covering{' '}
          <span className="font-semibold">13 locations</span>.
        </p>
      </Card>
    </Card>
  );
}
