import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import News from 'src/app/shared/models/news-model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  news: News[] = [];

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getAllNews();
  }

  getAllNews() {
    this.dashboardService.getAllNews().subscribe(
      news => {
        this.news = news as News[];
      }
    );
  }
}
