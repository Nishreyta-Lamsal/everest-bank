'use client';

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      className={cn('flex w-full flex-col gap-2', className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'border-black-alpha-10 bg-white-alpha-80 w-full overflow-hidden rounded-lg border border-solid',
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left outline-none',
          className,
        )}
        {...props}
      >
        {children}
        <icon.chevronDown className="text-slate-500 size-4 shrink-0 transition-transform duration-200 group-data-[panel-open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionPanel({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      className={cn(
        'flex flex-col gap-3 px-3 pt-1 pb-3',
        'h-[var(--accordion-panel-height)] overflow-hidden transition-[height] duration-200 ease-out',
        className,
      )}
      {...props}
    />
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionPanel };
