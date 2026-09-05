import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import NoticeExplorer from './NoticeExplorer';

import { noticeCards } from '../_data/notices';

export default function NoticeSection() {
  return (
    <section className="w-full py-16 lg:py-12">
      <LayoutWrapper>
        <NoticeExplorer notices={noticeCards} />
      </LayoutWrapper>
    </section>
  );
}
