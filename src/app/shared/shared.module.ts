import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ArrowComponent } from '../components/shared/arrow/arrow.component';
import { MonthPipe } from '../components/shared/month.pipe';
import { PositivePipe } from '../components/shared/positive.pipe';

@NgModule({
  declarations: [ArrowComponent, MonthPipe, PositivePipe],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    ArrowComponent,
    MonthPipe,
    PositivePipe,
  ],
})
export class SharedModule {}
