import { AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, ViewChild 
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleBlockComponent } from '../article-block/article-block.component';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';
import { Chart } from 'chart.js/auto';
import { DataService } from '../services/data.service';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({ 
  selector: 'homepage',
  imports: [ArticleBlockComponent, BreadcrumbsComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private d3Data: { budget: number; title: string }[] = [];
  constructor(private dataService: DataService) {}

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

  private width = 400;
  private height = 400;
  private margin = 40;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;


  ngAfterViewInit(): void {
    this.dataService.getBudgetData().subscribe(res => {
      if (res) {
        this.d3Data = res.myBudget;
        this.dataSource.datasets[0].data = res.myBudget.map((item:any) => item.budget);
        this.dataSource.labels = res.myBudget.map((item:any) => item.title);

        this.createChart();

        setTimeout(() => {
          this.createD3jsChart(); 
        }, 200);
      }
    });
  }

  createChart() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.getElementById("mySimpleChart") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Unable to get 2D context!");
        return;
      }
      new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
      });
    }
  }

  createD3jsChart() {
    if (!isPlatformBrowser(this.platformId)) return;

    const chartElement = document.getElementById("myd3Chart");
    if (!chartElement) {
      console.error("D3 Chart container not found!");
      return;
    }

    d3.select(chartElement).select("svg").remove();

    const svg = d3.select(chartElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie<{ budget: number; title: string }>().value(d => d.budget);
    const pieData = pie(this.d3Data);

    const arc = d3.arc<d3.PieArcDatum<{ budget: number }>>()
      .innerRadius(0)
      .outerRadius(this.radius);

    svg.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arc as any)
      .attr('fill', (d, i) => color(i.toString()))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    svg.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.35em')
      .style('text-anchor', 'middle')
      .style('font-size', '12px')
      .text(d => d.data.title);
  }
}
