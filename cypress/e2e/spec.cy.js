const url = 'http://127.0.0.1:8080';
const cuadros = 16;

context ("Memotest", () => {

  beforeEach( () => {
    cy.visit(url);
  });

  it("Verifica tablero.", () => {
    cy.get("#tablero").find(".color").should("have.length", cuadros).each((cuadro) => {
      cy.wrap(cuadro).should("have.css", "background-color", "rgb(255, 255, 255)").and("have.class", "color");
    });
  });

  it("Verifica inicio del juego.", () => {
    cy.get("#empezar").click();
  
    cy.get("#tablero .color").each((cuadro) => {
      cy.wrap(cuadro).should("not.have.css", "background-color", "rgb(255, 255, 255)");
    });
  
    cy.wait(750);

    cy.get("#tablero .color").each((cuadro) => {
      cy.wrap(cuadro).should("have.css", "background-color", "rgb(255, 255, 255)");
    });
  });

  it("Detecta pares correctamente.", () => {
    cy.get("#empezar").click();
    cy.wait(750);

    const colorMap = {};
    cy.get("#tablero .color").each((cuadro, index) => {
      const id = cuadro[0].id;
      if (!colorMap[id]) {
        colorMap[id] = [];
      }
      colorMap[id].push(index);
    });
  
    cy.wrap(null).then(() => {
      for (const color in colorMap) {
        const [firstIndex, secondIndex] = colorMap[color];
        cy.get("#tablero .color").eq(firstIndex).click();
        cy.get("#tablero .color").eq(secondIndex).click();
        cy.wait(500);
      }
    });
  
    cy.on('window:alert', (str) => {
      expect(str).to.include('¡Felicidades! Has encontrado todos los pares');
    });
  });

  it("Reset.", () => {
    cy.get("#empezar").click();
    cy.wait(750);
  
    cy.get("#resetear").click();
  
    cy.get("#intentos").should("contain", "Intentos: 0");
  
    cy.get("#tablero .color").each((cuadro) => {
      cy.wrap(cuadro)
        .should("have.css", "background-color", "rgb(255, 255, 255)");
    });
  });
  
})
