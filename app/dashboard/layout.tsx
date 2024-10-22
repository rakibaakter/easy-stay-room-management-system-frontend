"use client"
import React, { ReactNode, useEffect, useState } from "react";

import DashboardNavber from "@/components/dashboard/dashboardNavber";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const layout = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem("token"));
            setLoading(false)
        }
          
      }, []);

      console.log(token);
      
      if(loading)return <Spinner color="default"/>
      if(!token){
        return router.push('/auth/login?redirect=/dashboard')
      }

  return (
    <div>
      <DashboardNavber />

      {children }
    </div>
  );
};

export default layout;
