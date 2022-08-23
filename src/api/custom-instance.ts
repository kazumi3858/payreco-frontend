import Axios, { AxiosError, AxiosRequestConfig } from "axios";
//import { auth } from './services/firebase';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

AXIOS_INSTANCE.interceptors.request.use(async function (config) {
  //const token = await auth.currentUser?.getIdToken(true)
  const token = "dummy token";
  config.headers!.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)

export type BodyType<BodyData> = BodyData;
