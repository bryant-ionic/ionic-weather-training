import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { Weather } from '../../models/weather';
import { Forecast } from '../../models/forecast';
import { UVIndex } from '../../models/uv-index';

@Injectable()
export class WeatherProvider {

  private appId = '625de48f1c079a69c379e941381b28d5';
  private baseUrl = 'http://api.openweathermap.org/data/2.5';

  private latitude = 43.073051;
  private longitude = -89.401230;

  constructor(private http: HttpClient) { }

  current(): Observable<Weather> {
    return this.http.get(
      `${this.baseUrl}/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.appId}`)
      .pipe(map((res: any) => this.unpackWeather(res)));
  }

  private unpackWeather(res: any): Weather {
    return {
      temperature: res.main.temp,
      condition: res.weather[0].id,
      date: new Date(res.dt * 1000)
    };
  }

  forecast(): Observable<Forecast> {
    return this.http.get(
      `${this.baseUrl}/forecast?lat=${this.latitude}&lon=${this.longitude}&appid=${this.appId}`)
      .pipe(map((res: any) => this.unpackForecast(res)));
  }

  private unpackForecast(res: any): Forecast {
    let currentDay: Array<Weather>;
    let prevDate: number;
    const forecast: Forecast = [];

    res.list.forEach(item => {
      const w = this.unpackWeather(item);
      if (w.date.getDate() !== prevDate) {
        prevDate = w.date.getDate();
        currentDay = [];
        forecast.push(currentDay);
      }
      currentDay.push(w);
    });

    return forecast;
  }

  uvindex(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/uvi?lat=${this.latitude}&lon=${this.longitude}&appid=${this.appId}`).pipe(map((res: any) => this.unpackUVIndex(res)));
  }

  private unpackUVIndex(res: any): UVIndex {
    const calculatedRisk = this.riskLevel(res.value);
    return {
      value: res.value,
      riskLevel: calculatedRisk
    };
  }

  private riskLevel(value: number) {
      if (value < 3) {
        return 0;
      }
      if (value < 6) {
        return 1;
      }
      if (value < 8) {
        return 2;
      }
      if (value < 11) {
        return 3;
      }
      return 4;
  }
}
