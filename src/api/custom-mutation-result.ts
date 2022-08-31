import { QueryClient } from "@tanstack/react-query";
import { SetStateAction } from "react";

export const customMutationResult = (
  queryClient: QueryClient,
  queryKey: string,
  setModal: React.Dispatch<SetStateAction<boolean>>
) => {
  return {
    onError: (error: any) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey]);
      setModal(false);
    },
  };
};

export const customMutationDeleteResult = (
  queryClient: QueryClient,
  queryKey: string,
  setDeleteModal: React.Dispatch<SetStateAction<boolean>>
) => {
  return {
    onError: (error: any) => {
      console.log(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries([queryKey]);
      setDeleteModal(false);
    },
  };
};
