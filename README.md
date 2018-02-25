# EDHelper

## Usage

### Main View
Tap the generic player name to change. Rotate button will flip your container 180 degrees.
While your container is rotated the change life screen and commander damage screens will be correctly oriented.

### Change Life Screen
To change the life total tap on the player's life you wish to change.
While in the change life screen, you can tap on your life total to see your life history.
Life history is recorded whenever you exit the change life, mass life change, or commander damage screen,
if your life total changed.

### Commander Damage Screen
To add commander damage or access other player counters, tap on the player's sword icon.
Tap the commander that dealt damage, then the plus buttons will appear.
If you use one of the plus buttons a minus button will appear in case you made a mistake.
To access any of the other counters, such as poison or energy, tap on the name and a counter will appear.
If any of the other counters are anything but zero,
they will automatically expand when opening the commander damage screen.
The commander damage screen is also where you can find the partners button on the upper left corner.
The partner button will summon another commander counter (behind the current one).
To access the second commander counter tap on the first twice.
Any other touches will toggle between the two partners.

**Please note that add commander damage automatically subtracts from the player's life total.**

### Utility Screen
Tap the gear icon to add or subtract a player, start a new game,
change player colors, change multiple players lives at once, or access the random number screen.
There is also a rotation button. If this container is flipped,
the change player color screen, mass life change screen, and random numbers screen
will all be flipped.

### Change Player Colors Screen
To change a player's background color first tap your chosen color,
then buttons will appear to connect that color to the player of your choice.
Use the gradient button to toggle between solid stripes and gradients
(for multi-color combinations).

### Mass Life Change Screen
To exclude a player from the mass life change, tap on their button in the exclude section.
You can only exclude one player. To deselect, tap the clear button below.

### Random Number Screen
I omitted 2, 3, 6, and 20 because I figured those were common dice for EDH players to have on hand.
Tap on the number to get your random number, the background will change from black to white.
Each additional tap will reveal another random number in the same range.

### Other Features
If you accidentally refresh the page, close the window, or navigate away
don't worry! EDHelper saves game state in local storage.

**To reset game state to the default beginning state, please tap on Start New Game in the utilities screen**

EDHelper uses NoSleep.js to prevent mobile devices from falling asleep. It does this by running a silent audio file periodically in the background.

EDHelper supports offline usage via cacheing!

## Mobile Support
**Please use landscape view.**

**iOS** Please use Safari's 'Add to Home Screen' feature to enable fullscreen mode.

**Android** Please use Chrome's 'Add to Home Screen' feature to enable fullscreen and
landscape only mode.  

## Troubleshooting
If you are having issues with EDHelper try 'Start New Game' (found in the utilities screen).
