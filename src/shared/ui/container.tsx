import { cn } from '../lib';

export const Container = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('container mx-auto max-w-[420px] px-4', className)}>
      {children}
    </div>
  );
};
