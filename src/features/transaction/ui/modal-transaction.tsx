import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/shared/ui/button';
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
import { Switch } from '@/shared/ui/switch';

import { TransactionTypeEnum } from '@/entities/transaction';

import { useCreateTransaction } from '../model/hooks/use-create-transaction';

const formSchema = z.object({
  amount: z.string().min(1, {
    message: 'Сумма обязательна.'
  }),
  description: z.string().min(1, {
    message: 'Описание обязательна.'
  }),
  type: z.nativeEnum(TransactionTypeEnum)
});

export const ModalTransaction = ({
  trigger
}: {
  trigger: () => React.ReactNode;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
      description: '',
      type: TransactionTypeEnum.INCOME
    }
  });

  const { createTransaction } = useCreateTransaction();

  const onSubmit = form.handleSubmit(data => {
    createTransaction(data);
    form.reset();
  });

  return (
    <Dialog>
      <DialogTrigger className="w-full">{trigger()}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Начислить доход</DialogTitle>
        </DialogHeader>
        <div>
          <FormProvider {...form}>
            <form {...form} onSubmit={onSubmit} className="space-y-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сумма</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="$0.00" {...field} />
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
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Input placeholder="Добавьте комментарий" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === TransactionTypeEnum.INCOME}
                        onCheckedChange={checked =>
                          field.onChange(
                            checked
                              ? TransactionTypeEnum.INCOME
                              : TransactionTypeEnum.EXPENSE
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Добавить</Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
};
