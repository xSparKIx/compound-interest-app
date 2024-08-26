/**
 * Интерфейс элемента выпадающего списка "Период начисления процентов"
 */
interface PercentFrequencyItem {
  readonly label: string;
  readonly value: number;
}

/**
 * Тип списка периодов начисления процентов
 */
export type PercentFrequencyItemList = [
  PercentFrequencyItem,
  PercentFrequencyItem,
  PercentFrequencyItem,
  PercentFrequencyItem,
];