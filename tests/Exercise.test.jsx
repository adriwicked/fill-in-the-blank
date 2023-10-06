import { render, screen } from "@testing-library/react";
import Exercise from "../src/components/Exercise";

describe("GIVEN Exercise component", () => {
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
});
