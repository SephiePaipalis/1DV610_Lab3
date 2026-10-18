# Test Report

## Summary

The application was tested using both automated tests and manual testing.

Automated tests were written using Node.js's built-in test runner (`node:test`) and assertion module (`node:assert/strict`). The tests cover the player's stats and progression, monsters, combat, input handling, exploration, encounter management, and shop and mate encounters.

The automated test suite was run using `npm test`. The latest confirmed result was **54 tests passed, 0 failed**.

Manual testing was also performed by starting the game with `npm start`, checking that the main menu appeared, and selecting option 3 to quit. The game started and exited as expected.

The hardest behavior to test reliably was the random behavior, particularly the chance-based mate encounter and randomly generated monsters. Tests for the mate encounter check its return type rather than assuming that a random attempt will always succeed or fail. Interactive terminal behavior also produces considerable console output during automated tests, but this does not prevent the tests from passing.

## Test Results

| Test case | Requirement | Input | Expected outcome | Actual outcome |
| --------- | ----------- | ----- | ---------------- | -------------- |
| Start the application | R1 | Run `npm start`. | The main menu is displayed. | ✅ As expected; the game started successfully. |
| Quit the application | R1 | Select option `3` in the main menu. | A goodbye message is displayed and the application exits. | ✅ As expected during manual testing. |
| Handle invalid combat input | R2 | Provide an invalid combat choice. | The game reports invalid input and asks for another choice. | ✅ Automated test passed. |
| Map keyboard input to actions | R2 | Enter combat keys `1`, `2`, `3` and movement keys `W`, `A`, `S`, `D`. | Each valid key maps to its intended action, regardless of letter case. Unknown input returns `null`. | ✅ Automated tests passed. |
| Explore and quit | R3 | Enter `Q` while exploring. | Exploration ends and returns control to the main menu. | ✅ Automated test passed. |
| Handle invalid movement | R3 | Enter an invalid direction followed by `Q`. | Invalid input does not end exploration; the player can still quit. | ✅ Automated test passed. |
| Prevent defeated players from exploring | R3 | Attempt to explore when the player is already defeated. | Exploration does not start. | ✅ Automated test passed. |
| Track player health and stats | R4 | Take damage and inspect the player's stats. | Health decreases appropriately and cannot fall below zero. | ✅ Automated tests passed. |
| Use a healing potion | R4 | Use a potion when injured, then attempt to use one at full health. | A potion heals the player up to maximum health; using one at full health is unsuccessful. | ✅ Automated tests passed. |
| Gain experience and level up | R4 | Give the player enough experience to reach the next level. | The player's level increases and maximum health increases according to the game rules. | ✅ Automated tests passed. |
| Handle monster damage and defeat | R5 | Damage a monster until its health reaches zero. | Monster health decreases, cannot fall below zero, and the monster is defeated at zero health. | ✅ Automated tests passed. |
| Complete combat successfully | R5 | Attack a monster until it is defeated. | Combat ends when the monster is defeated. | ✅ Automated tests passed. |
| Defend during combat | R5 | Choose the defend action. | Incoming monster damage is reduced according to the combat rules. | ✅ Automated test passed. |
| Receive monster rewards | R6 | Complete a monster encounter without being defeated. | The player receives the monster's experience and gold rewards, and the combat victory is recorded. | ✅ Automated test passed. |
| Avoid rewards after defeat | R6 | Become defeated during a monster encounter. | The player does not receive victory rewards. | ✅ Automated test passed. |
| Buy a healing potion | R7 | Select the potion in the shop while carrying sufficient gold. | Gold decreases by the purchase price and the potion count increases by one. | ✅ Automated test passed. |
| Handle unsuccessful purchases | R7 | Attempt to buy a potion without enough gold, or select an unknown item. | The purchase fails and player resources remain unchanged. | ✅ Automated tests passed. |
| Leave the shop | R7 | Enter `Q` in the shop. | The shop closes without making a purchase. | ✅ Automated test passed. |
| Handle encounter selection | R8 | Generate encounters and execute registered handlers. | Encounter selection returns a valid encounter or no encounter; registered handlers execute, while duplicate and unknown registrations are rejected. | ✅ Automated tests passed. |
| Back away from a mate encounter | R9 | Select option `2`. | The player backs away and the encounter returns `false`. | ✅ Automated test passed. |
| Handle invalid mate input | R9 | Enter an invalid choice followed by option `2`. | The encounter asks again after invalid input and then ends when the player backs away. | ✅ Automated test passed. |
| Handle a seduction attempt | R9 | Select option `1`. | The encounter returns a boolean indicating whether the attempt succeeded. | ✅ Automated test passed. |

## Known Issues in Third-Party Modules

None found during testing.

The application uses `dice-rng-toolkit` for random number generation and `game-controller` for input handling. No third-party module defects that affected the application's behavior were identified during the tests performed.