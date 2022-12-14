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
import type { ExchangeRate } from ".././model";
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
 * Get exchange rates
 * @summary Get exchange rates
 */
export const getExchangeRates = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<ExchangeRate[]>(
    { url: "/exchange_rates", method: "get", signal },
    options
  );
};

export const getGetExchangeRatesQueryKey = () => ["/exchange_rates"];

export type GetExchangeRatesQueryResult = NonNullable<
  Awaited<ReturnType<typeof getExchangeRates>>
>;
export type GetExchangeRatesQueryError = ErrorType<unknown>;

export const useGetExchangeRates = <
  TData = Awaited<ReturnType<typeof getExchangeRates>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getExchangeRates>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetExchangeRatesQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof getExchangeRates>>
  > = ({ signal }) => getExchangeRates(requestOptions, signal);

  const query = useQuery<
    Awaited<ReturnType<typeof getExchangeRates>>,
    TError,
    TData
  >(queryKey, queryFn, {
    staleTime: 3600000,
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};
