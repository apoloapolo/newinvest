import { Component } from '@angular/core';
import News from 'src/app/shared/models/news-model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.css']
})
export class ManageBlogComponent {
  isLoading: boolean;
  news: News[] = [];
  messageCreate: string;

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

  createNews(titulo: string, descricao: string) {
    this.isLoading = true;
    this.messageCreate = "Adicionando...";
    const news = {
      id: null,
      titulo: titulo,
      descricao: descricao
    }
    const next = (): void => {
      this.messageCreate = "Notícia adicionada com sucesso!";
      this.getAllNews();
    }
    const error = (): void => {
      this.messageCreate = "Erro ao adicionar a notícia.";
    }
    this.dashboardService.createNews(news)
      .subscribe({ next, error })
      .add(() => {
        this.isLoading = false;
      });
  }

  updateNews(id: number, titulo: string, descricao: string) {
    this.isLoading = true;
    const news = {
      id: id,
      titulo: titulo,
      descricao: descricao
    }
    const next = (): void => {
      console.log("Notícia atualizada com sucesso!");
      this.getAllNews();
    }
    const error = (): void => {
      console.log("Erro ao atualizar a notícia.");
    }
    this.dashboardService.updateNews(id, news)
      .subscribe({ next, error })
      .add(() => {
        this.isLoading = false;
      });
  }

  deleteNews(id: number) {
    this.isLoading = true;
    const next = (): void => {
      console.log("Notícia deletada com sucesso!");
      this.getAllNews();
    }
    const error = (): void => {
      console.log("Erro ao deletar notícia.");
    }
    this.dashboardService.deleteNews(id)
      .subscribe({ next, error })
      .add(() => {
        this.isLoading = false;
      });
  }

}
