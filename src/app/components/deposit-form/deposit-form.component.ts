import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

/**
 * Компонент формы ввода информации о вкладе
 */
@Component({
  selector: 'app-deposit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    CheckboxModule,
  ],
  templateUrl: './deposit-form.component.html',
  styleUrl: './deposit-form.component.scss',
})
export class DepositFormComponent {
  /**
   * Форма ввода информации о вкладе
   * @readonly
   */
  public readonly form: FormGroup;

  public constructor() {
    this.form = new FormGroup({
      amount: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
      time: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
      percent: new FormControl<number>(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      reinvest: new FormControl<boolean>(false),
    })
  }

  /**
   * Метод рассчета сложного процента без реинвестирования.
   * @description Рассчитывает сложный процент по формуле: A = P × (1 + r/100 × t), где:
   * - A - итоговая сумма
   * - P - начальная сумма
   * - r - годовая процентная ставка
   * - t - срок инвестиций в годах
   * @param p Начальная сумма вложений
   * @param r Годовая процентная ставка
   * @param t Cрок инвестиций в годах
   * @private
   * @static
   * @returns Рассчитанный по формуле сложный процент 
   */
  private static calcCompoundInterest(p: number, r: number, t: number): number {
    return p * (1 + r/100 * t);
  }

  /**
   * Метод рассчета сложного процента с реинвестированием.
   * @description Рассчитывает сложный процент с учетом реинвестирования по формуле: A = P × (1 + (r/100)/n)^nt, где:
   * - A - итоговая сумма
   * - P - начальная сумма
   * - r - годовая процентная ставка
   * - n - количество периодов начисления процентов в год (напр. при ежемесячном начислении процентов количество таких периодов будет 12)
   * - t - срок инвестиций в годах
   * @param p Начальная сумма вложений
   * @param r Годовая процентная ставка
   * @param n Количество периодов начисления процентов в год
   * @param t Срок инвестиций в годах
   * @private
   * @static
   * @returns Рассчитанный по формуле сложный процент 
   */
  private static calcCIWithReinvest(p: number, r: number, n: number, t: number): number {
    if (n === 0) {
      throw new Error('Обязательный параметр "количество периодов" равен 0');
    }

    return p * (1 + (r/100)/n) ** (n*t);
  }

  /**
   * Метод события отправки формы
   */
  public onFormSubmit(): void {
    const { amount, time, percent, reinvest } = this.form.value;
    
    if (reinvest) {
      console.log(DepositFormComponent.calcCIWithReinvest(amount, percent, 12, time));
    } else {
      console.log(DepositFormComponent.calcCompoundInterest(amount, percent, time));
    }
  }
}
