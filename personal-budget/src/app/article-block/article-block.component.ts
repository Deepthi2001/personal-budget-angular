import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'article-block',
  imports: [],
  templateUrl: './article-block.component.html',
  styleUrl: './article.component.scss',
  standalone: true
})
export class ArticleBlockComponent implements OnInit {
  @Input() h1 = 'h1';
  @Input() content ='Content';

  constructor(){}

  ngOnInit(): void {
      
  }
}
