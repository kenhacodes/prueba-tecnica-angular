import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Country} from "../models/listOfCountries.model";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListOfCountriesService {

  private apiURL = 'https://websites.ladorianids.com/resources/prueba/list-countries.json'

  constructor(private http: HttpClient) { }

  getCListOfCountries(): Observable<Country[]> {
    console.log(this.http.get<Country[]>(this.apiURL));
    return this.http.get<Country[]>(this.apiURL)
  }

}
