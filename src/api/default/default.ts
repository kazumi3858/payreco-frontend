/**
 * Generated by orval v6.9.6 🍺
 * Do not edit manually.
 * payreco
 * API for payreco app
 * OpenAPI spec version: 1.0
 */
import { useMutation } from "@tanstack/react-query";
import type {
  UseMutationOptions,
  MutationFunction,
} from "@tanstack/react-query";
import type { UserParams, WorkParams, CompanyParams } from ".././model";
import { customInstance } from ".././custom-instance";
import type { ErrorType, BodyType } from ".././custom-instance";

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P
) => any
  ? P
  : never;

/**
 * Update a user
 * @summary Update a use
 */
export const patchUsersUserId = (
  userParams: BodyType<UserParams>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: "/user",
      method: "patch",
      headers: { "Content-Type": "application/json" },
      data: userParams,
    },
    options
  );
};

export type PatchUsersUserIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchUsersUserId>>
>;
export type PatchUsersUserIdMutationBody = BodyType<UserParams>;
export type PatchUsersUserIdMutationError = ErrorType<unknown>;

export const usePatchUsersUserId = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchUsersUserId>>,
    TError,
    { data: BodyType<UserParams> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchUsersUserId>>,
    { data: BodyType<UserParams> }
  > = (props) => {
    const { data } = props ?? {};

    return patchUsersUserId(data, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof patchUsersUserId>>,
    TError,
    { data: BodyType<UserParams> },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Delete a user
 * @summary Delete a user
 */
export const deleteUsersUserId = (
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<string>({ url: "/user", method: "delete" }, options);
};

export type DeleteUsersUserIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteUsersUserId>>
>;

export type DeleteUsersUserIdMutationError = ErrorType<unknown>;

export const useDeleteUser = <
  TError = ErrorType<unknown>,
  TVariables = void,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteUsersUserId>>,
    TError,
    TVariables,
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteUsersUserId>>,
    TVariables
  > = () => {
    return deleteUsersUserId(requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof deleteUsersUserId>>,
    TError,
    TVariables,
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Delete a work
 * @summary Delete a work
 */
export const deleteWorksWorkId = (
  workId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<string>(
    { url: `/works/${workId}`, method: "delete" },
    options
  );
};

export type DeleteWorksWorkIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteWorksWorkId>>
>;

export type DeleteWorksWorkIdMutationError = ErrorType<unknown>;

export const useDeleteWorksWorkId = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteWorksWorkId>>,
    TError,
    { workId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteWorksWorkId>>,
    { workId: string }
  > = (props) => {
    const { workId } = props ?? {};

    return deleteWorksWorkId(workId, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof deleteWorksWorkId>>,
    TError,
    { workId: string },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Update a work
 * @summary Update a work
 */
export const patchWorksWorkId = (
  workId: string,
  workParams: BodyType<WorkParams>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/works/${workId}`,
      method: "patch",
      headers: { "Content-Type": "application/json" },
      data: workParams,
    },
    options
  );
};

export type PatchWorksWorkIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchWorksWorkId>>
>;
export type PatchWorksWorkIdMutationBody = BodyType<WorkParams>;
export type PatchWorksWorkIdMutationError = ErrorType<unknown>;

export const usePatchWorksWorkId = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchWorksWorkId>>,
    TError,
    { workId: string; data: BodyType<WorkParams> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchWorksWorkId>>,
    { workId: string; data: BodyType<WorkParams> }
  > = (props) => {
    const { workId, data } = props ?? {};

    return patchWorksWorkId(workId, data, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof patchWorksWorkId>>,
    TError,
    { workId: string; data: BodyType<WorkParams> },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Create a work
 * @summary Create a work
 */
export const postWorks = (
  workParams: BodyType<WorkParams>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: "/works",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: workParams,
    },
    options
  );
};

export type PostWorksMutationResult = NonNullable<
  Awaited<ReturnType<typeof postWorks>>
>;
export type PostWorksMutationBody = BodyType<WorkParams>;
export type PostWorksMutationError = ErrorType<unknown>;

export const usePostWorks = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postWorks>>,
    TError,
    { data: BodyType<WorkParams> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postWorks>>,
    { data: BodyType<WorkParams> }
  > = (props) => {
    const { data } = props ?? {};

    return postWorks(data, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof postWorks>>,
    TError,
    { data: BodyType<WorkParams> },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Create a company
 * @summary Create a company
 */
export const postCompanies = (
  companyParams: BodyType<CompanyParams>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: "/companies",
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: companyParams,
    },
    options
  );
};

export type PostCompaniesMutationResult = NonNullable<
  Awaited<ReturnType<typeof postCompanies>>
>;
export type PostCompaniesMutationBody = BodyType<CompanyParams>;
export type PostCompaniesMutationError = ErrorType<unknown>;

export const usePostCompanies = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof postCompanies>>,
    TError,
    { data: BodyType<CompanyParams> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof postCompanies>>,
    { data: BodyType<CompanyParams> }
  > = (props) => {
    const { data } = props ?? {};

    return postCompanies(data, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof postCompanies>>,
    TError,
    { data: BodyType<CompanyParams> },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Update a company
 * @summary Update  a company
 */
export const patchCompaniesCompanyId = (
  companyId: string,
  companyParams: BodyType<CompanyParams>,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    {
      url: `/companies/${companyId}`,
      method: "patch",
      headers: { "Content-Type": "application/json" },
      data: companyParams,
    },
    options
  );
};

export type PatchCompaniesCompanyIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof patchCompaniesCompanyId>>
>;
export type PatchCompaniesCompanyIdMutationBody = BodyType<CompanyParams>;
export type PatchCompaniesCompanyIdMutationError = ErrorType<unknown>;

export const usePatchCompaniesCompanyId = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof patchCompaniesCompanyId>>,
    TError,
    { companyId: string; data: BodyType<CompanyParams> },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof patchCompaniesCompanyId>>,
    { companyId: string; data: BodyType<CompanyParams> }
  > = (props) => {
    const { companyId, data } = props ?? {};

    return patchCompaniesCompanyId(companyId, data, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof patchCompaniesCompanyId>>,
    TError,
    { companyId: string; data: BodyType<CompanyParams> },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Delete a company
 * @summary Delete a company
 */
export const deleteCompaniesCompanyId = (
  companyId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<string>(
    { url: `/companies/${companyId}`, method: "delete" },
    options
  );
};

export type DeleteCompaniesCompanyIdMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteCompaniesCompanyId>>
>;

export type DeleteCompaniesCompanyIdMutationError = ErrorType<unknown>;

export const useDeleteCompaniesCompanyId = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteCompaniesCompanyId>>,
    TError,
    { companyId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteCompaniesCompanyId>>,
    { companyId: string }
  > = (props) => {
    const { companyId } = props ?? {};

    return deleteCompaniesCompanyId(companyId, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof deleteCompaniesCompanyId>>,
    TError,
    { companyId: string },
    TContext
  >(mutationFn, mutationOptions);
};
/**
 * Delete an account
 * @summary Delete an account
 */
export const deleteAccount = (
  userId: string,
  options?: SecondParameter<typeof customInstance>
) => {
  return customInstance<void>(
    { url: `/accounts/${userId}`, method: "delete" },
    options
  );
};

export type DeleteAccountMutationResult = NonNullable<
  Awaited<ReturnType<typeof deleteAccount>>
>;

export type DeleteAccountMutationError = ErrorType<unknown>;

export const useDeleteAccount = <
  TError = ErrorType<unknown>,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof deleteAccount>>,
    TError,
    { userId: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof deleteAccount>>,
    { userId: string }
  > = (props) => {
    const { userId } = props ?? {};

    return deleteAccount(userId, requestOptions);
  };

  return useMutation<
    Awaited<ReturnType<typeof deleteAccount>>,
    TError,
    { userId: string },
    TContext
  >(mutationFn, mutationOptions);
};
