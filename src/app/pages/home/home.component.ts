import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  weatherData: any;
  Location = 'Manila';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.target instanceof HTMLElement) {
        event.preventDefault();
        this.updateLocation(event.target.innerText);
    }
  
  }
  updateLocation(newLocation: string) {
    this.Location = newLocation.trim(); 

    if (this.Location) {
        this.getWeatherData();
    }
  }

  getSlicedForecastday(): any[] | null { 
    // Make sure the array exists and is of the correct type
    if (this.weatherData && Array.isArray(this.weatherData.forecast.forecastday)) {
        return this.weatherData.forecast.forecastday.slice(0, 4);
    } else {
        return null; // Or an empty array, depending on your preference
    }
}

  //function that calls GET function from the service and then passes city name
  getWeatherData() {
    this.weatherService.getWeather(this.Location).subscribe(
      data => this.weatherData = data,
      error => console.error(error)
    );
  }
}
