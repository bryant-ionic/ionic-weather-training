import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Forecast } from '../../models/forecast';
import { IconMapProvider } from '../../providers/icon-map/icon-map';

@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html'
})
export class ForecastPage {
  forecast: Forecast = [
    [
      {
        temperature: 300,
        condition: 200,
        date: new Date(2018, 8, 19)
      }
    ],
    [
      {
        temperature: 265,
        condition: 601,
        date: new Date(2018, 8, 20)
      }
    ],
    [
      {
        temperature: 293,
        condition: 800,
        date: new Date(2018, 8, 21)
      }
    ]
  ];

  constructor(public iconMap: IconMapProvider) {}
}
