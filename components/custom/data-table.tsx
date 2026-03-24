// components/ui/data-table.tsx
"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    Filter,
    X,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "../ui/checkbox";

export interface Column<T> {
    key: keyof T | string;
    header: string;
    cell?: (item: T) => React.ReactNode;
    className?: string;
}

export interface FilterOption {
    key: string;
    label: string;
    options: { value: string; label: string; icon?: React.ReactNode }[];
}

// ✅ New interface for custom filter components
export interface CustomFilter {
    key: string;
    component: React.ReactNode;
}

interface DataTableProps<T> {
    title: string;
    data: T[];
    columns: Column<T>[];
    filters?: FilterOption[];
    customFilters?: CustomFilter[];  // ✅ New prop for custom filters
    searchPlaceholder?: string;
    onSearch?: (query: string) => void;
    onFilter?: (key: string, value: string) => void;
    onClearFilters?: () => void;
    activeFilters?: Record<string, string>;
    filterComponents?: Record<string, (value: string) => React.ReactNode>;
    itemsPerPage?: number;
    onRowClick?: (item: T) => void;
    onSelectionChange?: (selectedIds: string[]) => void;
    getId: (item: T) => string;
    headerActions?: React.ReactNode;
    summaryStats?: React.ReactNode;
    showFilterRow?: boolean;  // ✅ Control filter row visibility
}

export function DataTable<T>({
    title,
    data,
    columns,
    filters = [],
    customFilters = [],  // ✅ New prop
    searchPlaceholder = "Search...",
    onSearch,
    onFilter,
    onClearFilters,
    activeFilters = {},
    filterComponents = {},
    itemsPerPage = 10,
    onRowClick,
    onSelectionChange,
    getId,
    headerActions,
    summaryStats,
    showFilterRow = true,  // ✅ Default true
}: DataTableProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    // Pagination
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle search
    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
        if (onSearch) onSearch(value);
    };

    // Handle filter change
    const handleFilterChange = (key: string, value: string) => {
        setCurrentPage(1);
        if (onFilter) onFilter(key, value);
    };

    // Handle clear filters
    const handleClearFilters = () => {
        setSearchQuery("");
        setCurrentPage(1);
        if (onClearFilters) onClearFilters();
    };

    // Handle select all
    const handleSelectAll = () => {
        if (selectedRows.size === paginatedData.length) {
            setSelectedRows(new Set());
            if (onSelectionChange) onSelectionChange([]);
        } else {
            const newSelected = new Set(paginatedData.map(item => getId(item)));
            setSelectedRows(newSelected);
            if (onSelectionChange) onSelectionChange(Array.from(newSelected));
        }
    };

    // Handle select row
    const handleSelectRow = (id: string) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
        if (onSelectionChange) onSelectionChange(Array.from(newSelected));
    };

    // Calculate active filters count
    const activeFiltersCount = Object.values(activeFilters).filter(v => v !== "all").length;

    // Pagination Controls
    const PaginationControls = () => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
                    <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, data.length)}
                    </span>
                    of <span className="font-medium">{data.length}</span> items
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="h-8 w-8"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={currentPage === 1}
                        className="h-8 w-8"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground min-w-20 text-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-primary">{title}</h1>
                {headerActions}
            </div>

            {/* Search and Filters */}
            {showFilterRow && (
                <div className="flex gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-9 w-full"
                        />
                    </div>

                    {/* Filters Row - Flex with all filters */}
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Standard Filters */}
                        {filters.length > 0 && (
                            <>
                                <div className="flex items-center gap-2">
                                    <Filter className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Filters:</span>
                                </div>

                                {filters.map((filter) => (
                                    <Select
                                        key={filter.key}
                                        value={activeFilters[filter.key] || "all"}
                                        onValueChange={(value) => handleFilterChange(filter.key, value)}
                                    >
                                        <SelectTrigger className="w-37.5 border border-border rounded-md shadow-sm hover:bg-accent/50 transition-colors">
                                            <SelectValue placeholder={filter.label} />
                                        </SelectTrigger>
                                        <SelectContent className="border border-border">
                                            <SelectItem value="all" className="border-b border-border last:border-0">
                                                All {filter.label}
                                            </SelectItem>
                                            {filter.options.map((option, index) => (
                                                <SelectItem
                                                    key={option.value}
                                                    value={option.value}
                                                    className={index < filter.options.length - 1 ? "border-b border-border" : ""}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        {option.icon}
                                                        <span>{option.label}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ))}
                            </>
                        )}

                        {/* Custom Filters (like Date Range) */}
                        {customFilters.map((customFilter) => (
                            <div key={customFilter.key} className="flex items-center">
                                {customFilter.component}
                            </div>
                        ))}

                        {/* Clear Filters Button */}
                        {/* {activeFiltersCount > 0 && ( */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearFilters}
                            className="h-8 gap-1"
                        >
                            <X className="h-3 w-3" />
                            Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}
                        </Button>
                        {/* )} */}
                    </div>
                </div>
            )}

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="px-3 py-1">
                        {activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}
                    </Badge>
                    {Object.entries(activeFilters).map(([key, value]) => {
                        if (value === "all") return null;
                        const filter = filters.find(f => f.key === key);
                        const option = filter?.options.find(o => o.value === value);
                        return (
                            <Badge key={key} variant="outline" className="px-3 py-1 flex items-center gap-1">
                                {filterComponents[key] ? filterComponents[key](value) : (
                                    <>
                                        {option?.icon}
                                        <span>{filter?.label}: {option?.label || value}</span>
                                    </>
                                )}
                            </Badge>
                        );
                    })}
                </div>
            )}

            {/* Table */}
            <Card className="py-0">
                <CardContent className="p-0 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                {/* Select Checkbox Column */}
                                {/* <TableHead className="w-10">
                                    <Checkbox
                                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </TableHead> */}
                                {columns.map((column) => (
                                    <TableHead key={column.key as string} className={column.className}>
                                        {column.header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => {
                                    const id = getId(item);
                                    return (
                                        <TableRow
                                            key={id}
                                            className={`hover:bg-accent/50 ${onRowClick ? 'cursor-pointer' : ''}`}
                                            onClick={() => onRowClick && onRowClick(item)}
                                        >
                                            {/* Select Checkbox */}
                                            {/* <TableCell onClick={(e) => e.stopPropagation()}>
                                                <Checkbox
                                                    checked={selectedRows.has(id)}
                                                    onCheckedChange={() => handleSelectRow(id)}
                                                />
                                            </TableCell> */}

                                            {/* Data Columns */}
                                            {columns.map((column) => (
                                                <TableCell key={column.key as string} className={column.className}>
                                                    {column.cell
                                                        ? column.cell(item)
                                                        : String(item[column.key as keyof T] || '')}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} className="text-center py-8">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <Filter className="h-8 w-8 mb-2 opacity-50" />
                                            <p>No items found matching your filters</p>
                                            <Button
                                                variant="link"
                                                onClick={handleClearFilters}
                                                className="mt-2"
                                            >
                                                Clear filters
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Pagination */}
            <PaginationControls />

            {/* Summary Stats */}
            {summaryStats}
        </div>
    );
}
