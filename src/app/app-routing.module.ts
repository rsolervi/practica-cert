import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { StockTrackerComponent } from './components/tracker/stock-tracker/stock-tracker.component';

const routes: Routes = [
  { path: '', component: StockTrackerComponent },
  { path: 'sentiment/:symbol', component: StockDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
