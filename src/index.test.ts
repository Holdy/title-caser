import { TitleCaser as sut } from './index';

test('Mc style prefixes', () => {
    basic_test('mcdonalds', 'McDonalds');
});

test('Apostrophies should be left in place', () => {
    basic_test(`mcdonald's`, `McDonald's`);
    basic_test(`mactrove`, `MacTrove`);
});

test('Empty strings are handled sensibly', () => {
    basic_test(``, ``);
});

test('Commas make it into the output', () => {
    basic_test(`me, myself and i`, `Me, Myself and I`);
});

test('Ampersand expansion - B&Q', () => {
    basic_test('b&Q', 'B & Q');
});

test('Non capitalised words', () => {
    basic_test('PreT A mangEr', 'Pret a Manger');
});

test('First word always capital', () => {
    basic_test('the cat in the hat', 'The Cat in the Hat');
    basic_test('a fish in a barrel', 'A Fish in a Barrel');
});

test('Spaces should be handled correctly', () => {
    basic_test('   the    others   ', 'The Others');
});

function basic_test(input:string, expected_output:string) {
    const output = sut.process(input);
    expect(output).toBe(expected_output);

    const double_encoded = sut.process(output);
    expect(double_encoded).toBe(expected_output);
}
