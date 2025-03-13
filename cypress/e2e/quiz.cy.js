describe("Application loads successfully", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("should display the homepage", () => {
    cy.get("button").contains("Start Quiz").should("be.visible");
  });
});

describe('Quiz starts successfully when "Start Quiz" button is pressed', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it('should start the quiz when the "Start Quiz" button is pressed', () => {
    cy.get("button").contains("Start Quiz").click();
    cy.get("h2").should("be.visible").and("not.be.empty");
    cy.get(".btn-primary").should("have.length.at.least", 1).and("be.visible");
    cy.get(".alert-secondary")
      .should("have.length.at.least", 1)
      .and("not.be.empty");
  });

  it("should select the answer that is clicked before moving onto the next question", () => {
    cy.get("button").contains("Start Quiz").click();
    cy.get(".btn-primary").first().click();
    cy.get("h2").should("not.contain", "Quiz Completed");
  });
});

describe("Answering questions in the quiz", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
    cy.get("button").contains("Start Quiz").click();
  });

  it("should progress to the next question when an answer is selected", () => {
    let previousQuestion = "";

    for (let i = 0; i < 10; i++) {
      cy.get("h2").then(($question) => {
        const currentQuestion = $question.text();
        if (i > 0) {
          expect(currentQuestion).not.to.equal(previousQuestion);
        }
        previousQuestion = currentQuestion;
      });
      cy.get(".btn-primary").first().click();
    }
  });

  it('should show "Quiz Completed" after all questions are answered', () => {
    let questionCount = 0;

    for (let i = 0; i < 10; i++) {
      cy.get("h2").then(($question) => {
        const currentQuestion = $question.text();
        cy.get(".btn-primary").first().click();
        questionCount++;

        if (questionCount === 10) {
          cy.get("h2").should("contain", "Quiz Completed");
        }
      });
    }
  });
});

describe("Restarting the quiz", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
    cy.get("button").contains("Start Quiz").click();
  });

  it('should restart the quiz when the "Take New Quiz" button is pressed', () => {
    // Answer all 10 questions
    for (let i = 0; i < 10; i++) {
      cy.get("h2").then(($question) => {
        const currentQuestion = $question.text();
        cy.get(".btn-primary").first().click();
      });
    }

    // Ensure "Quiz Completed" message is shown
    cy.get("h2").should("contain", "Quiz Completed");

    // Click the "Take New Quiz" button
    cy.get("button").contains("Take New Quiz").click();

    // Verify that the quiz restarts
    cy.get("h2").should("not.contain", "Quiz Completed");
    cy.get("h2").should("be.visible").and("not.be.empty");
    cy.get(".btn-primary").should("have.length.at.least", 1).and("be.visible");
    cy.get(".alert-secondary")
      .should("have.length.at.least", 1)
      .and("not.be.empty");
  });
});
