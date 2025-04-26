import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/shared/lib';

import { TransactionPartial } from '@/entities/transaction';

import { getGroupedTransactions } from '../../model/transaction.selectors';
import { TransactionItem } from '../transaction-item/transaction-item';

export const TransactionGrouped = ({
  selector
}: {
  selector?: (state: unknown) => Record<string, TransactionPartial[]>;
}) => {
  const [items, setItems] = useState<Record<string, string[]>>({});
  const content = useAppSelector(selector ?? getGroupedTransactions);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  useEffect(() => {
    const initial = Object.entries(content).reduce(
      (acc, [date, transactions]) => {
        acc[date] = transactions.map(tx => tx.id);
        return acc;
      },
      {} as Record<string, string[]>
    );
    setItems(initial);
  }, [content]);

  function handleDragEnd(event) {
    console.log(event);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const dateGroup = Object.entries(content).find(([_, txs]) =>
      txs.some(tx => tx.id === active.id)
    )?.[0];

    if (!dateGroup) return;

    setItems(prev => {
      const oldIndex = prev[dateGroup].indexOf(active.id);
      const newIndex = prev[dateGroup].indexOf(over.id);
      const updated = arrayMove(prev[dateGroup], oldIndex, newIndex);

      return {
        ...prev,
        [dateGroup]: updated
      };
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col gap-6">
        {Object.entries(content)
          .sort((x, y) => {
            console.log(x[0], y[0]);
            return x[0];
          })
          .map(([date, transactions]) => (
            <div key={date}>
              <h3 className="mb-2 font-bold">{date}</h3>
              <div className="flex flex-col gap-2">
                <SortableContext
                  disabled
                  items={items[date] ?? []}
                  strategy={verticalListSortingStrategy}
                >
                  {items[date]?.map(id => {
                    const tx = transactions.find(t => t.id === id);
                    return tx ? (
                      <TransactionItem id={id} key={tx.id} transaction={tx} />
                    ) : null;
                  })}
                </SortableContext>
              </div>
            </div>
          ))}
      </div>
    </DndContext>
  );
};
