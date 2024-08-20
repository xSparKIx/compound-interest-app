import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

/**
 * Интерфейс группы формы ввода информации о вкладе
 */
interface DepositFormGroup {
  amount: FormControl<number>;
  time: FormControl<number>;
  percent: FormControl<number>;
  reinvest: FormControl<boolean>;
  percentFrequency: FormControl<number>;
}

/**
 * Элемент выпадающего списка "Период начисления процентов"
 */
interface PercentFrequencyItem {
  readonly label: string;
  readonly value: number;
}

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
    DropdownModule,
  ],
  templateUrl: './deposit-form.component.html',
  styleUrl: './deposit-form.component.scss',
})
export class DepositFormComponent {
  /**
   * Форма ввода информации о вкладе
   * @readonly
   */
  public readonly form: FormGroup<DepositFormGroup>;

  /**
   * Период начисления процентов
   * @readonly
   */
  public readonly percentFrequency: PercentFrequencyItem[] = [
    {
      label: 'Каждый месяц',
      value: 12,
    },
    {
      label: 'Каждый квартал',
      value: 4,
    },
    {
      label: 'Каждое полугодие',
      value: 2,
    },
    {
      label: 'Каждый год',
      value: 1,
    },
  ];

  public constructor() {
    this.form = new FormGroup({
      amount: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      time: new FormControl(0, {
        nonNullable: true,
        validators:  [Validators.required, Validators.min(1)],
      }),
      percent: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.max(100)],
      }),
      reinvest: new FormControl(false, {
        nonNullable: true,
        validators: Validators.required,
      }),
      percentFrequency: new FormControl(12, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
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
   * @todo Добавить побитовый вариант и сравнить их
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
   * @todo Добавить побитовый вариант и сравнить их
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
    const { amount, time, percent, reinvest, percentFrequency } = this.form.value;

    if (!amount) {
      throw new Error('Передан пустой параметр "Начальная сумма вложений".')
    }

    if (!percent) {
      throw new Error('Передан пустой параметр "Годовая процентная ставка".')
    }

    if (!time) {
      throw new Error('Передан пустой параметр "Срок инвестиций в годах".')
    }

    if (reinvest) {
      if (!percentFrequency) {
        throw new Error('Передан пустой параметр "Количество периодов начисления процентов в год".')
      }

      console.log(DepositFormComponent.calcCIWithReinvest(amount, percent, percentFrequency, time));
    } else {
      console.log(DepositFormComponent.calcCompoundInterest(amount, percent, time));
    }
  }
}
