
Designdokument + Balsamiq
UC-dokumentation
Referenser
- https://github.com/Swarnil/Tic-Tac-Toe-with-Html-CSS-Bootstrap-and-JavaScript/
- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

-----------------------------
Dynamik

- Welcome pop-up - med timer och X
- Fält som flippar när de klickas
- En start-button som försvinner och ersätts med en restart button + en p1, en p2 scorboard
- Möjlighet att välja dimension?
- API-call spela mot en CPU?
- En vinnar-modal. Med timer och X




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