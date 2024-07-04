import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { IAppConfig } from './app-config.model';

@Injectable()
export class AppConfig {
  static settings: IAppConfig;
  constructor(private http: HttpClient) {}
  load() {
    const jsonFile = '/assets/config/config.' + environment.name + '.json';
    console.log('amel here', jsonFile)
    return new Promise<void>((resolve, reject) => {
    this.http
              .get(jsonFile)
              .toPromise()
              .then((response: any) => {
                  AppConfig.settings = <IAppConfig> response;
                  resolve();
              })
              .catch((response: any) => {
                  reject(
                      `Could not load app configuration file '${jsonFile}': ${JSON.stringify(
                          response
                      )}`
                  )
              })
    });
  }
}
