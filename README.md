# Welcome to Tic-Tac-Toe in “Fruity-style"

This is an implementation of the well-known game Tic-Tac-Toe. With this two player-version of the users can have some enjoyable time while waiting for the bus or just want a friendly challenge. Use your strategic mind to win the game by placing your icons in a row on the board while blocking your opponent from doing the same. 

![alt text](assets/img/title_image.png)

# User value
-	Have a nice relaxing moment, enjoying myself in a break from work, on the bus or while waiting at the dentist. 
-	Training logic, thinking strategically – even if on a less complex level


# Use cases
- I want to access information on how to play this game so that 
- Personalize – choose the set of symbol
- Perzonalize – choose no of games in a set
- Personalize – choose color-scheme
- Initiate a game 
- Reset the set whenever I want to
- Optional 
    - Choose to play agains a computer or a human
    - Ask for the next best move
    - Optional pop a timer countdown and auto-start next game in the set
    - Personalize board with 3 or 4 dimensions

# Features
- Button to open a Select-dialogue for a fruit-icon 
- Button to open a Select-dialogue for selecting number of rounds in a game 
- Icons update to indicate winer/looser mood
- Header text update to show who won and the state of the game
- The reset button text updates according to progress of the game
- Score dialogues update to show the current score
- Progress dialogue update to show the progress of rounds in the game 
- The single modal adjusts its content dependning on the event that triggered it to open
- Button to show game rules

# Design 
- Balsamiq notes

# Quality and test
## Manual testing
- Board-updates to game progress
- Game-stats updates to game progress
- Rules button
- Settings button with inputs
- Reset button 

## Automated testing
### Script based testing of the “is winner?”-logic
### Automated validation
-	CSS-validator
-	HTML-validator
-	JS-Linter
-	Performance, Accessibility – Lighthouse
-	Responsiveness – Am I Responsive
![alt text](assets/img/responsive_test.png)

## Summary of test outcomes
### Major challenges, resolved
- Winner logic
- Logic related to the concept of “rounds” in the context of a “game”
- Adapting the content of one single modal to the triggering event
### Known remaining bugs
- any remaining

# Technologies and frameworks used
- HTML5
- CSS3
- JavaScript
- Bootstrap 
- Node,js for test?
- GitHub and GitPod

# References
- https://www.freepik.com/ – fruit icons designed by Rohim and Shuvo Das
- https://pixlr.com/remove-background - remove background from .png icons
- https://stackoverflow.com/questions/
- https://getbootstrap.com/
- https://validator.w3.org/
- https://www.w3schools.com/
- https://github.com/Swarnil/Tic-Tac-Toe-with-Html-CSS-Bootstrap-and-JavaScript/
- My mentor Antonio
