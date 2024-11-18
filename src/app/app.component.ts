import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.checkTheme()
  }

  checkTheme() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const theme = localStorage.getItem('app-theme');
      if (theme) {
        document.documentElement.setAttribute('data-theme', theme)
      }

    }
  }

}
