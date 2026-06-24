Scriptdle

A simple web-based "Wordle-style" game where players see a list of medications + doses and guess the condition being treated.

Run locally:
1. Open /home/runner/work/scriptdle/scriptdle/index.html in your browser.

Customize:
1. Edit /home/runner/work/scriptdle/scriptdle/data.js.
2. Add more entries to window.SCRIPTDLE_CASES with:
   - condition (string)
   - aliases (array of accepted alternate answers)
   - medications (array of objects with name + dose)

Notes:
- The default round is date-based (same case for everyone each day).
- The "Practice Round" button loads a random case.
