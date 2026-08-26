import { useState, useEffect, useCallback } from 'react';
import { apiGet } from '../api';

export function useEntity<T extends { id: number }>(endpoint: string) {
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        setLoading(true);
        setItems(await apiGet<T[]>(endpoint));
        setLoading(false);
    }, [endpoint]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { items, loading, error, refresh };
}