import { Component, EventEmitter, Output } from '@angular/core';
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
 * Интерфейс элемента выпадающего списка "Период начисления процентов"
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
   * Эмиттер изменения сложного процента
   */
  @Output() private readonly ciChanged: EventEmitter<number> = new EventEmitter<number>();

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
   * @todo добавить сюда мемоизацию
   */
  public onFormSubmit(): void {
    const { amount, time, percent, reinvest, percentFrequency } = this.form.value;

    if (!amount) {
      throw new Error('Свойство "Начальная сумма вложений" пустое.')
    }

    if (!percent) {
      throw new Error('Свойство "Годовая процентная ставка" пустое.')
    }

    if (!time) {
      throw new Error('Свойство "Срок инвестиций в годах" пустое.')
    }

    if (reinvest) {
      if (!percentFrequency) {
        throw new Error('Свойство "Количество периодов начисления процентов в год" пустое.')
      }

      this.ciChanged.emit(CompoundInterestService.calcCIWithReinvest(amount, percent, percentFrequency, time));
    } else {
      this.ciChanged.emit(CompoundInterestService.calcCompoundInterest(amount, percent, time));
    }
  }
}
