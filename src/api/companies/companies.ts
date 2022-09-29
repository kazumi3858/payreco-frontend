/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import { useQuery } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";
import type { Company } from ".././model";
import { customInstance } from ".././custom-instance";
import type { ErrorType } from ".././custom-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

/**
 * Get companies information
 * @summary Get companies
 */
export const getCompanies = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<Company[]>(
    { url: `/companies`, method: "get", signal },
    options
  );
};

export const getCompaniesQueryKey = () => [`/companies`];

export type GetCompaniesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getCompanies>>
>;
export type GetCompaniesQueryError = ErrorType<unknown>;

export const useGetCompanies = <
  TData = Awaited<ReturnType<typeof getCompanies>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getCompanies>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getCompaniesQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getCompanies>>> = ({
    signal,
  }) => getCompanies(requestOptions, signal);

  const query = useQuery<
    Awaited<ReturnType<typeof getCompanies>>,
    TError,
    TData
  >(queryKey, queryFn, {
    staleTime: Infinity,
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};
