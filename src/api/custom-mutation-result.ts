import { QueryClient } from "@tanstack/react-query";

export const customMutationResult = (
  queryClient: QueryClient,
  queryKey: string
) => {
  return {
    onError: (error: any) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  };
};
