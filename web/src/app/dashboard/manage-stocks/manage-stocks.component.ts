import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import Stock from 'src/app/shared/models/stock-model';

@Component({
  selector: 'app-manage-stocks',
  templateUrl: './manage-stocks.component.html',
  styleUrls: ['./manage-stocks.component.css']
})
export class ManageStocksComponent implements OnInit {
  isLoading: boolean;
  messageCreate: string;
  stocks: Stock[] = [];
  newDate: Date | null = null;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.getAllStocks();
  }

  getAllStocks() {
    this.dashboardService.getAllStocks().subscribe(
      stocks => {
        this.stocks = stocks as Stock[];
      }
    );
  }

  parseDateString(dateStr: string): Date | null {
    const [day, month, year] = dateStr.split('/');
    if (!day || !month || !year) return null;
    return new Date(+year, +month - 1, +day);
  }

  formatDateToString(date: Date | null): string {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  createStock(name: string, price: string, variation: string, date: string) {
    this.isLoading = true;
    this.messageCreate = "Adicionando...";
    const stock = {
      id: null,
      name: name,
      price: parseFloat(price),
      variation: parseFloat(variation),
      date: date
    }
    const next = (): void => {
      this.messageCreate = "Ação adicionada com sucesso!";
      this.getAllStocks();
    }
    const error = (): void => {
      this.messageCreate = "Erro ao adicionar a ação.";
    }
    this.dashboardService.createStock(stock)
      .subscribe({ next, error })
      .add(() => {
        this.isLoading = false;
      });
  }

  updateStock(id: number, name: string, price: string, variation: string, date: string) {
    this.isLoading = true;
    const stock = {
      id: id,
      name: name,
      price: parseFloat(price),
      variation: parseFloat(variation),
      date: date
    }
    const next = (): void => {
      console.log("Ação atualizada com sucesso!");
      this.getAllStocks();
    }
    const error = (): void => {
      console.log("Erro ao atualizar a ação.");
    }
    this.dashboardService.updateStock(stock)
      .subscribe({ next, error })
      .add(() => {
        this.isLoading = false;
      });
  }

  deleteStock(id: number) {
    this.isLoading = true;
    const next = (): void => {
      console.log("Ação deletada com sucesso!");
      this.getAllStocks();
    }
    const error = (): void => {
      console.log("Erro ao deletar ação.");
    }
    this.dashboardService.deleteStock(id)
      .subscribe({ next, error })
      .add(() => {
        this.isLoading = false;
      });
  }
}
