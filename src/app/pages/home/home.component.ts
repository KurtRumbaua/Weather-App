import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  weatherData: any; // Initialize weatherData

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
      this.weatherService.getWeather('Manila').subscribe(data => {
      this.weatherData = data;
    });
  }
}
