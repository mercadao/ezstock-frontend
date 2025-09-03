import { useState, useMemo, useCallback } from 'react';

interface UsePaginatedDataOptions<T> {
  data: T[];
  itemsPerPage?: number;
  searchTerm?: string;
  searchFields?: (keyof T)[];
  filterFn?: (item: T, searchTerm: string) => boolean;
}

export function usePaginatedData<T>({
  data,
  itemsPerPage = 20,
  searchTerm = '',
  searchFields = [],
  filterFn,
}: UsePaginatedDataOptions<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    if (filterFn) {
      return data.filter(item => filterFn(item, searchTerm));
    }

    if (searchFields.length === 0) return data;

    const searchLower = searchTerm.toLowerCase();
    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchLower);
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      })
    );
  }, [data, searchTerm, searchFields, filterFn]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search term changes
  const handleSearch = useCallback((newSearchTerm: string) => {
    setCurrentPage(1);
  }, []);

  // Reset to first page when data changes
  const handleDataChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(current => current + 1);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(current => current - 1);
    }
  }, [currentPage]);

  return {
    // Data
    paginatedData,
    filteredData,
    totalItems: filteredData.length,
    
    // Pagination state
    currentPage,
    totalPages,
    itemsPerPage,
    
    // Pagination actions
    goToPage,
    goToNextPage,
    goToPreviousPage,
    handleSearch,
    handleDataChange,
    
    // Computed values
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    startIndex: startIndex + 1,
    endIndex: Math.min(endIndex, filteredData.length),
  };
}

// Custom hook for data refresh
export function useDataRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const refresh = useCallback(async (refreshFn: () => Promise<void>) => {
    setIsRefreshing(true);
    try {
      await refreshFn();
      setLastRefresh(new Date());
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  return {
    isRefreshing,
    lastRefresh,
    refresh,
  };
}
