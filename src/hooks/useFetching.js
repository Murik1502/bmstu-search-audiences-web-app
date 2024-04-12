import {useState} from "react";
import {wait} from "@testing-library/user-event/dist/utils";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback()
        } catch (e) {
            setError(e.message);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }
    }

    return [fetching, isLoading, error]
}