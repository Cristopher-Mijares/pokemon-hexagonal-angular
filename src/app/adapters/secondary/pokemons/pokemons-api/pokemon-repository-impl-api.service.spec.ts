import { TestBed } from '@angular/core/testing';

import { PokemonRepositoryImplAPIService } from './pokemon-repository-impl-api.service';
import { environment } from 'src/environments/environment';
import { Pokemon } from 'src/app/core/domain/entities/pokemon';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetAllPokemonResponseDto } from './dto/get-all-pokemons-response-dto';
import { GetAllResultItemDto } from './dto/getall-result-item-dto';

fdescribe('PokemonRepositoryImplAPIService', () => {
  let service: PokemonRepositoryImplAPIService;
  let httpClientSpy: { get: jasmine.Spy };
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy,
        },
      ]
    });
    service = TestBed.inject(PokemonRepositoryImplAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get 3 pokemons, and transform DTOs to 3 business objects', (done: DoneFn) => {
    // Step 1 - Mocking the Pokemon-API's response in terms of Pokemon-Api's DTOs
    let pokemonsFromAPI: GetAllResultItemDto[] = [
      { name: 'Pokemon A', url: (environment['pokeapi-url'] + '1/') },
      { name: 'Pokemon B', url: (environment['pokeapi-url'] + '2/')  },
      { name: 'Pokemon C', url: (environment['pokeapi-url'] + '3/')  }
    ];
    let fakeResponse: GetAllPokemonResponseDto = {
      count: 3,
      next: '',
      results: [...pokemonsFromAPI] 
    }
    httpClientSpy.get.and.returnValue(
      of(fakeResponse)
    );
    
    // Step 2 - Mocking the response type in terms of business objects
    let expectedPokemons: Pokemon[] = [
      { id: 1, name: 'Pokemon A', urlImage: (environment['pokeapi-imgs-url'] + '1.png' ) },
      { id: 2, name: 'Pokemon B', urlImage: (environment['pokeapi-imgs-url'] + '2.png' )  },
      { id: 3, name: 'Pokemon C', urlImage: (environment['pokeapi-imgs-url'] + '3.png' )  }
    ];
    
    // Step 3 - Executing the tested method
    let pokemonsBusinessObjects: Pokemon[] = [];
    service.getAllPokemons().subscribe((pokemons: Pokemon[]) => {
      pokemonsBusinessObjects = pokemons;
      done();
    });

    // Step 4 - Evaluating the results
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1)
    expect(pokemonsBusinessObjects).toEqual(expectedPokemons);
  });
});
