import { Component, Input, OnInit } from '@angular/core';

import { TranslateService, SUPPORTED_LANGUAGES } from '../../services/translate.service';
import { FLAGS_BY_LANG } from '../../Constants';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})

export class LanguageSelectionComponent implements OnInit {

  languages = SUPPORTED_LANGUAGES;
  flagsByLanguage = FLAGS_BY_LANG;

  selectedLanguage: string;
  showFlags = false;
  @Input() openUp = false;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.selectedLanguage = this.translate.getLanguage();
  }

  setLang(lang: string) {
    this.translate.changeLanguage(lang);
    this.selectedLanguage = lang;
  }

  displayFlags(newState: boolean) {
    this.showFlags = newState;
  }
}
