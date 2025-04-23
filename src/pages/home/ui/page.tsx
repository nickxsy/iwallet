import {
  ChartTransaction,
  FooterTransaction,
  TransactionList
} from '@/features/transaction';

const Page = () => {
  return (
    <>
      <ChartTransaction />
      <TransactionList className="mt-5 flex-1" />
      <FooterTransaction />
    </>
  );
};

export default Page;
