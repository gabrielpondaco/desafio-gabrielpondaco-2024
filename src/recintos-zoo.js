import Animal from "./animal.js";
import Recinto from "./recinto.js"
class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) {
            return {
                erro: "Quantidade inválida"
            }
        }
        animal = animal.toLowerCase();
        if (!verificaAnimal(animal)) {
            return {
                erro: "Animal inválido"
            }
        }
        
        const tamanhoTotal = verificaTamanho(animal, quantidade) * quantidade;
        const recintosViaveis = verificaRecinto(animal);
        const recintosQtd = verificaQuantidade(recintosViaveis, tamanhoTotal);
        atualizaEspacoLivre(recintosQtd, animal);
        
        const resposta = formataString(recintosQtd, tamanhoTotal);
        return resposta.length > 0 
        ? { recintosViaveis: resposta }
        : { erro: "Não há recinto viável" }
        
    }

}

function formataString(recintosQtd, tamanhoTotal) {
    return recintosQtd
            .filter(recinto => recinto._espacoLivre - tamanhoTotal >= 0)
            .map(recinto => `Recinto ${recinto._numero} (espaço livre: ${recinto._espacoLivre - tamanhoTotal} total: ${recinto._tamanho})`)
}

function atualizaEspacoLivre(recintosQtd, animal) {
    recintosQtd.forEach(recinto => {
        if (recinto._animaisExistentes.includes("vazio")) {
            recinto._espacoLivre = recinto._tamanho;
        } else {
            const animaisExistentes = recinto._animaisExistentes.split(/\s+/);
            const tamanhoAnimalExistente = verificaTamanho(animaisExistentes[1]) * animaisExistentes[0];
            recinto._espacoLivre = recinto._tamanho - tamanhoAnimalExistente;
            if (!animaisExistentes[1].includes(animal)) {
                recinto._espacoLivre -= 1;
            }
        }
    })
}

function verificaAnimal(especieAnimal) {
    return animais.some(animal => animal._especie === especieAnimal.toLowerCase());
}

function verificaRecinto(animal) {
    const isCarnivoro = verificaCarnivoro(animal);
    const recintosViaveis = recintos.filter(recinto => {
        const animaisExistentes = recinto._animaisExistentes;
        let podeAcomodar;

        if (animal.includes("hipopotamo")) {
            podeAcomodar = recinto._bioma.includes('savana e rio') || animaisExistentes === "vazio";
        } else if (isCarnivoro) {
            podeAcomodar = animaisExistentes === "vazio" || animaisExistentes.includes(animal);
        } else {
            podeAcomodar = !["leao", "leopardo", "crocodilo"].some(especie => animaisExistentes.includes(especie))
        }

        const temBiomaAdequado = verificaBioma(animal, recinto._bioma);

        return podeAcomodar && temBiomaAdequado;
    });

    return recintosViaveis.length > 0 ? recintosViaveis : false;
}

function verificaBioma(especieAnimal, bioma) {
    return animais.some(animal => {
        const biomaAnimal = animal._bioma.split(/\s+/);
        const biomaRecinto = bioma.split(/\s+/);
        const contemBioma = biomaRecinto.some(bio => biomaAnimal.includes(bio));
        return contemBioma && animal._especie === especieAnimal;
    });
}

function verificaCarnivoro(especieAnimal) {
    return animais.some(animal => 
        animal._especie === especieAnimal && animal.isCarnivoro()
    );
}

function verificaTamanho(especieAnimal) {
    for (let animal of animais) {
        if (especieAnimal.includes(animal._especie)) return animal._tamanho;
    }
}

function verificaQuantidade(recintos, tamanhoTotal) {
    return recintos.filter(recinto => recinto._tamanho >= tamanhoTotal);
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

export { RecintosZoo as RecintosZoo };
