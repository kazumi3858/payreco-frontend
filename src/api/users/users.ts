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
import type { User } from ".././model";
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
 * Get a user
 * @summary Get a user
 */
export const getUsersUserId = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal
) => {
  return customInstance<User>({ url: "/user", method: "get", signal }, options);
};

export const getGetUsersUserIdQueryKey = () => ["/user"];

export type GetUsersUserIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof getUsersUserId>>
>;
export type GetUsersUserIdQueryError = ErrorType<unknown>;

export const useGetUsersUserId = <
  TData = Awaited<ReturnType<typeof getUsersUserId>>,
  TError = ErrorType<unknown>
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof getUsersUserId>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getGetUsersUserIdQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getUsersUserId>>> = ({
    signal,
  }) => getUsersUserId(requestOptions, signal);

  const query = useQuery<
    Awaited<ReturnType<typeof getUsersUserId>>,
    TError,
    TData
  >(queryKey, queryFn, {
    staleTime: Infinity,
    ...queryOptions,
  }) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
};
