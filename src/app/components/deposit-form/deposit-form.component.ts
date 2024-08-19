import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

/**
 * Компонент формы ввода информации о вкладе
 */
@Component({
  selector: 'app-deposit-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputNumberModule, ButtonModule],
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
    })
  }

  /**
   * Метод события отправки формы
   */
  public onFormSubmit(): void {
    const { amount, time, percent } = this.form.value;
    console.log(amount, time, percent);
  }
}
