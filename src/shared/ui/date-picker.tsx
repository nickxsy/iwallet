import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/ui/select';

export const DatePicker = () => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full flex-col space-y-2 p-2">
        <Select
          onValueChange={value => setDate(addDays(new Date(), parseInt(value)))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выбрать дату" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Сегодня</SelectItem>
            <SelectItem value="-1">Вчера</SelectItem>
            <SelectItem value="1">Завтра</SelectItem>
            <SelectItem value="3">Через 3 дня</SelectItem>
            <SelectItem value="7">Через неделю</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
