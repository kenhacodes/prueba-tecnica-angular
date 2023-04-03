import { Component, OnInit } from '@angular/core';
import { ListOfCountriesService } from '../../services/list-of-countries.service';
import { Country } from '../../models/listOfCountries.model';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import {Subject} from "rxjs";


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  public currentPage = 1;
  public countriesPerPage = 5;
  public totalPages = 1;
  public countries: Country[] = [];
  public filteredCountries: Country[] = [];
  public countryForm = new FormGroup({
    country: new FormControl(''),
    continent: new FormControl('')
  });
  private filterUpdate = new Subject<void>();

  constructor(private listOfCountriesService: ListOfCountriesService) {
    this.filterUpdate.pipe(debounceTime(500)).subscribe(() => {
      this.updateCountries();
    });
  }



  ngOnInit(): void {
    this.getListOfCountries();
    this.countryForm.get('country').valueChanges.pipe(debounceTime(0)).subscribe(() => {
      this.requestFilterUpdate();
    });
  }

  getListOfCountries() {
    this.listOfCountriesService.getCListOfCountries().subscribe((countries) => {
      this.countries = countries;
      this.requestFilterUpdate();
    });
  }

  onContinentChange(selectedOptions: HTMLCollectionOf<HTMLOptionElement>) {
    const selectedContinents = Array.from(selectedOptions).map(option => option.value);
    this.countryForm.get('continent').setValue(selectedContinents);
    this.requestFilterUpdate();
  }

  updateCountries() {
    const countryFilter = this.countryForm.get('country').value.toLowerCase();
    const selectedContinents = this.countryForm.get('continent').value;

    this.filteredCountries = this.countries.filter(country => {
      const nameMatch = country.country.toLowerCase().includes(countryFilter);
      const continentMatch: boolean = selectedContinents.length === 0 || selectedContinents.includes(country.continent);
      return nameMatch && continentMatch;
    });

    this.totalPages = Math.ceil(this.filteredCountries.length / this.countriesPerPage);
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get paginatedCountries(): Country[] {
    const startIndex = (this.currentPage - 1) * this.countriesPerPage;
    const endIndex = startIndex + this.countriesPerPage;
    return this.filteredCountries.slice(startIndex, endIndex);
  }
  requestFilterUpdate(): void {
    this.filterUpdate.next();
  }
}

