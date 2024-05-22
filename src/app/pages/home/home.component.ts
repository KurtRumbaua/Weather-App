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

  //function that calls GET function from the service and then passes city name
  getWeatherData() {
    this.weatherService.getWeather(this.Location).subscribe(
      data => this.weatherData = data,
      error => console.error(error)
    );
  }
}
