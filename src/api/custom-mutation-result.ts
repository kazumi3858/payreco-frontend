import { QueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";

export const customMutationResult = (
  queryClient: QueryClient,
  queryKey: string,
  action: React.Dispatch<SetStateAction<boolean>>
) => {
  return {
    onError: (error: any) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey]);
      action(false);
    },
  };
};
