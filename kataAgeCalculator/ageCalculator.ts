export function createAgeCalculator() {
  return {
    calculateAge(birthDate: Date, targetDate: Date): number {
      const fullYears = targetDate.getFullYear() - birthDate.getFullYear();
      if (!hasHadBirthday(birthDate, targetDate)) return fullYears - 1;
      return fullYears;
    },
    getBirthdayWeek(birthDate: Date, targetYear: number): string {
      birthDate.setFullYear(targetYear);
      if (birthDate.getDay() >= 4) {
        birthDate.setDate(birthDate.getDate() - birthDate.getDay());
        return birthDate.toDateString();
      }
      birthDate.setDate(birthDate.getDate() - 6);
      return birthDate.toDateString();
    },
  };
}

function hasHadBirthday(birthDate: Date, targetDate: Date): boolean {
  if (targetDate.getMonth() < birthDate.getMonth()) {
    return false;
  }
  if (targetDate.getMonth() === birthDate.getMonth()) {
    if (targetDate.getDate() < birthDate.getDate()) {
      return false;
    }
  }
  return true;
}
