import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './layouts/footer/footer.component';
import { Navbar } from './layouts/navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly title = signal('ECommerce.ClientApplication');
  currentYear = new Date().getFullYear();
}
