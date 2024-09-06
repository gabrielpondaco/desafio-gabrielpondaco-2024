import Animal from "./animal.js";
import Recinto from "./recinto.js"
class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        let recintos = [];
        let recintosQtd = [];
        let tamanhoTotal = verificaTamanho(animal, quantidade);
        if (!verificaAnimal(animal)) {
            return {
                erro: "Animal inválido"
            }
        }
        recintos = verificaRecinto(animal);
        if (!recintos) {
            return {
                erro: "Não há recinto viável"
            }
        }
        recintosQtd = verificaQuantidade(animal, recintos, quantidade);
        if (recintosQtd.length == 0) {
            return {
                erro: "Quantidade Inválida"
            }
        }

        return {
            recintosViaveis: formataString(recintosQtd, tamanhoTotal)
        }
    }

}

function formataString(recintosQtd, tamanhoTotal) {
    let resposta = [];
    for (let recinto of recintosQtd) {
        resposta.push(`Recinto ${recinto._numero} (espaço livre: ${recinto._tamanho - tamanhoTotal} total: ${recinto._tamanho})`)
    }
    return resposta;
}

function verificaAnimal(especieAnimal) {
    for (let animal of animais) {
        if (animal._especie == especieAnimal.toLowerCase()) return true
    }
    return false;
}

function verificaRecinto(animal) {
    let possiveisRecintos = [];
    let possiveisRecintos2 = [];
    let isCarnivoro = verificaCarnivoro(animal);
    if (isCarnivoro) {
        for (let recinto of recintos) {
            if (recinto._animaisExistentes == "vazio" || recinto._animaisExistentes.includes(animal)) {
                possiveisRecintos.push(recinto);
            }
        }
    } else {
        for (let recinto of recintos) {
            if (!recinto._animaisExistentes.includes("leao") && 
            !recinto._animaisExistentes.includes("leopardo") && 
            !recinto._animaisExistentes.includes("crocodilo")) {
                possiveisRecintos.push(recinto);
            }
        }
    }
    console.log(possiveisRecintos);
    
    for (let recinto of possiveisRecintos) {
        if (verificaBioma(animal, recinto._bioma)) {
            possiveisRecintos2.push(recinto);
        }
    }
    console.log(possiveisRecintos2);
    if (possiveisRecintos2.length > 0) {
        return possiveisRecintos2;
    }
    return false;
    
}

function verificaBioma(especieAnimal, bioma) {
        for (let animal of animais) {
            const biomaAnimal = animal._bioma.split(/\s+/);
            const biomaRecinto = bioma.split(/\s+/);
            const contemBioma = biomaRecinto.some(bio => biomaAnimal.includes(bio))
            if (contemBioma && animal._especie.includes(especieAnimal)) return true;
        }
        return false;
    
}

function verificaCarnivoro(especieAnimal) {
    for (let animal of animais) {
        if (animal._especie == especieAnimal) {
            if (animal.isCarnivoro()) return true;
        }
    }
    return false;
}

function verificaTamanho(especieAnimal) {
    for (let animal of animais) {
        if (animal._especie == especieAnimal) return animal._tamanho;
    }
}

function verificaQuantidade(animal, recintos, tamanhoTotal) {
    let recintosValidos = [];
    let quantidadeAnimal = verificaTamanho(animal) * tamanhoTotal;
    for (let recinto of recintos) {
        if (recinto._tamanho >= quantidadeAnimal) recintosValidos.push(recinto);
    }
    return recintosValidos;
}


const leao = new Animal("leao", 3, "savana");
const leopardo = new Animal("leopardo", 2, "savana");
const crocodilo = new Animal("crocodilo", 3, "rio");
const macaco = new Animal("macaco", 1, "savana ou floresta");
const gazela = new Animal("gazela", 2, "savana");
const hipopotamo = new Animal("hipopotamo", 4, "savana ou rio");
const animais = [leao, leopardo, crocodilo, macaco, gazela, hipopotamo];

const recinto1 = new Recinto(1, 'savana', 10, '3 macacos');
const recinto2 = new Recinto(2, 'floresta', 5, 'vazio');
const recinto3 = new Recinto(3, 'savana e rio', 7, '1 gazela');
const recinto4 = new Recinto(4, 'rio', 8, 'vazio');
const recinto5 = new Recinto(5, 'savana', 9, '1 leao');
const recintos = [recinto1, recinto2, recinto3, recinto4, recinto5];

const recintosZoo = new RecintosZoo();
console.log(recintosZoo.analisaRecintos("macaco", 1));

export { RecintosZoo as RecintosZoo };
