export interface Pagination<T> {
  total: number
  data: T[]
  per_page: number
  current_page: number
  to: number
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  next_page_url: string
  path: string
  prev_page_url: null
}
