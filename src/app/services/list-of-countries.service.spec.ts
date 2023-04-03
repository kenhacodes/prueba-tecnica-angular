import { TestBed } from '@angular/core/testing';

import { ListOfCountriesService } from './list-of-countries.service';

describe('ListOfCountriesService', () => {
  let service: ListOfCountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfCountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
