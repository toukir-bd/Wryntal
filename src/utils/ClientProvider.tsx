"use client";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { SocketProvider } from "./SocketProvider";
import VerifyEmailCheck from "./VerifyEmailCheck";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import GlobalLoading from "@/components/GlobalLoading/GlobalLoading";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <Elements stripe={stripePromise}>
            <VerifyEmailCheck>
              {loaded ? children : <GlobalLoading />}
            </VerifyEmailCheck>
          </Elements>
        </SocketProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default ClientProvider;
