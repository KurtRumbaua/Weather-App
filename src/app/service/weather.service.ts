import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherData {
  location: { name: string };
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
    humidity: number;
    feelslike_c: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '30c849f741a64b5898382548241405';
  private apiUrl = 'http://api.weatherapi.com/v1/current.json';

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.apiUrl}?key=${this.apiKey}&q=${city}`;
    return this.http.get<WeatherData>(url);
  }

}
