import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    test('Deve considerar um espaço extra ao habitar espécies diferentes (macacos, e gazelas)', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 3);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 1 total: 7)');
    });

    test('Deve encontrar recintos para 1 hipopotamo', () => {
        const resultado = new RecintosZoo().analisaRecintos('hipoPOtaMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 4 (espaço livre: 4 total: 8)');
    });

    test('Deve permitir que hipopotamos só tolerem outras especies em biomas de savana e rio (recinto 3) e não apenas savana (recinto 1)', () => {
        const resultado = new RecintosZoo().analisaRecintos('hipopotamo', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).not.toContain('Recinto 1');
        expect(resultado.recintosViaveis[0]).toContain('Recinto 3');
    });

    test('Deve verificar que um macaco não pode estar sozinho em um recinto', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO',1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[1]).not.toContain('Recinto 2');
        expect(resultado.recintosViaveis[0]).toContain('Recinto 1 (espaço livre:');
        expect(resultado.recintosViaveis[1]).toContain('Recinto 3 (espaço livre:');
    });

    test('Deve rejeitar a adição de leopardos pois não há recinto viável', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEOPARDO', 2);
        expect(resultado.erro).toBe('Não há recinto viável');
    });

    test('Deve permitir a adição de crocodilos apenas no recinto 4 pois está vazio', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toContain('Recinto 4');
    });

    test('Deve permitir a adição de leões apenas em recintos apropriados', () => {
        const resultado = new RecintosZoo().analisaRecintos('LEAO', 2);
        expect(resultado.recintosViaveis[0]).not.toContain('Recinto 1');
        expect(resultado.recintosViaveis[0]).toBe('Recinto 5 (espaço livre: 0 total: 9)');
    });

    test('Deve permitir a adição de gazelas em recintos apropriados', () => {
        const resultado = new RecintosZoo().analisaRecintos('gazela', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 2 total: 10)')
        expect(resultado.recintosViaveis[1]).toBe('Recinto 3 (espaço livre: 1 total: 7)')
    })
});

