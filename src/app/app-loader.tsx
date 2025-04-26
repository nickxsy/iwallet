import { useEffect, useState } from 'react';

import { sleep, useAppDispatch } from '@/shared/lib';
import { Spinner } from '@/shared/ui/spinner';

import { transactionStore } from '@/entities/transaction';

export const AppLoader = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);

      // Для имитации загрузки
      await sleep();

      await Promise.all([dispatch(transactionStore.actions.loadTransaction())]);

      setIsLoading(false);
    };

    load();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="fixed top-0 right-0 bottom-0 left-0 flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
};
