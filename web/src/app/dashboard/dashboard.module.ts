import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockCardComponent } from './stocks/stock-card/stock-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BlogComponent } from './blog/blog.component';
import { SimulationComponent } from './simulation/simulation.component';
import { StocksComponent } from './stocks/stocks.component';
import { ManageStocksComponent } from './manage-stocks/manage-stocks.component';
import { ManageBlogComponent } from './manage-blog/manage-blog.component';
import { DashboardComponent } from './dashboard.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AppRoutingModule } from "../app-routing.module";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    BlogComponent,
    SimulationComponent,
    StocksComponent,
    StockCardComponent,
    ManageStocksComponent,
    ManageBlogComponent,
    MyAccountComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
],
})
export class DashboardModule { }
