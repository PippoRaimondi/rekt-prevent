export enum SortBy {
  CREATED_AT = 'createdAt',
  NAME = 'name',
}

export type OrderBy = {
  sort: SortBy;
  direction: 'ASC' | 'DESC';
};

export type Filter = {
  name?: string;
  email?: string;
};

export type ListUserRequest = {
  page: number;
  filter: Filter;
  orderBy: OrderBy;
};
