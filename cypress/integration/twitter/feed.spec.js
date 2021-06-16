/// <reference types="cypress" />

/*
  3 partes importantes em cada nome do teste
    1. o que está sendo testado
    2. sub que circunstâncias, condições?
    3. qual o resultado esperado
*/

/*
  O que fazer quando um serviço externo (não relacionado) está fora?
    1. pedir para corrigir
    2. isolar este serviço do fluxo de teste (quando possivel)

  Uma alternativa usando um recurso chamado: cy.intercept
*/

describe("Twitter Clone", () => {
  context("Feed", () => {
    it("Quando estiver autenticado, devo visualizar o meu navegável", () => {
      cy.intercept(
        {
          // mapeamento da rota ou requisição
          method: "GET",
          hostname: "res.cloudinary.com",
        },
        {
          // resposta que eu quero simular
          statusCode: 200,
          fixture: "meme",
        },
      );

      cy.visit("https://twitter-clone-example.herokuapp.com/");

      cy.get("input[type=email]").type("qweqwer@mail.com");
      cy.get("input[type=password]").type("123456");

      cy.contains("button[type=submit]", "Login").click();

      cy.get("nav ul li")
        .should("be.visible")
        .and("have.length", 6)

        .each(($el, index, $list) => {
          let options = [
            "Home",
            "Explore",
            "Notifications",
            "Bookmarks",
            "Profile",
            "More",
          ];
 
          cy.log(index);

          cy.get($el).find("span").should("have.text", options[index]);
        });
    });
  });
});
