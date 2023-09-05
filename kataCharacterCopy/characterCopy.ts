export interface Source {
  readChar(): string;
}
export interface Destination {
  writeChar(char: string): void;
}
export interface CopierInt {
  src: Source;
  dest: Destination;
  copy(): void;
}
export class Copier {
  constructor(private source: Source, private destination: Destination) {}
  copy() {
    let charToWrite = this.source.readChar();
    while (charToWrite !== "\n") {
      this.destination.writeChar(charToWrite);
      charToWrite = this.source.readChar();
    }
  }
}
