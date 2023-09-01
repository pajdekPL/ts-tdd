export class StringCalculator {
  public add(text: string): number {
    if (!text) return 0;
    let splitRegexp = new RegExp(`,|\n`);

    const customDelimiter = this.extractDelimiterIfExist(text);

    if (customDelimiter) {
      splitRegexp = this.createCustomDelimiterRegexp(customDelimiter);
      text = this.getTextWithoutDelimiterSection(text);
    }

    const numbers = text.split(splitRegexp).map((char) => +char);

    this.throwErrorIfNegativeNumbersArePresentInText(numbers);

    const sum = numbers
      .filter((char) => char <= 1000)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

    return sum;
  }

  public extractDelimiterIfExist(text: string): string {
    const matcher = text.match(/\/\/(.*)?\n/);
    if (matcher) {
      return matcher[1];
    }
    return "";
  }
  private getTextWithoutDelimiterSection(text: string): string {
    return text.slice(text.indexOf("\n") + 1);
  }

  private createCustomDelimiterRegexp(delimiter: string) {
    return new RegExp(`,|\n|${delimiter}`);
  }
  private throwErrorIfNegativeNumbersArePresentInText(
    numbers: Array<number>
  ): void | never {
    const negativeNumbers = numbers.filter((number) => number < 0);
    if (negativeNumbers.length !== 0) {
      throw Error(`negatives not allowed: ${negativeNumbers.join(",")}`);
    }
  }
}
