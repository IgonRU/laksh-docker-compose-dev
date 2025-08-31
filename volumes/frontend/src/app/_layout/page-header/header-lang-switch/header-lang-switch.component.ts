import { Component, signal } from '@angular/core';

@Component({
  selector: 'laksh-header-lang-switch',
  standalone: true,
  imports: [],
  templateUrl: './header-lang-switch.component.html',
  styleUrls: ['./header-lang-switch.component.scss']
})
export class LakshHeaderLangSwitchComponent {
  language = signal<string>('ru');

  languages = [
    {
      code: 'ru',
      title: 'Ru'
    },
    {
      code: 'en',
      title: 'Eng'
    }
  ];

  getCurrentLanguage() {
    return this.languages.find(language => language.code === this.language()).code;
  }

  changeLanguage(code: string) {
    this.language.set(code);
  }
}
