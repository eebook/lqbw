// // libs
// import { Component, Inject } from '@angular/core';
// import { Store } from '@ngrx/store';

// // app
// // import { Config, ILang, LogService } from '../../core/index';
// import { Config } from '../../utils/index';
// import { ILang } from '../../../core/index';
// import { IAppState } from '../../ngrx/index';
// import * as multilingual from '../actions/index';
// import { MultilingualService, Languages, LanguageViewHelper } from '../services/index';

// @Component({
//   moduleId: module.id,
//   selector: 'lang-switcher',
//   templateUrl: 'lang-switcher.component.html',
//   styleUrls: ['lang-switcher.component.scss'],
// })
// export class LangSwitcherComponent {

//   public lang: string;
//   public supportedLanguages: Array<ILang>;

//   constructor(
//     private store: Store<IAppState>,
//     @Inject(Languages) private languages,
//     @Inject(LanguageViewHelper) private viewHelper
//   ) {
//     store.take(1).subscribe((s: any) => {
//       // s && s.18n - ensures testing works in all cases (since some tests dont use i18n state)
//       this.lang = s && s.i18n ? s.i18n.lang : '';
//     });
//   }

//   changeLang(e: any) {
//     let lang = this.supportedLanguages[0].code; // fallback to default 'en'

//     if (Config.IS_MOBILE_NATIVE()) {
//       if (e) {
//         lang = this.supportedLanguages[e.newIndex].code;
//       }
//     } else if (e && e.target) {
//       lang = e.target.value;
//     }
//     console.log(`Language change: ${lang}`);
//     this.store.dispatch(new multilingual.ChangeAction(lang));
//   }

//   ngOnInit() {
//     this.supportedLanguages = this.languages;
//   }
// }
