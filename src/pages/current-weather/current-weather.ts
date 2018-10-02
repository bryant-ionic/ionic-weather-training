import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { IconMapProvider } from '../../providers/icon-map/icon-map';
import { Weather } from '../../models/weather';

@Component({
  selector: 'page-current-weather',
  templateUrl: 'current-weather.html'
})
export class CurrentWeatherPage {

  currentWeather: Weather = {
    temperature: 302,
    condition: 200
  };

  constructor(public iconMap: IconMapProvider) {}
}
