export interface Forecast {
    hourly_units: {
        temperature_2m: string;
    }
    hourly: {
        time: string[];
        temperature_2m: number[];
    }
}