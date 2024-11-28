import { ComparisonCard } from "./ComparisonCard";

describe("ComparisonCard", () => {
  it("should be retrun true", () => {
    const comparisonCard = new ComparisonCard();
    const cardAttack = { rank: "J", suit: "spades", level: 11 };
    const cardDiff = { rank: "10", suit: "spades", level: 12 };
    const trump = { rank: "9", suit: "spades", level: 9 };
    expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(
      true
    );
  });
  it("should be retrun true", () => {
    const comparisonCard = new ComparisonCard();
    const cardAttack = { rank: "J", suit: "hearth", level: 11 };
    const cardDiff = { rank: "10", suit: "spades", level: 10 };
    const trump = { rank: "9", suit: "spades", level: 9 };
    expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(
      true
    );
  });
  it("should be retrun true", () => {
    const comparisonCard = new ComparisonCard();
    const cardAttack = { rank: "J", suit: "diamonds", level: 11 };
    const cardDiff = { rank: "10", suit: "spades", level: 10 };
    const trump = { rank: "9", suit: "spades", level: 9 };
    expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(
      true
    );
  });
  it("should be retrun false", () => {
    const comparisonCard = new ComparisonCard();
    const cardAttack = { rank: "8", suit: "spades", level: 11 };
    const cardDiff = { rank: "10", suit: "diamonds", level: 10 };
    const trump = { rank: "9", suit: "spades", level: 9 };
    expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(
      false
    );
  });
  it("should be retrun false", () => {
    const comparisonCard = new ComparisonCard();
    const cardAttack = { rank: "J", suit: "spades", level: 11 };
    const cardDiff = { rank: "10", suit: "spades", level: 10 };
    const trump = { rank: "9", suit: "spades", level: 9 };
    expect(comparisonCard.ComparisonCard(cardDiff, cardAttack, trump)).toBe(
      false
    );
  });
});
