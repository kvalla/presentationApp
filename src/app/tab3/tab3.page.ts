import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ForecastApi, ForecastModel } from '../models/forecast';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private weatherService: WeatherService) {}

  ionViewDidEnter() {
    this.hourlyForecast = [];
  }

  async detectGps(): Promise<void> {
    this.loading = true;
    const coordinates = await Geolocation.getCurrentPosition();
    
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;

    this.loading = false;
  }

  getForecast(): void {
    this.loading = true;
    this.hourlyForecast = [];

    if (!this.latitude || this.latitude < -90 || this.latitude > 90) {
      this.latitude = 0;
    }

    if (!this.longitude || this.longitude < -180 || this.longitude > 180) {
      this.longitude = 0;
    }

    this.weatherService.getForecast(this.latitude, this.longitude).subscribe((f: ForecastApi) => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const temperatureUnit = f.hourly_units.temperature_2m;
      const rainUnit = f.hourly_units.rain;
      const windUnit = f.hourly_units.windspeed_10m;

      f.hourly.time.forEach((timestamp, idx) => {
        const forecastDate = new Date(timestamp);
        const forecastDay = forecastDate.getDay();
        const forecastHour = forecastDate.getHours();

        if (forecastDay == currentDay && forecastHour >= currentHour) {
          this.hourlyForecast.push({
            hour: forecastHour,
            temperature: f.hourly.temperature_2m[idx].toFixed(1) + temperatureUnit,
            rain: f.hourly.rain[idx].toFixed(1) + rainUnit,
            windspeed: f.hourly.windspeed_10m[idx].toFixed(1) + windUnit
          });
        }
      });
    });

    this.loading = false;
  }

  loading: boolean;
  latitude: number;
  longitude: number;
  hourlyForecast: ForecastModel[];
}
