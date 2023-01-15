export interface ForecastApi {
    utc_offset_seconds: number;
    hourly_units: {
        temperature_2m: string;
        rain: string;
        windspeed_10m: string;
    },
    hourly: {
        time: string[];
        temperature_2m: number[];
        rain: number[];
        windspeed_10m: number[];
    }
}

export interface ForecastModel {
    hour: number;
    temperature: string;
    rain: string;
    windspeed: string;
}