import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../models/listOfCountries.model';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'filterCountries'
})
export class FilterCountriesPipe implements PipeTransform {

  transform(countries: Country[], form: FormGroup): Country[] {
    const countryFilter = form.get('country').value.toLowerCase();
    const selectedContinents = form.get('continent').value;

    return countries.filter(country => {
      const nameMatch = country.country.toLowerCase().includes(countryFilter);
      const continentMatch: boolean = selectedContinents.length === 0 || selectedContinents.includes(country.continent);
      return countries;
    });
  }

}
