import {
  GlobalTransactionModal,
  TransactionList
} from '@/features/transaction';

const Page = () => {
  return (
    <>
      <TransactionList className="mt-5 flex-1" />
      <GlobalTransactionModal />
    </>
  );
};

export default Page;
