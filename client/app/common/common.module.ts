import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// import { FieldBase, Textbox, Image } from './dynamic-form/form-field';


const SHARED_ELEMENTS = [
    // FieldBase,
    // Textbox,
    // Image
];

const IMPORT_MODULES = [
    HttpModule,
];

/**
 * Defines services/components/modules which will be shared globally, such as http
 */
@NgModule({
    declarations: SHARED_ELEMENTS,
    imports: IMPORT_MODULES,
    providers: [
        // HttpService,
    ]
})

export class CommonModule {

}
