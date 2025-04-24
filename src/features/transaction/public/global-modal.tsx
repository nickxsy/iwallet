import { useAppDispatch, useAppSelector } from '@/shared/lib';

import {
  TransactionTypeEnum,
  transactionModalStore
} from '@/entities/transaction';

import { ModalTransaction } from '@/features/transaction/ui/modal-transaction';

import { getTransactionModal } from '../model/transaction.selectors';

export const GlobalTransactionModal = () => {
  const { type, transaction, isOpen } = useAppSelector(getTransactionModal);
  const dispatch = useAppDispatch();

  const closeModal = transactionModalStore.actions.closeTransactionModal;

  if (!isOpen) return null;

  return (
    <ModalTransaction
      type={type || transaction?.type || TransactionTypeEnum.INCOME}
      isOpen={isOpen}
      transaction={transaction}
      onClose={() => dispatch(closeModal())}
    />
  );
};
