import { ReactNode, useState } from 'react';
import Button from './Button';

export interface Column<T> {
    key: keyof T;
    header: string;
    render?: (item: T) => ReactNode;
    sortable?: boolean;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (item: T) => string | number;
    className?: string;
    onRowClick?: (item: T) => void;
    pagination?: {
        itemsPerPage: number;
        totalItems: number;
        currentPage: number;
        onPageChange: (page: number) => void;
    };
}

const Table = <T,>({
    columns,
    data,
    keyExtractor,
    className = '',
    onRowClick,
    pagination
}: TableProps<T>) => {
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T;
        direction: 'asc' | 'desc';
    } | null>(null);

    const handleSort = (key: keyof T) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;

        const aValue = String(a[sortConfig.key]);
        const bValue = String(b[sortConfig.key]);

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const displayData = pagination
        ? sortedData.slice(
            (pagination.currentPage - 1) * pagination.itemsPerPage,
            pagination.currentPage * pagination.itemsPerPage
        )
        : sortedData;

    return (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column.key)}
                                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                    }`}
                                onClick={() => column.sortable && handleSort(column.key)}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{column.header}</span>
                                    {column.sortable && sortConfig?.key === column.key && (
                                        <span>
                                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {displayData.map((item) => (
                        <tr
                            key={keyExtractor(item)}
                            className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                            onClick={() => onRowClick?.(item)}
                        >
                            {columns.map((column) => (
                                <td
                                    key={`${keyExtractor(item)}-${String(column.key)}`}
                                    className="px-6 py-4 whitespace-nowrap"
                                >
                                    {column.render
                                        ? column.render(item)
                                        : String(item[column.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {pagination && pagination.totalItems > pagination.itemsPerPage && (
                <div className="flex items-center justify-between px-6 py-3 bg-white border-t">
                    <div className="flex items-center text-sm text-gray-700">
                        Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                        {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                        {pagination.totalItems} results
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={pagination.currentPage === 1}
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={
                                pagination.currentPage ===
                                Math.ceil(pagination.totalItems / pagination.itemsPerPage)
                            }
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table; 