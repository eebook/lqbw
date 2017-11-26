import { Observable } from 'rxjs/Observable';

export interface IMultilingualState {
  lang: string;
}

export const initialState: IMultilingualState = {
  lang: 'en'
};

export function getLang(state$: Observable<IMultilingualState>) {
  console.log('getlang state??? ', state$);
  return state$.select(state => state.lang);
}
