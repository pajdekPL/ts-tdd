interface FizzBuzz {
  go(number: number): string;
  calculatePrimes(maxNum: number): Set<number>;
}

export function createFizzBuzz(): FizzBuzz {
  return {
    go(number: number): string {
      const primes = this.calculatePrimes(number);
      if (number === 3) return "FizzWhiz";
      if (number === 5) return "BuzzWhiz";
      if (primes.has(number)) return "Whiz";
      if (number % 15 === 0) return "FizzBuzz";
      if (number % 5 === 0) return "Buzz";
      if (number % 3 === 0) return "Fizz";
      return String(number);
    },
    calculatePrimes(maxNum: number): Set<number> {
      // Sieve of Eratosthenes
      maxNum += 1;
      const primesChecker = new Array(maxNum).fill(true);
      let primes: Set<number> = new Set();
      for (let i = 2; i < maxNum; i++) {
        // primesChecker can be checked only to Math.sqrt(maxNum), but then we will have to use primesChecker.forEach to get all primes.
        if (primesChecker[i]) {
          primes.add(i);
          let j = i * i;
          while (j <= maxNum) {
            primesChecker[j] = false;
            j = j + i;
          }
        }
      }
      return primes;
    },
  };
}
