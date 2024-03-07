const BASE_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;



async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch data`);
    }

    const data = await response.json();
    return data as T;
}

export { fetchData, BASE_URL, API_KEY }
