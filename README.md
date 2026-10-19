# Cat City Adventure

Cat City Adventure is a terminal-based adventure game written in JavaScript for the 1DV610 Laboration 3 assignment. Explore the streets of Cat City, encounter and fight feral cats, collect rewards, and buy healing items to survive your adventure and find a mate.

## Requirements

The following functional requirements describe the application's expected behavior. Their IDs are used in `test_report.md` to connect requirements to test cases.

- **R1 – Main menu:** The application shall display a main menu, allow the player to start a new adventure or view instructions, and provide an option to quit.
- **R2 – Input handling:** The application shall interpret keyboard input as game actions, handle valid combat and movement keys, and respond appropriately to invalid input.
- **R3 – Exploration:** The player shall be able to explore Cat City using WASD, encounter events while exploring, and return to the main menu by pressing Q. A defeated player shall not start exploring.
- **R4 – Player progression:** The player shall have health, experience, a level, healing potions, and gold. The player shall be able to take damage, use healing potions, gain experience, level up, and manage gold.
- **R5 – Combat and monsters:** The player shall be able to attack monsters, defend against attacks, and use healing potions during combat. Combat shall end when either the player or monster is defeated.
- **R6 – Combat rewards:** After surviving a monster encounter and completing combat, the player shall receive the monster's experience and gold rewards, and the victory shall be recorded. Defeated players shall not receive victory rewards.
- **R7 – Shop:** The player shall be able to view shop items, purchase healing potions when they have enough gold, and leave the shop. Invalid choices and unsuccessful purchases shall not incorrectly change player resources.
- **R8 – Encounter management:** The application shall select encounters, allow registered encounter handlers to execute, and reject duplicate registrations and unknown encounter types.
- **R9 – Mate encounter:** The player shall be able to attempt to find a mate or back away. Invalid input shall be handled, and the encounter shall report whether a mate was found.

## Getting Started

### Prerequisites

- Node.js 22 or newer
- npm
- Git

The project uses ES modules and Node.js's built-in test runner.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SephiePaipalis/1DV610_Lab3.git
   ```

2. Enter the project directory:

   ```bash
   cd 1DV610_Lab3
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

The project uses `dice-rng-toolkit` (https://github.com/ThJoker3/Dice-RNG-Toolkit) and `game-controller` (https://github.com/SephiePaipalis/1DV610_Lab2), which are installed from GitHub. Make sure their repositories are accessible to your environment.

### Start the game

Run the following command from the project root:

```bash
npm start
```

The main menu will appear in the terminal.

## How to Play

### Main menu

- **1 – Start game:** Begin a new adventure.
- **2 – View instructions:** Display the game's instructions.
- **3 – Quit:** Exit the application.

### Exploration

Use the following keys to move around Cat City:

| Key | Action |
| --- | --- |
| W | Move north |
| A | Move west |
| S | Move south |
| D | Move east |
| Q | Leave exploration and return to the main menu |

Random encounters may occur while exploring.

### Combat

| Key | Action |
| --- | --- |
| 1 | Attack the monster |
| 2 | Defend against the monster's attack |
| 3 | Use a healing potion |

Keep an eye on your health. If your health reaches zero, your adventure ends.

Defeating monsters grants experience and gold. Gaining enough experience increases your level and maximum health.

### Shop

The shop sells healing potions for gold.

- Select `1` to buy a healing potion.
- Select `Q` to leave the shop.
- You must have enough gold to complete a purchase.

### Mate encounter

- Select `1` to attempt to charm the mate.
- Select `2` to back away.

Finding a mate is chance-based.

## Testing

The project uses Node.js's built-in test runner and assertion module. No separate test framework is required.

Run the automated test suite with:

```bash
npm test
```

The tests cover player progression, monsters, combat, input handling, exploration, encounter management, and shop and mate encounters.

The test report is available in [`test_report.md`](test_report.md). It documents the test approach, expected and actual outcomes, and known third-party module issues
