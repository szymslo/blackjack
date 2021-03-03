import shuffleCards from "./shuffleCards"

test('proper deck id is returned', async () => {
    const ID = await shuffleCards();
    expect(ID).toHaveLength(12);
})