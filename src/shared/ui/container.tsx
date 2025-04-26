import { Slot } from '@radix-ui/react-slot';

import { cn } from '../lib';

export const Container = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="container"
      className={cn('container mx-auto max-w-[420px] px-4', className)}
      {...props}
    />
  );
};
