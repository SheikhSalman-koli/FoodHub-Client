"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { providerServices } from "../services/provider.services";


export function useProviderActions() {
  const queryClient = useQueryClient();
  const providersQuery = useQuery({
    queryKey: ["userProfile"],             
    queryFn:()=> providerServices.getProviders() 
  });


//   const updateProfileMutation = useMutation({
//     mutationFn: userService.updateProfile, // আপনার সার্ভিস লেয়ারের মেথড
//     onSuccess: () => {
    
//       queryClient.invalidateQueries({ queryKey: ["userProfile"] });
//     },
//     onError: (error: any) => {
//       console.error("Update failed:", error);
//     }
//   });

 
  return {
    providers: providersQuery.data,
    isLoading: providersQuery.isLoading,
   
  };
}