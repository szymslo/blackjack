import drawCards from "./drawCards"
import shuffleCards from "./shuffleCards"

test('cards are drawn propely', async () => {
    const ID = await shuffleCards();
    const cards = await drawCards(ID, 4);
    expect(cards).toEqual(expect.arrayContaining([
        expect.objectContaining({
            image: expect.any(String),
            value: expect.any(String),
            suit: expect.any(String),
            code: expect.any(String),})
        ])
    )
})