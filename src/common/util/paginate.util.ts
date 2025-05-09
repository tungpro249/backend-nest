// src/common/utils/pagination.util.ts
export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
  message: string;
  code: number;
}

export function paginateResponse<T>(
  data: T[],
  totalItems: number,
  currentPage: number,
  perPage: number,
  message = 'Thành công',
  code = 200,
): PaginatedResponse<T> {
  const totalPages = Math.ceil(totalItems / perPage);
  return {
    data,
    pagination: {
      currentPage,
      perPage,
      totalItems,
      totalPages,
    },
    message,
    code,
  };
}
