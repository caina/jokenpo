import {headlineText} from "../game";
import {Move} from "../dto";

test("define headline", function () {
    const text = headlineText([])
    expect(text).toEqual("Make your bet!")
})

test("headline for a tie", function () {
    const text = headlineText([new Move({win: false}), new Move({win: false})])
    expect(text).toEqual("Its a tie!")
})

test("headline for betting", function () {
    const text = headlineText([
        new Move({isConn: false}),
    ])
    expect(text).toEqual("Betting in progress")
})

test("headline for winner", function () {
    const text = headlineText([
        new Move({isConn: false, win: true}),
        new Move({isConn: true, win: false})
    ])
    expect(text).toEqual("You win!")
})

test("headline for losing", function () {
    const text = headlineText([
        new Move({isConn: false, win: false}),
        new Move({isConn: true, win: true})
    ])
    expect(text).toEqual("You lose!")
})

test("headline for bots playing", function () {
    const text = headlineText([
        new Move({isConn: true, win: false}),
        new Move({isConn: true, win: true})
    ])
    expect(text).toEqual("House always win")
})