import { SearchingComponent } from './searching.component';
import { NgModule } from '@angular/core';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchResultComponent } from './search-result/search-result.component';


@NgModule({
    declarations: [SearchFormComponent, SearchResultComponent],
    providers: [],
    exports: [SearchingComponent]
})

export class SearchingModule {

}
