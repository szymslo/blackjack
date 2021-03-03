import crupierAI from "./crupierAI";

test('crupier thinks propely', () => {
    expect(
        crupierAI(17)
        ).toBe(false)
})