# Shas Deal: Print-and-Play Kit

Files:
- `shas-deal-cards.pdf`: 16 US Letter pages, 9 cards per page (2.5" x 3.5", standard poker size).
  - Pages 1-12: main deck (106 cards).
  - Pages 13-14: side decks (10 Daily Page + 8 Secret Goal cards).
  - Pages 15-16: card backs (main deck, side decks).
- `cards.html`: the same sheets as a web page (print from a browser at 100% scale, no margins).
- `build_cards.py`: regenerates `cards.html`. Edit card names, text and counts there, then run `python3 build_cards.py`.

## How to print
1. Print the PDF at **100% / Actual size** on US Letter (turn off "fit to page").
2. For card backs, print pages 15-16 on the reverse of the front pages (flip on the long edge), or skip backs and slide each card into a sleeve in front of a standard playing card.
3. Cut along the dashed lines. A paper trimmer is fastest.
4. Use card sleeves with a playing card behind each card so they feel sturdy and don't show through.

Print the rulebook (`../RULEBOOK.md`) for the rules.
