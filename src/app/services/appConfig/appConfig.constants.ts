import { InjectionToken } from "@angular/core";
import { IAppConfig } from "./appConfig.interface";

export const APP_DI_CONFIG: IAppConfig = {

  API_BASE_URL: 'http://localhost:8081',

};

export let APP_CONFIG = new InjectionToken< IAppConfig >( 'app.config' );