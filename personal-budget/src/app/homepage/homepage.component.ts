import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleBlockComponent } from '../article-block/article-block.component';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js/auto';

@Component({ 
  selector: 'homepage',
  imports: [ArticleBlockComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [{
        data: [],
    }],

    labels: [
        'Rent',
        'Groceries',
        'Food'
    ]
};

  constructor(private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any)=>{
        this.dataSource.datasets[0].data = res.myBudget.map((item: any)=> item.budget);
        this.dataSource.labels=res.myBudget.map((item:any)=>item.title);


      this.createChart();
      // const d3Data = res.data.myBudget;
      // createD3jsChart(d3Data);
    })
  }


  createChart() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById("mySimpleChart") as HTMLCanvasElement;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
          console.error("Unable to get 2D context!");
          return;
      }

      const myPieChart = new Chart(ctx, {
          type: 'pie',
          data: this.dataSource
      });
    }
  }


}
