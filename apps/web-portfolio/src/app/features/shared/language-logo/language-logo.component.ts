import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-logo',
  templateUrl: './language-logo.component.html',
})
export class LanguageLogoComponent implements OnInit {
  _key: string = null;

  @Input() set language(v: string) {
    this._key = v.replace('.', '').toLowerCase();
  }

  languageAssetMap = {
    net: 'assets/net-logo.svg',
    nx: 'assets/nx-logo.png',
    'c#': 'assets/net-logo.svg',
    angular: 'assets/angular-logo.svg',
    firebase: 'assets/firebase-logo.svg',
  };

  constructor() {}

  ngOnInit(): void {}
}
