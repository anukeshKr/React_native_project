import { useAuth } from "@clerk/expo";
import { useMemo } from "react";
import { createClerkSuperBaseClient } from "../lib/superbase";

export function useSuperBase(){
    const {getToken} = useAuth();

    const  client = useMemo(()=>{
        return createClerkSuperBaseClient(()=>getToken());
    },[getToken])

    return client;
}