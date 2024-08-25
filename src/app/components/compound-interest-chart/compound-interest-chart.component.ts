import { Component, Input } from '@angular/core';
import { ChartModule, UIChart } from 'primeng/chart';

@Component({
  selector: 'app-compound-interest-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './compound-interest-chart.component.html',
  styleUrl: './compound-interest-chart.component.scss'
})
export class CompoundInterestChartComponent {
  /**
   * Сеттер сложных процентов.
   * @description Подготавливает данные графика по переданному массиву сложных процентов по годам.
   */
  @Input()
  public set compoundInterest(compoundInterest: number[]) {
    this.basicData = CompoundInterestChartComponent.getChartData(compoundInterest);
  }

  /**
   * Данные графика
   */
  public basicData: UIChart['data'];

  /**
   * Текущий год
   * @description Используется для рассчета лэйблов графика
   * @private
   * @static
   * @readonly
   */
  private static readonly currentYear: number = new Date().getFullYear();

  /**
   * Метод подготовки данных графика
   * @private
   * @static
   * @returns Данные графика
   */
  private static getChartData(compoundInterest: number[]): UIChart['data'] {
    if (!compoundInterest?.length) {
      return {};
    }

    const labels: number[] = [];

    for (let i = 0, length = compoundInterest.length; i < length; i++) {
      labels.push(this.currentYear + i);
    }

    return {
      labels,
      datasets: [
        {
          label: 'Общая сумма',
          data: compoundInterest,
        },
      ],
    };
  }
}
