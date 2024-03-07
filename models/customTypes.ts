export interface FormData {
    enteredEmail?: string;
    enteredPassword?: string;
    enteredConfirmPassword?: string;
}

export type User = {
    enteredEmail?: string;
    enteredPassword?: string;
};

export type Password = {
    enteredPassword: string,
    userPassword: string
}

export type WeatherData = {
    coord: {
        lon: number;
        lat: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidty: number;
    };
    visiblity: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {
        all: number;
    };
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}