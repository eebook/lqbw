import { AboutService } from './about.service';
import { AboutRoutes } from './about.routes';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CovalentCommonModule } from '@covalent/core';
import { CovalentMarkdownModule } from '@covalent/markdown';



@NgModule({
  declarations: [
    AboutComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    RouterModule.forChild(AboutRoutes),
    // angular modules
    CommonModule,
    RouterModule,
    CovalentCommonModule,
    CovalentMarkdownModule,
    // extra
  ],
  providers: [
    AboutService
  ],
})
export class AboutModule {}
