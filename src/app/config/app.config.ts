// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { IAppConfig } from './app-config.model';
// import { environment } from '../../environments/environment';

// @Injectable()
// export class AppConfig {
//     static settings: IAppConfig;
//     constructor(private http: HttpClient) {}
//     load() {
//         const jsonFile = '/assets/config/config.' + environment.name + '.json';
//         return new Promise<void>((resolve, reject) => {
//             this.http
//                 .get(jsonFile)
//                 .toPromise()
//                 .then((response: any) => {
//                     AppConfig.settings = <IAppConfig> response;
//                     resolve();
//                 })
//                 .catch((response: any) => {
//                     reject(
//                         `Could not load app configuration file '${jsonFile}': ${JSON.stringify(
//                             response
//                         )}`
//                     )
//                 })
//             }
//         );
//     }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IAppConfig } from './app-config.model'; // Ensure the correct path to your interface
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  static settings: IAppConfig;

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    const jsonFile = `/assets/config/config.${environment.name}.json`;
    console.log(`Loading config file: ${jsonFile}`);

    try {
      const response = await lastValueFrom(this.http.get<IAppConfig>(jsonFile));
      console.log(`Config file loaded:`, response);

      if (response) {
        AppConfig.settings = response;
      } else {
        throw new Error(`Configuration file is empty or invalid: ${jsonFile}`);
      }
    } catch (error) {
      console.error(`Error loading config file: ${jsonFile}`, error);
      throw new Error(`Could not load app configuration file '${jsonFile}': ${JSON.stringify(error)}`);
    }
  }
}
