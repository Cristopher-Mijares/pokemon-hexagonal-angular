import { TestBed } from '@angular/core/testing';

import { CrudManagerPokemonService } from './crud-manager-pokemon.service';
import { PokemonRepository } from '../ports/secondary/pokemon-repository';
import { Pokemon } from '../../domain/entities/pokemon';
import { of } from 'rxjs';

/**
 * In this test we are testing the use case
 */
fdescribe('CrudManagerPokemonService', () => {
  let service: CrudManagerPokemonService;
  let pokemonRepositoryFake: jasmine.SpyObj<PokemonRepository>;

  beforeEach(() => {
    pokemonRepositoryFake = jasmine.createSpyObj('PokemonRepository', [
      'getAllPokemons',
      'searchPokemonsByName',
      'getPokemonById',
    ]);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: 'PokemonRepository',
          useValue: pokemonRepositoryFake,
        },
      ],
    });
    service = TestBed.inject(CrudManagerPokemonService);
  });

  it('should render all pokemons, not using the real API', (done: DoneFn) => {
    // Step 1 - Mocking the API response
    let pokemonsFromRepository: Pokemon[] = [
      { id: 1, name: 'Pokemon A', order: 0, weight: 0 },
      { id: 2, name: 'Pokemon B', order: 0, weight: 1 },
      { id: 3, name: 'Pokemon C', order: 0, weight: 2 },
      { id: 4, name: 'Pokemon D', order: 0, weight: 3 },
      { id: 5, name: 'Pokemon E', order: 0, weight: 4 },
    ];
    pokemonRepositoryFake.getAllPokemons.and.returnValue(
      of([...pokemonsFromRepository])
    );

    // Step 2 - Mocking the expected response
    let businessRulesMark: string = ' enjoy eating Danoninos :P';
    let expectedPokemons: Pokemon[] = [];
    pokemonsFromRepository.forEach((pokemonItem: Pokemon) => {
      let newItem: Pokemon = { ...pokemonItem };
      newItem.name = newItem.name + businessRulesMark;
      expectedPokemons.push(newItem);
    });

    // Step 3 - Executing the tested method
    let pokemonsProcessedByBusinessRules: Pokemon[] = [];
    service.getAllPokemons().subscribe((pokemons: Pokemon[]) => {
      pokemonsProcessedByBusinessRules = pokemons;
      done();
    });

    // Step 4 - Evaluating the results
    expect(pokemonsProcessedByBusinessRules).toEqual(expectedPokemons);
  });
});
