import ApprovalsCard from './approvals/ApprovalsCard';
import QuickActionsSection from './quick-actions/QuickActionsSection';
import QuickActionsPanel from './quick-actions-panel/QuickActionsPanel';

export default function ActionsSection() {
  return (
    <section className="flex w-full flex-col items-stretch gap-4 xl:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <ApprovalsCard />
        <QuickActionsSection />
      </div>
      <QuickActionsPanel />
    </section>
  );
}
