import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherData {
  location: { name: string,
              localtime: string};
  current: {
    temp_c: number;
    is_day: number;
    condition: { text: string; icon: string };
    wind_mph: number;
    humidity: number;
  };

  forecast: {
    forecastday: ForecastDay[]; 
  };
}

interface ForecastDay {
  hour: HourData[]; 
}

interface HourData {
  time: string;
  temp_c: number;
  condition: { text: string };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '30c849f741a64b5898382548241405';
  private apiUrl = 'http://api.weatherapi.com/v1/forecast.json';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}`;
    return this.http.get<WeatherData>(url);
  }
}
