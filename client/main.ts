import { enableProdMode, CompilerOptions } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { getTranslationProviders } from './i18n-providers';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  console.log('prod mode');
}

// getTranslationProviders(environment.production).then((providers: CompilerOptions[]) => {
//   const options = { providers };
//   platformBrowserDynamic().bootstrapModule(AppModule, options);
// });
platformBrowserDynamic().bootstrapModule(AppModule);

