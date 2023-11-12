const landingPage = {
    allElements : (document.querySelectorAll('*')),
    lightModeElements: document.querySelectorAll('.lightMode'),
    darkModeElements: document.querySelectorAll('.darkMode'),
    colorModeButton: document.querySelector('#colorModeButton'),
    changeColorMode: function() {
        //refresh the collections of elements to be changed
        this.darkModeElements = document.querySelectorAll('.darkMode');
        this.lightModeElements = document.querySelectorAll('.lightMode');

        if (landingPage.colorModeButton.classList.contains('lightMode')) {
            this.lightModeElements.forEach(element => {
                element.classList.remove('lightMode');
                element.classList.add('darkMode');
            });
            this.colorModeButton.style.right = '-13px';
        } else if (this.colorModeButton.classList.contains('darkMode')) {
            this.darkModeElements.forEach(element => {
                element.classList.remove('darkMode');
                element.classList.add('lightMode');
            });
            this.colorModeButton.style.right = '13px';
        };
        //save the current color state of the page to browser cache
        const pageState = {
            colorMode: landingPage.colorModeButton.classList[1],
            buttonPosition: landingPage.colorModeButton.style.right,
        };
        localStorage.setItem("landingPageColorMode", JSON.stringify(pageState));
    },
    loadColorMode : function() {
        //load the saved color state of the page from browser cache
        if (localStorage.getItem("landingPageColorMode")) {
            const savedState = JSON.parse(localStorage.getItem("landingPageColorMode"));
            this.colorModeButton.style.right = savedState.buttonPosition;
            this.allElements.forEach(element => {
                element.classList.add(savedState.colorMode);
            });
        } else {
            this.allElements.forEach(elm => {
                elm.classList.add('lightMode');
            });
        };
    },
    initializePage : function() {
        projectSpace.displayProjects();
        this.loadColorMode();
    }
};

const projectSpace = {
    projectArea : document.querySelector('#projectArea'),
    projectArray : [],
    addProject : function(project, projectDescription) {
        this.projectArray.push({
            projectName : project,
            projectLocation : `..\\Projects\\${project}\\index.html`,
            imgLocation : `..\\Imgs\\Projects\\${project}.png`,
            projectDescription : projectDescription,
        })
    },
    displayProjects : function() {
        this.projectArray.forEach(project => {
            this.projectArea.innerHTML += `
            <div id="${project.projectName}" class="project">
                <a href="${project.projectLocation}" target="_blank">
                    <img src="${project.imgLocation}" alt="${project.projectDescription}" class="projectImg">
                </a>
            </div>
            `;
        });
        landingPage.allElements = document.querySelectorAll('*');
    },
};

projectSpace.addProject('StepTracker', 'a step tracker made to experiment with basic CSS and JS');
projectSpace.addProject('PrimeChecker', 'a tool for working with prime numbers');
projectSpace.addProject('HiddenVillageCards', 'expandable cards that give information about the hidden villages in the Naruto Universe');

/*
TO-DO:
    add project description to tooltip?
    change use of innerHTML to createElement/appendChild?
    change lorem ipsum to introduction
    add contact info to footer (host Mailserver)
    create studio Github account
    add github link to footer
    host on apache VPS (host Webserver)
    FONTS - Siracha? - https://fonts.google.com/specimen/Sriracha?query=sriracha 
*/