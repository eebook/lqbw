import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  MatListModule,
  MatInputModule,
  MatCardModule,
  MatIconModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ParticlesModule } from 'angular-particle';
import { SearchComponent } from './search.component';
import { searchRoutes } from './search.routes';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { GithubService } from './search.service';
import { SearchtmpComponent } from './containers/search/search.component';
import { ComponentsModule } from './components/index';
import { BookEffects } from './effects/book';
import { reducers } from './reducers';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ComponentsModule,
    ParticlesModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    StoreModule.forFeature('books', reducers),
    EffectsModule.forFeature([BookEffects]),
    RouterModule.forChild(searchRoutes),
  ],
  declarations: [
    SearchComponent,
    SearchFormComponent,
    SearchResultComponent,
    SearchtmpComponent,
  ],
  providers: [
    GithubService,
  ]
})
export class SearchModule { }
