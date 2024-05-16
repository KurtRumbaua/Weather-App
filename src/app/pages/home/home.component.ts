import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../service/weather.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  selectedForecast = 'hourly'; // Default to showing the hourly forecast
  weatherData: any;

  constructor(private weatherService: WeatherService) {}

  //function that calls GET function from the service and then passes city name
  ngOnInit(): void {
      this.weatherService.getWeather('Manila').subscribe(data => {
      this.weatherData = data;
    });
  }
}
