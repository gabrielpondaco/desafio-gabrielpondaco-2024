export default class Animal {
  constructor(especie, tamanho, bioma) {
    this._especie = especie;
    this._tamanho = tamanho;
    this._bioma = bioma;
  }

  isCarnivoro() {
    if (this._especie.includes("leao") || this._especie.includes("crocodilo") || this._especie.includes("leopardo") )
      return true;
    return false;
  }
}