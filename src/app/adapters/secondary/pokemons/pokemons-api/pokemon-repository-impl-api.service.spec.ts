import { TestBed } from '@angular/core/testing';

import { PokemonRepositoryImplAPIService } from './pokemon-repository-impl-api.service';

describe('PokemonRepositoryImplAPIService', () => {
  let service: PokemonRepositoryImplAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonRepositoryImplAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
