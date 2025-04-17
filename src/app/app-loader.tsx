import { transactionStore } from "@/entities/transaction";
import { useAppDispatch } from "@/shared/lib";
import { useEffect, useState } from "react";

export const AppLoader = ({ children }: { children?: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    console.log(isLoading);
    Promise.all([dispatch(transactionStore.actions.loadTransaction())]).finally(
      () => setIsLoading(false)
    );
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="text-center fixed top-0 left-0 right-0 bottom-0 w-full h-full">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};
