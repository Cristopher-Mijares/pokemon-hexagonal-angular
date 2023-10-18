import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './adapters/primary/pokemon-list/pokemon-list.component';
import { CrudManagerPokemonService } from './core/usecases/interactors/crud-manager-pokemon.service';
import { PokemonRepositoryImplAPIService } from './adapters/secondary/pokemons/pokemons-api/pokemon-repository-impl-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PokemonListComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    { provide: 'CrudManagerPokemon', useClass: CrudManagerPokemonService },
    { provide: 'PokemonRepository', useClass: PokemonRepositoryImplAPIService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
