import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild 
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleBlockComponent } from '../article-block/article-block.component';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import { Chart } from 'chart.js/auto';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({ 
  selector: 'homepage',
  imports: [ArticleBlockComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('d3ChartContainer') chartContainer?: ElementRef;  // ✅ For D3.js
  @ViewChild('chartCanvas') chartCanvas?: ElementRef;  // ✅ For Chart.js

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

  private svg: any;
  private margin = 40;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private chartInstance: Chart | null = null;  // ✅ Store Chart.js instance

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
      this.http.get('http://localhost:3000/budget')
    .subscribe((res: any)=>{
        this.dataSource.datasets[0].data = res.myBudget.map((item: any)=> item.budget);
        this.dataSource.labels=res.myBudget.map((item:any)=>item.title);


          this.createChart(); 
          this.createD3jsChart();
          // setTimeout(() => {  
          //   this.createD3jsChart();
          // });
        });
  }

  /**
   * ✅ Creates a Chart.js Pie Chart
   */
  createChart() {
    // if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
    //   console.error("Chart.js canvas not found!");
    //   return;
    // }

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

  /**
   * ✅ Creates a D3.js Pie Chart
   */
  private createD3jsChart(): void {
    if (!this.chartContainer || !this.chartContainer.nativeElement) {
      console.error("D3 Chart container is not available!");
      return;
    }

    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove(); // ✅ Clear previous chart

    this.svg = d3.select(element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<number>()
      .sort(null)
      .value((d: number) => d);

    const pieData = pie(this.dataSource.datasets[0].data as number[]);

    const arc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(this.radius);

    // Draw Pie Slices
    this.svg.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: d3.PieArcDatum<number>, i: number) => color(i.toString()))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    // Draw Labels
    this.svg.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('transform', (d: d3.PieArcDatum<number>) => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text((d: d3.PieArcDatum<number>, i: number) => this.dataSource.labels[i]);
  }

  /**
   * ✅ Cleanup Chart.js and D3.js when the component is destroyed
   */
  ngOnDestroy(): void {
    // Cleanup Chart.js
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Cleanup D3.js
    if (this.chartContainer?.nativeElement) {
      d3.select(this.chartContainer.nativeElement).selectAll('*').remove();
    }
  }
}
