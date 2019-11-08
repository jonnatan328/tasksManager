import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  dataObject: any = {};

  constructor() {
  }

  setData(key: string, value: any) {
    this.dataObject[key] = value;
  }

  getData(key: string){
    return this.dataObject[key];
  }

  cleanData(){
    this.dataObject = {};
  }
}
