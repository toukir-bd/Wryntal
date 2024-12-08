import { useQuery, useQueryClient } from "@tanstack/react-query";
import API from "@/apis/api";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const useUser = () => {
  const supabase = createClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingSupabaseUser, setIsLoadingSupabaseUser] = useState(false);

  const queryClient = useQueryClient();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["userProfile", isAuthenticated],
    queryFn: () => {
      if (isAuthenticated) {
        return API.user.getUserProfile();
      } else {
        return null;
      }
    },
    enabled: isAuthenticated,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const getUser = async () => {
      setIsLoadingSupabaseUser(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setIsLoadingSupabaseUser(false);
    };

    getUser();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setIsAuthenticated(true);
      } else if (event === "SIGNED_OUT") {
        setIsAuthenticated(false);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, [supabase, queryClient]);

  return {
    user: isAuthenticated ? user : null,
    isLoading: userLoading || isLoadingSupabaseUser,
  };
};

export default useUser;
