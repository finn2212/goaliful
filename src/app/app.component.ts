import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { Plugins, Capacitor, AppState } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { Globalization } from '@ionic-native/globalization/ngx';
import { AuthService } from './auth/auth.service';
import { CalenderService } from './calendar/calender.service';
import { NgCalendarModule } from 'ionic2-calendar';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/language.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private previousAuthState = false;
  public language: string;


  constructor(
    private platform: Platform,
    private authService: AuthService,
    private router: Router,
    private calService: CalenderService,
    private _translate: TranslateService,
    private globalization: Globalization,
    private languageService: LanguageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
    this.getDeviceLanguage();
  }

  ngOnInit() {
    this.authSub = this.authService.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth) {
        this.router.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;
    });
    Plugins.App.addListener(
      'appStateChange',
      this.checkAuthOnResume.bind(this)
    );
    if (this.calService.isDataloaded == false) {
      this.router.navigateByUrl("/loading");
    }
  }


  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    // Plugins.App.removeListener('appStateChange', this.checkAuthOnResume);
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authService
        .autoLogin()
        .pipe(take(1))
        .subscribe(success => {
          if (!success) {
            this.onLogout();
          }
        });
    }
  }
  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('en');
    if (language) {
      this.languageService.language = language;
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'en';
      this.languageService.language = 'en';
    }
    this._translateLanguage();
  }
  _translateLanguage(): void {
    this._translate.use(this.language);

  }
  getDeviceLanguage() {
    if (window.Intl && typeof window.Intl === 'object') {
      this._initTranslate(navigator.language)
    }
    else {
      this.globalization.getPreferredLanguage()
        .then(res => {
          this._initTranslate(res.value)
        })
        .catch(e => { console.log(e); });
    }
  }
}
