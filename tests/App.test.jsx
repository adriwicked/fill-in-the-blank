import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { act } from "react-dom/test-utils";

describe("GIVEN home page", () => {
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

  test("THEN it should have title", async () => {
    render(<App />);

    const title = await screen.findByRole("heading", {
      name: "fill in the blank",
    });

    expect(title).toBeInTheDocument();
  });

  test("THEN it should have a sentence", async () => {
    render(<App />);

    const sentenceParagraph = await screen.findByText("Steve is ill.");

    expect(sentenceParagraph).toBeInTheDocument();
  });

  test("THEN first input has focus", async () => {
    render(<App />);

    expect(await screen.findByRole("textbox")).toHaveFocus();
  });

  describe("WHEN entering correct guess", () => {
    test("THEN it should have a correct message", async () => {
      render(<App />);
      const user = userEvent.setup();
      const guessInput = await screen.findByRole("textbox");
      const guessButton = await screen.findByRole("button", { name: "guess" });

      expect(
        await screen.queryByRole("img", { name: "correct" })
      ).not.toBeInTheDocument();

      await act(async () => {
        await user.type(guessInput, "He is");
        await user.click(guessButton);
      });

      expect(
        await screen.findByRole("img", { name: "correct" })
      ).toBeInTheDocument();
    });

    test("THEN it is not case sensistive", async () => {
      render(<App />);
      const user = userEvent.setup();
      const guessInput = await screen.findByRole("textbox");
      const guessButton = await screen.findByRole("button", { name: "guess" });

      expect(
        await screen.queryByRole("img", { name: "correct" })
      ).not.toBeInTheDocument();

      await act(async () => {
        await user.type(guessInput, "HE IS");
        await user.click(guessButton);
      });

      expect(
        await screen.findByRole("img", { name: "correct" })
      ).toBeInTheDocument();
    });

    test("THEN it should change to next sentence", async () => {
      render(<App />);
      const user = userEvent.setup();
      const guessInput = await screen.findByRole("textbox");
      const guessButton = await screen.findByRole("button", { name: "guess" });

      expect(await screen.queryByText("Steve is ill.")).toBeInTheDocument();

      await user.type(guessInput, "He is");
      await user.click(guessButton);

      expect(
        await screen.queryByText("I'm not hungry, but")
      ).toBeInTheDocument();
    });

    test("THEN it should empty the input", async () => {
      render(<App />);
      const user = userEvent.setup();
      const guessInput = await screen.findByRole("textbox");
      const guessButton = await screen.findByRole("button", { name: "guess" });

      await user.type(guessInput, "He is");
      await user.click(guessButton);

      expect(guessInput).toHaveValue("");
    });
  });

  describe("WHEN entering incorrect guess", () => {
    test("THEN it should have an incorrect message", async () => {
      render(<App />);
      const user = userEvent.setup();
      const guessInput = await screen.findByRole("textbox");
      const guessButton = await screen.findByRole("button", { name: "guess" });

      expect(
        await screen.queryByRole("img", { name: "incorrect" })
      ).not.toBeInTheDocument();

      await act(async () => {
        await user.type(guessInput, "I am");
        await user.click(guessButton);
      });

      expect(
        await screen.findByRole("img", { name: "incorrect" })
      ).toBeInTheDocument();
    });
  });
});
