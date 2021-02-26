import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ROOT_I18N = 'assets/i18n/';
const LANGUAGE_STORAGE = 'chosen_language';
export const SUPPORTED_LANGUAGES = ['fr', 'es', 'en'];


@Injectable()
export class TranslateService {

  phrases: any = {};

  constructor(private http: HttpClient) {}

  use(lang: string): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
      const chosenLanguage = this.getLanguage() || lang;
      const langPath = `${ROOT_I18N}${chosenLanguage}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.phrases = Object.assign({}, translation || {});
          this.setLanguage(chosenLanguage);
          resolve(this.phrases);
        },
        error => {
          this.phrases = {};
          this.setLanguage(chosenLanguage);
          resolve(this.phrases);
        }
      );
    });
  }

  changeLanguage(lang: string) {
    this.setLanguage(lang);
    this.use(lang);
  }

  getLanguage(): string {
    return localStorage.getItem(LANGUAGE_STORAGE);
  }

  setLanguage(language: string) {
    localStorage.setItem(LANGUAGE_STORAGE, language);
  }

}
