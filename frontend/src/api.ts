const BASE_URL = 'http://localhost:3000';

// Función base para las peticiones get
export async function apiGet<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) {
        throw new Error(`Error ${res.status}`);
    }
    return res.json();
}
