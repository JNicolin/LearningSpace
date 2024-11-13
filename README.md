
Designdokument + Balsamiq
UC-dokumentation
Referenser
- https://github.com/Swarnil/Tic-Tac-Toe-with-Html-CSS-Bootstrap-and-JavaScript/

-----------------------------
Ev byt ut col/rad mot en tabell istället. 
Alt. behåll och gör möjligt att välja dimension n x n

En footer med info om ställningen, player 1 och 2, som uppdateras vi JS

Ev göra motspelaren automatisk, alt valbart automatisk

Ändra bakgrunden på fält när det klickas

Gör en vinnar-modal.
Gör en modal om man klickar på ett upptaget fält. 

Något API-call? 




                <!-- Social -->
                <div class="social-networks col-12">
                    <a href="https://www.facebook.com" target="_blank" aria-label="Link to Facebook"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com" target="_blank" aria-label="Link to Instagram"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.x.com" target="_blank" aria-label="Link to X (Twitter)"><i class="fa-brands fa-x-twitter"></i></a>
                </div>

.social-networks {
    font-size: 2rem;
    padding: 2% 0;
    display: flex; 
    justify-content: space-evenly;
    list-style-type: none;
}

.social-networks a {
    color: var(--lightTextColor);
}