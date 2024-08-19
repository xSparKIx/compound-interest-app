import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DepositFormComponent } from "./components/deposit-form/deposit-form.component";
import { CompoundInterestChartComponent } from "./components/compound-interest-chart/compound-interest-chart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DepositFormComponent, CompoundInterestChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
