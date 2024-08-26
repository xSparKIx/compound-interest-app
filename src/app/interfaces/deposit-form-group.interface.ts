import { FormControl } from "@angular/forms";

/**
 * Интерфейс группы формы ввода информации о вкладе
 */
export default interface DepositFormGroup {
  amount: FormControl<number>;
  time: FormControl<number>;
  percent: FormControl<number>;
  reinvest: FormControl<boolean>;
  percentFrequency: FormControl<number>;
}