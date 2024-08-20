import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CompoundInterestService } from '../../services/compound-interest.service';

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
      amount: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      time: new FormControl<number>(0, {
        nonNullable: true,
        validators:  [Validators.required, Validators.min(1)],
      }),
      percent: new FormControl<number>(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1), Validators.max(100)],
      }),
      reinvest: new FormControl<boolean>(false, {
        nonNullable: true,
        validators: Validators.required,
      }),
      percentFrequency: new FormControl<number>(12, {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
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

      console.log(CompoundInterestService.calcCIWithReinvest(amount, percent, percentFrequency, time));
    } else {
      console.log(CompoundInterestService.calcCompoundInterest(amount, percent, time));
    }
  }
}
