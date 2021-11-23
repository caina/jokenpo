import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {Game} from "./game";
import {data_testIds} from "./game";
import {Jokenpo} from "./dto";

const server = setupServer(
    rest.post('/bet', (req, res, ctx) => {
        return res(ctx.json({win: false, winner: 'paper'}))
    }),
    rest.post('/api/bet/auto', (req, res, ctx) => {
        return res(ctx.json([
            {
                player: "conn",
                move: 'paper',
                win: false
            },
            {
                player: "conn",
                move: 'scissor',
                win: true
            }
        ]))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("Should bet on paper", async () => {
    const {getByTestId, getByText} = render(<Game/>)

    fireEvent.click(getByTestId(data_testIds.paper))
    await waitFor(() => getByText("VS"))

    expect(getByText("You win!")).toBeInTheDocument()
})