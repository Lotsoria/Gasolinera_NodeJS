jest.mock('../../models/tipo_gasolinas', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    const tipoGasolinasMock = dbMock.define('tipo_gasolinas', {
        tipo: 'Gasolina A',
        costo: 2.50,
        createdAt: new Date(),
        updatedAt: null
    });
    return tipoGasolinasMock;
});

const tipoGasolinas = require('../../models/tipo_gasolinas'); // Importa el mock

describe('Pruebas del modelo tipo_gasolinas', () => {
    it('debería crear un registro', async () => {
        // Puedes utilizar el mock del modelo para simular la creación de un registro
        const nuevoRegistro = await tipoGasolinas.create({
            tipo: 'Gasolina B',
            costo: 3.00,
            createdAt: new Date(),
            updatedAt: null
        });
        // Realiza las aserciones según el resultado simulado
        expect(nuevoRegistro.tipo).toBe('Gasolina B');
        expect(nuevoRegistro.costo).toBe(3.00);
    });

    // Puedes agregar más pruebas relacionadas con el modelo aquí
});