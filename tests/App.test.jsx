import { render, screen } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

describe("GIVEN home page", () => {
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

  describe("WHEN entering correct guess", () => {
    test("THEN it should have a correct message", async () => {
      render(<App />);
      const user = userEvent.setup();

      expect(await screen.queryByText("Correct!")).not.toBeInTheDocument();

      const guessInput = await screen.findByRole("textbox");
      await user.type(guessInput, "He is");

      const guessButton = await screen.findByRole("button", { name: "guess" });
      await user.click(guessButton);

      expect(await screen.findByText("Correct!")).toBeInTheDocument();
    });

    test("THEN it should change to next sentence", async () => {
      render(<App />);
      const user = userEvent.setup();
      const guessInput = await screen.findByRole("textbox");
      const guessButton = await screen.findByRole("button", { name: "guess" });

      await user.type(guessInput, "He is");
      await user.click(guessButton);

      expect(await screen.queryByText("Steve is ill.")).not.toBeInTheDocument();
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

      expect(await screen.queryByText("Incorrect :(")).not.toBeInTheDocument();

      const guessInput = await screen.findByRole("textbox");
      await user.type(guessInput, "I am");

      const guessButton = await screen.findByRole("button", { name: "guess" });
      await user.click(guessButton);

      expect(await screen.findByText("Incorrect :(")).toBeInTheDocument();
    });
  });
});
