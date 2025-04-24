import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';
import { DatePicker } from '@/shared/ui/date-picker';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shared/ui/dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';

import {
  TransactionPartial,
  TransactionTypeEnum
} from '@/entities/transaction';
import { TransactionType } from '@/entities/transaction';

import { useCreateTransaction } from '../model/hooks/use-create-transaction';
import { useUpdateTransaction } from '../model/hooks/use-update-transaction';

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'Сумма обязательна.'
  }),
  description: z.string(),
  type: z.enum([TransactionTypeEnum.EXPENSE, TransactionTypeEnum.INCOME])
});

type ModalTransactionProps = {
  transaction?: TransactionPartial;
  type: TransactionType;
  onClose: () => void;
  isOpen?: boolean;
};

export const ModalTransaction = ({
  transaction,
  onClose,
  isOpen,
  type
}: ModalTransactionProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      amount: transaction?.amount || '',
      description: transaction?.description || '',
      type: transaction?.type || type
    }
  });

  const { createTransaction } = useCreateTransaction();
  const { updateTransaction } = useUpdateTransaction();

  const onSubmit = form.handleSubmit(data => {
    if (transaction) {
      const newData = {
        ...data,
        id: transaction?.id
      };
      updateTransaction(newData);
    } else {
      createTransaction(data);
      form.reset();
    }
    onClose();
  });

  const modalTitle = transaction
    ? 'Редактировать транзакцию'
    : type === TransactionTypeEnum.EXPENSE
      ? 'Добавить расход'
      : 'Добавить доход';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby="modal-modal-description"
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>
        <div>
          <FormProvider {...form}>
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сумма</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00 руб." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Заметка</FormLabel>
                    <FormControl>
                      <Input placeholder="Добавьте комментарий" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Выбрать дату</FormLabel>
                    <FormControl>{/* <DatePicker {...field} /> */}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {transaction ? 'Сохранить' : 'Добавить'}
              </Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
