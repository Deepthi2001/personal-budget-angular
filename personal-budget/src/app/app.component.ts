import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleBlockComponent } from './article-block/article-block.component';

@Component({
  selector: 'root',
  imports: [
    RouterOutlet, MenuComponent, HeroComponent, FooterComponent, ArticleBlockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-budget';
}
