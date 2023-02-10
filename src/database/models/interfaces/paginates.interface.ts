export interface Options {
  sortBy?: string;
  limit?: string;
  page?: string;
  populate?: string;
}

export interface PaginationResult {
  results: [];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}
