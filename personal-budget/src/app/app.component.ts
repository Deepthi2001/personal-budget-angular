import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleBlockComponent } from './article-block/article-block.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'root',
  imports: [
    RouterOutlet, MenuComponent, HeroComponent, FooterComponent, ArticleBlockComponent, BreadcrumbsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-budget';
}
