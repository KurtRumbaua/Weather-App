import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface WeatherData {

  //curent day forecast
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

// Forecast for the next 7 days
interface ForecastDay {
  date: string; 
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour: HourData[]; 
}

//hourly forecast for the next 7 days since the api also returns for the next 7 days
interface HourData {
  time: string;
  maxtemp_c: number;
  mintemp_c: number;
  condition: { 
    text: string;
    icon: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '30c849f741a64b5898382548241405';
  private apiUrl = 'http://api.weatherapi.com/v1/forecast.json';
  private days = '7';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}&days=${this.days}`;
    return this.http.get<WeatherData>(url);
  }
}
