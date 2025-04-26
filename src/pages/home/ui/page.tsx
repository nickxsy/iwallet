import {
  ChartTransaction,
  FooterTransaction,
  GlobalTransactionModal,
  TransactionList
} from '@/features/transaction';

const Page = () => {
  return (
    <div>
      <ChartTransaction />
      <TransactionList className="mt-5 flex-1 pb-14" />
      <FooterTransaction className="bg-gradient-to-t from-white to-transparent" />
      <GlobalTransactionModal />
    </div>
  );
};

export default Page;
