import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../shared/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  public language: string;
  public selectlanguage: string
  constructor(private _translate: TranslateService, private languageSerive: LanguageService
  ) { }

  ionViewDidEnter(): void {
    this.language = this.languageSerive.language;
  }


  public changeLanguage(): void {
    this._translate.get
    this._translate.use(this.language);
    this.languageSerive.language = this.language

  }
}