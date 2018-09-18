import { Component } from '@angular/core';

import { ForecastPage } from '../forecast/forecast';
import { UVIndexPage } from '../uv-index/uv-index';
import { CurrentWeatherPage } from '../current-weather/current-weather';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CurrentWeatherPage;
  tab2Root = ForecastPage;
  tab3Root = UVIndexPage;

  constructor() {

  }
}
