import {
  ChartTransaction,
  FooterTransaction,
  GlobalTransactionModal,
  TransactionList
} from '@/features/transaction';

const Page = () => {
  return (
    <>
      <ChartTransaction />
      <TransactionList className="mt-5 flex-1" />
      <FooterTransaction />
      <GlobalTransactionModal />
    </>
  );
};

export default Page;
