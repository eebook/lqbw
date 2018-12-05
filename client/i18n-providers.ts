import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID, MissingTranslationStrategy } from '@angular/core';
import { CompilerConfig } from '@angular/compiler';


export function getTranslationProviders(isAot: boolean): Promise<Object[]> {
    if (isAot) {
        console.log('isAot');
        return Promise.resolve([]);
    }
    // Get the locale id from the global
    const lang = localStorage.getItem('lang');
    const locale = (!lang) ? 'en-US' : lang;
    console.log('locale: ' + locale);
    const PROVIDERS = [ {provide: LOCALE_ID, useValue: locale} ];

    // return no providers if fail to get translation file for locale
    const noProviders: Object[] = [];

    // No locale or U.S. English: no translation providers
    if (!locale || locale === 'en-US') {
        return Promise.resolve(noProviders);
    }

    return getTranslationWithSystemJs(locale)
        .then( (translations: string ) => [
            { provide: TRANSLATIONS, useValue: translations },
            { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
            ...PROVIDERS
        ])
        .catch(() => PROVIDERS);
}

declare var System: any;

function getTranslationWithSystemJs(locale: string) {
    return System.import(`raw-loader!./assets/i18n/messages.${locale}.xlf`);  // relies on text plugin
}
