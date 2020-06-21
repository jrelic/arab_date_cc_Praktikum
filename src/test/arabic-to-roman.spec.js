var assert = require('assert');
var chai = require("chai");
var expect = chai.expect;
var should = chai.should;
const arabicToRoman = require("../arabic-to-roman");
/*
Koristeći TDD tehniku, isprogramirati aplikaciju koja pretvara arapske 
brojeve u rimske. U ovom zadatku ćemo učiti i tehnike i metodologije 
pisanja čistog koda

Primjer, za ulaz 1 -> vraća 'I'
Primjer 2, za ulaz 4 -> vraća 'IV'

Punu specifikaciju pogledajte na wikipediji https://en.wikipedia.org/wiki/Roman_numerals
*/
describe('arabic to roman converter', function() {
    it('arabicToRoman should be a function', function () {
        arabicToRoman(1);
    });
    stacking_by_I_tests();
    
    test_stacking_pattern({baseValue: 1, 
        baseRoman: "I", increaseRoman: "I"});

    it("4 -> 'IV'", function() {
        expect(arabicToRoman(4)).to.eq("IV"); 
    });

    it("9 -> 'IX'", function() {
        expect(arabicToRoman(9)).to.eq("IX"); 
    });

    it("20 -> 'XX'", function() {
        expect(arabicToRoman(20)).to.eq("XX"); 
    });

    it("40 -> 'XL'", function() {
        expect(arabicToRoman(40)).to.eq("XL"); 
    });

    // it("30 -> 'XX'", function() {
    //     expect(arabicToRoman(30)).to.eq("XXX"); 
    // });


});

function stacking_by_I_tests() {
    test_stacking_pattern({baseValue: 5, 
        baseRoman: "V", increaseRoman: "I"});

    test_stacking_pattern({baseValue: 10, 
        baseRoman: "X", increaseRoman: "I"});

    test_stacking_pattern({baseValue: 50, 
        baseRoman: "L", increaseRoman: "I"});

    test_stacking_pattern({baseValue: 100, 
        baseRoman: "C", increaseRoman: "I"});
}

//DRY!!!

function test_stacking_pattern({baseValue, baseRoman, increaseRoman}) {
    for(let i=0; i<3; i++) {
        let roman = baseRoman + new Array(i).fill(increaseRoman).join("");
        let value = baseValue + i;
        it(value + " -> " + roman, function() {
            expect(arabicToRoman(value)).to.eq(roman);
        });
    }
}

//R-G-R