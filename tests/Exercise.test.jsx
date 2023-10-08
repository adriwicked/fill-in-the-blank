import { render, screen } from "@testing-library/react";
import Exercise from "../src/components/Exercise";
import userEvent from "@testing-library/user-event";

describe("GIVEN Exercise component", () => {
  beforeAll(() => {
    vi.mock("../src/services/sentences.js", async (importOriginal) => {
      const original = await importOriginal();
      return {
        ...original,
        getSentences: () => {
          return Promise.resolve([
            "Steve is ill. [He is] in bed.",
            "I'm not hungry, but [I am] thirsty.",
            "Mr Thomas is a very old man. [He is] 98.",
            "These chairs aren't beautiful, but [they are] comfortable.",
            "The weather is nice today. [It is] warm and sunny.",
          ]);
        },
      };
    });
  });
  describe("WHEN no sentence is passed", () => {
    test("THEN it shows loading message", () => {
      render(<Exercise />);

      const loadingMessage = screen.getByText("Loading...");
      expect(loadingMessage).toBeInTheDocument();
    });
  });

  describe("WHEN a valid sentence is passed", () => {
    test("THEN it does not show loading message", () => {
      const sentence = "Steve is ill. [He is] in bed.";
      render(<Exercise sentence={sentence} />);

      const loadingMessage = screen.queryByText("Loading...");
      expect(loadingMessage).not.toBeInTheDocument();
    });

    test("THEN it shows two paragraphs and one input", () => {
      const sentence = "Steve is ill. [He is] in bed.";
      render(<Exercise sentence={sentence} />);

      const firstParagraph = screen.getByText("Steve is ill.");
      expect(firstParagraph).toBeInTheDocument();

      const secondParagraph = screen.getByText("in bed.");
      expect(secondParagraph).toBeInTheDocument();

      const guessInput = screen.getByRole("textbox");
      expect(guessInput).toBeInTheDocument();
    });
  });

  describe("WHEN a sentence with two blanks is passed", () => {
    test("THEN Exercise can be completed", async () => {
      const sentence = "Steve is ill. [He has] a fever. [He is] in bed.";
      render(<Exercise sentence={sentence} onCorrectAnswer={() => null} />);
      const guessInputs = await screen.findAllByRole("textbox");
      const guessButton = await screen.findByRole("button", { name: "guess" });
      const user = userEvent.setup();

      expect(await screen.queryByText("Correct!")).not.toBeInTheDocument();

      await user.type(guessInputs[0], "He has");
      await user.type(guessInputs[1], "He is");
      await user.click(guessButton);

      expect(await screen.findByText("Correct!")).toBeInTheDocument();
    });
  });
});
