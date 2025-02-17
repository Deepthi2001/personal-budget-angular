import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'hero',
  imports: [RouterModule], 
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  standalone: true
})
export class HeroComponent {

}
