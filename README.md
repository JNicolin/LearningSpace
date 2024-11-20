# Welcome to Tic-Tac-Toe in “Fruity-style"

This is an implementation of the well-known game Tic-Tac-Toe. With this two player-version of the game a set of users can have some enjoyable time while waiting for the bus or just want a friendly challenge. Use your strategic mind to win the game by placing your icons in a row on the board while blocking your opponent from doing the same. 

![screenshot of the game UI](assets/img/title_image.png)

# User value
-	Have a nice relaxing moment, enjoying myself in a break from work, on the bus or while waiting at the dentist. 
-	Training logic, thinking strategically – even if on a less complex level


# Implemented user stories
## As a player I want to,
- know how to play the game, so that I can get started 
- select my player-icon, so that the games feels personal
- adjust the visuals and characteristics of the game, to have a more personal feeling
- know the current score, so that I know how I am doing
- have feedback during the game to know how the game progresses from start to end

# Features
- Button to open a Select-dialogue for a fruit-icon 
- Button to open a Select-dialogue for selecting number of rounds in a game 
- Icons are shifted at end of game to indicate winer/looser mood
- Header text updates as the game progress to show who won and the curret state of the game
- The reset button text updates according to progress of the game
- Score dialogues update to show the current score
- Progress dialogue update to show the progress of rounds in the game 
- The single modal adjusts its content dependning on the event that triggered it to open
- Button to show game rules

# Design 
## Wireframes for different viewports

![wireframe designs](assets/img/wireframes.png)   

## Color scheme
The choice of colors was done with the intention to give an energizing and happy feeling while playing. Strong colors and somewhat naive but yet colorful icons as a complement. 

![colors used in the game](assets/img/palette.png)

## Choice of fonts
The choice of the main font was done to reflect a relaxed and happy mood, which is part of the ambition for providing the game.

## Choice of icons
The choice of fruits in a cartoon style was done to emphasise playful intention of spending time with this game.
-   ![example of icons](assets/img/4_PeH.png)


# Quality and test
## Manual testing
- Test of updates of texts in the score- and progresss disalogues, to reflect scores and state of the game 
- Test that the text of the restart button shifts to reflect if a click triggers a new game or a new round 
- Test of the rules button. Should open the modal with rules-content
- Test of the settings button. Should open the modal with options for the users to make selections
- Test of the app to caputure user input from the settings modal 
- Test that the welcome modal opens on when the game is loaded, with a content greeting the players to the game 
- Test of the logic to determine the impact of a click on the game board. Icons should be added correctly. Determine if there is a winner, if there is a tie. Determine if the round is over and if all the rounds in the game are over. 
- Test that all icons are flipped to show a happy/winner and sad/looser icon after the end of each round. 

### Tools based utomated validation
-	CSS-validator
-	HTML-validator
-	JS-Linter
-	Performance, Accessibility – Lighthouse
-	Responsiveness – Am I Responsive
![app on different viewports](assets/img/responsive_test.png)

## Summary of test outcomes
### Major challenges, resolved
- Testing the logic to determine the outcome of every user click was a quite large task, as there are som many combinations to test.  
- Implementation of the logic related to the concept of “rounds” in the context of a “game”. This was quite tricky since it came with a lot of dependencies to updating the information to the user on the progress of the game. 
- Adapting the content of one single modal to the triggering event required some problem solving. 

### Known remaining bugs
- After all testing and validation, there are no known remaining bugs. 

### Ideas for a coming relases
The game could be developed further to create additional satisfaction. Here are a few potential user stories to select from
- Select to play agains a computer or a human
- Ask for the next best move
- User can resize the board with 3x3, 4x4 or 5x5 gameboard options

# Technologies and frameworks used
- HTML5
- CSS3
- JavaScript
- Bootstrap 
- Node,js for test?
- GitHub and GitPod

# References and acknowledgements
- https://www.freepik.com/ – fruit icons designed by Rohim and Shuvo Das
- https://pixlr.com/remove-background - remove background from .png icons
- https://stackoverflow.com/questions/
- https://getbootstrap.com/
- https://validator.w3.org/
- https://www.w3schools.com/
- https://github.com/Swarnil/Tic-Tac-Toe-with-Html-CSS-Bootstrap-and-JavaScript/
- My mentor Antonio Rodriguez for professional guidance during calls. 
