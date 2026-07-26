import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { EmptyState } from './EmptyState';

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowKey: (row: T, index: number) => string;
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T>({ columns, data, getRowKey, className, emptyTitle = 'No data available', emptyDescription }: DataTableProps<T>) {
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className={cn('overflow-hidden rounded-[16px] border border-border bg-white shadow-soft', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-background/80 text-[11px] uppercase tracking-[0.2em] text-primary/45">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={cn('whitespace-nowrap px-5 py-4 font-semibold', column.className)}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/80 text-primary/70">
            {data.map((row, rowIndex) => (
              <tr key={getRowKey(row, rowIndex)} className="transition-colors hover:bg-primary/[0.02]">
                {columns.map((column) => (
                  <td key={column.key} className={cn('whitespace-nowrap px-5 py-4', column.className)}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}