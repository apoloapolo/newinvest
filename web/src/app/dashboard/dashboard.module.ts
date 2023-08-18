import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { StockCardComponent } from './stock-card/stock-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    DashboardPageComponent,
    StockCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonToggleModule,
  ],
})
export class DashboardModule { }
