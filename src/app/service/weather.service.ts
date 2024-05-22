import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface WeatherData {

  //curent day forecast
  location: { 
    name: string,
    localtime: string
  };

  current: {
    temp_c: number;
    is_day: number;
    condition: { text: string; icon: string };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    vis_km: number;
    uv: number; 
    air_quality:{
      "us-epa-index": number;
    }

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
  astro: {
    sunrise: string;
    sunset: string;
  }
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

  private api_key = '30c849f741a64b5898382548241405';
  private api_url = 'http://api.weatherapi.com/v1/forecast.json';
  private days = '7';
  private aqi = 'yes';

  constructor(private http: HttpClient) {}

  //GET function for api json data, sets "city" as a parameter
  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.api_url}?key=${this.api_key}&q=${city}&days=${this.days}&aqi=${this.aqi}`;
    return this.http.get<WeatherData>(url);
  }
}
