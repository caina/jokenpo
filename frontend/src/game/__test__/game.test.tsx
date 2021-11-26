import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { getByAltText } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Game } from "../game";
import { data_testIds } from "../game";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const server = setupServer(
  rest.post("/api/bet/auto", (req, res, ctx) => {
    return res(ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Should bet on paper", async () => {
  server.use(
    rest.post("/api/bet", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            isConn: false,
            move: "PAPER",
            win: true,
          },
          {
            isConn: true,
            move: "ROCK",
            win: false,
          },
        ])
      );
    })
  );

  jest.useFakeTimers();
  const { getByTestId, getByText, getByAltText } = render(<Game />);

  jest.runAllTimers();
  fireEvent.click(getByTestId(data_testIds.paper));

  await waitFor(() => getByText("You win!"));

  expect(getByText("You win!")).toBeInTheDocument();
  expect(getByText("Player")).toBeInTheDocument();
  expect(getByText("Robot")).toBeInTheDocument();
  expect(getByAltText("card_figure_PAPER")).toBeInTheDocument();
  expect(getByAltText("card_figure_ROCK")).toBeInTheDocument();
});

test("should lose", async () => {
  server.use(
    rest.post("/api/bet", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            isConn: false,
            move: "SCISSOR",
            win: false,
          },
          {
            isConn: true,
            move: "ROCK",
            win: true,
          },
        ])
      );
    })
  );

  jest.useFakeTimers();
  const { getByTestId, getByText, getByAltText } = render(<Game />);

  jest.runAllTimers();
  fireEvent.click(getByTestId(data_testIds.rock));

  await waitFor(() => getByText("You lose!"));

  expect(getByText("You lose!")).toBeInTheDocument();
  expect(getByText("Player")).toBeInTheDocument();
  expect(getByText("Robot")).toBeInTheDocument();
  expect(getByAltText("card_figure_SCISSOR")).toBeInTheDocument();
  expect(getByAltText("card_figure_ROCK")).toBeInTheDocument();
});

test("should be a tie", async () => {
  server.use(
    rest.post("/api/bet", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            isConn: false,
            move: "ROCK",
            win: false,
          },
          {
            isConn: true,
            move: "ROCK",
            win: false,
          },
        ])
      );
    })
  );

  jest.useFakeTimers();
  const { getByTestId, getByText } = render(<Game />);

  jest.runAllTimers();
  fireEvent.click(getByTestId(data_testIds.rock));

  await waitFor(() => getByText("Its a tie!"));

  expect(getByText("Its a tie!")).toBeInTheDocument();
});

test("should be a robot match", async () => {
  server.use(
    rest.post("/api/bet/auto", (req, res, ctx) => {
      return res(
        ctx.json([
          {
            isConn: true,
            move: "PAPER",
            win: true,
          },
          {
            isConn: true,
            move: "ROCK",
            win: false,
          },
        ])
      );
    })
  );

  jest.useFakeTimers();
  const { getByTestId, getByText, queryAllByText } = render(<Game />);

  jest.runAllTimers();
  fireEvent.click(getByTestId(data_testIds.autoPlay));

  await waitFor(() => getByText("House always win"));

  expect(getByText("House always win")).toBeInTheDocument();
  expect(queryAllByText("Robot")).toHaveLength(2);
});
