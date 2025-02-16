import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ArticleBlockComponent } from '../article-block/article-block.component';
import { Chart } from 'chart.js';

@Component({ 
  selector: 'homepage',
  imports: [ArticleBlockComponent,HttpClientModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true
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
  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any)=>{
      debugger;
      console.log(res, "result");
      for(var i=0;i<res.myBudget.length;i++){

        this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
        this.dataSource.labels[i]=res.myBudget[i].title;
        // console.log(this.dataSource,"this.datasource")
        // this.createChart();
      }
      // console.log(dataSource,"dataSource");
      // this.createChart();
      // const d3Data = res.data.myBudget;
      // createD3jsChart(d3Data);
    })
  }

  // createChart() {
  //   var ctx = document.getElementById("mySimpleChart").getContext("2d");
  //   var myPieChart = new Chart(ctx, {
  //       type: 'pie',
  //       data: this.dataSource
  //   });
  // }

}
