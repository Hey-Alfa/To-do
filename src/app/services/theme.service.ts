import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly themeKey = 'app-theme';

  constructor() { }
  setTheme(isDarkMode: boolean): void {
    const theme = isDarkMode ? 'dark' : "ligth";
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(this.themeKey, theme)
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      this.setTheme(false)
    }
  }

  isDarkMode(): boolean {
    return document.documentElement.getAttribute('data-theme',) === 'dark'
  }
}
