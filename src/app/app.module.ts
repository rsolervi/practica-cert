import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { StockTrackerModule } from './components/tracker/stock-tracker.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, StockDetailComponent],
  imports: [AppRoutingModule, SharedModule, StockTrackerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
