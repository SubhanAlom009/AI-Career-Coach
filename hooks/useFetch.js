import { useState } from "react";
import { toast } from "sonner";

export const useFetch = (cb)=>{
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(null);
    const [error,setError] = useState(null);

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
            toast.error("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    }
    return { data, loading, error, fn, setData };
}