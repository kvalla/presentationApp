import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Forecast } from '../models/forecast';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private weatherService: WeatherService) {}

  ionViewDidEnter() {
    this.hourlyTemp = [];
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

    this.weatherService.getForecast(this.latitude, this.longitude).subscribe((f: Forecast) => {
      console.log(f);
    });

    this.loading = false;
  }

  loading: boolean;
  latitude: number;
  longitude: number;
  hourlyTemp: KeyValue<string, string>[]
}
