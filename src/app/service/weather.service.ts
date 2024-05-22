import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';


interface WeatherData {

  //curent day forecast
  location: { 
    name: string,
    localtime: string
  };

  current: {
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: { text: string; icon: string };
    wind_kph: number;
    wind_mph: number;
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
    maxtemp_f: number;
    mintemp_f: number;
    daily_chance_of_rain: number;
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
  maxtemp_f: number;
  mintemp_f: number;
  condition: { 
    text: string;
    icon: string;
  };
}

interface IP_Address {
  ip: string;
}

interface LocationData {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weather_api_key = '30c849f741a64b5898382548241405';
  private weather_api_url = 'http://api.weatherapi.com/v1/forecast.json';
  private weather_days = '7';
  private weather_aqi = 'yes';

  private ip_api_url = 'https://api.ipify.org';
  private ip_api_format = 'json';

  private geo_api_url = 'http://ip-api.com/json/'

  constructor(private http: HttpClient) {}

    
  //GET function for current ip address
  getIP(): Observable<IP_Address> {
    const url = `${this.ip_api_url}?format=${this.ip_api_format}`;
    return this.http.get<IP_Address>(url);
  }

  //GET function for current for location, also retrieves the data from the getIP() since it is needed
  getLocation(): Observable<LocationData> {
    return this.getIP().pipe(
      switchMap(ipData => {
        const url = `${this.geo_api_url}?ip=${ipData.ip}`;
        return this.http.get<LocationData>(url).pipe(
          catchError(error => {
            console.error('Error fetching location:', error);
            return of({} as LocationData); 
          })
        );
      }),
      catchError(error => {
        console.error('Error fetching IP:', error);
        return of({} as LocationData);
      })
    );
  } 
  
  //GET function for api json data, sets "city" as a parameter
  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.weather_api_url}?key=${this.weather_api_key}&q=${city}&days=${this.weather_days}&aqi=${this.weather_aqi}`;
    return this.http.get<WeatherData>(url);
  }

}
