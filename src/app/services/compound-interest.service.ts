/**
 * Сервис рассчета сложных процентов
 */
export class CompoundInterestService {
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
   * @static
   * @returns Рассчитанный по формуле сложный процент
   * @todo Добавить побитовый вариант (возможно с bigint) и сравнить их
   * @todo Поправить тут валидацию либо убрать совсем
   */
  public static calcCompoundInterest(p: number, r: number, t: number): number {
    return p * (1 + r/100 * t);
  }

  /**
   * Метод рассчета сложного процента без реинвестирования по годам.
   * @description Рассчитывает сложный процент за каждый год по формуле: A = P × (1 + r/100), где:
   * - A - итоговая сумма за год
   * - P - итоговая сумма за предыдущий год
   * - r - годовая процентная ставка
   * @param p Начальная сумма вложений
   * @param r Годовая процентная ставка
   * @param t Cрок инвестиций в годах
   * @static
   * @returns Массив рассчитанных по формуле сложных процентов за каждый год.
   * @todo Добавить побитовый вариант (возможно с bigint) и сравнить их
   * @todo Поправить тут валидацию либо убрать совсем
   */
  public static calcCompoundInterestByYears(p: number, r: number, t: number): number[] {
    const percent = 1 + r/100;
    const result: number[] = [];
    let amount = p;

    for (let i = 0; i < t; i++) {
      amount = amount * percent;
      result.push(amount);
    }

    return result;
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
   * @static
   * @returns Рассчитанный по формуле сложный процент
   * @todo Добавить побитовый вариант (возможно с bigint) и сравнить их
   * @todo Поправить тут валидацию либо убрать совсем
   */
  public static calcCIWithReinvest(p: number, r: number, n: number, t: number): number {
    if (!n) {
      throw new Error('Обязательный параметр "количество периодов" пустой');
    }

    return p * (1 + (r/100)/n) ** (n*t);
  }

  /**
   * Метод рассчета сложного процента с реинвестированием по годам.
   * @description Рассчитывает сложный процент за каждый год с учетом реинвестирования по формуле: A = P × (1 + (r/100)/n)^n, где:
   * - A - итоговая сумма за год
   * - P - итоговая сумма за предыдущий год
   * - r - годовая процентная ставка
   * - n - количество периодов начисления процентов в год (напр. при ежемесячном начислении процентов количество таких периодов будет 12)
   * @param p Начальная сумма вложений
   * @param r Годовая процентная ставка
   * @param n Количество периодов начисления процентов в год
   * @param t Срок инвестиций в годах
   * @returns Массив рассчитанных по формуле сложных процентов с учетом реинвестирования за каждый год.
   */
  public static calcCIWithReinvestByYears(p: number, r: number, n: number, t: number): number[] {
    if (!n) {
      throw new Error('Обязательный параметр "количество периодов" пустой');
    }

    const percent = (1 + (r/100)/n)**n;
    const result: number[] = [];
    let amount = p;

    for (let i = 0; i < t; i++) {
      amount = amount * percent;
      result.push(amount);
    }

    return result;
  }
}
