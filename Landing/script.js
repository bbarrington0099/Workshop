const landingPage = {
    allElements : (document.querySelectorAll('*')),
    colorModeButton: document.querySelector('#colorModeButton'),
    //toggle the color mode of the page when the color mode button is clicked
    changeColorMode: function() {
        //change the color mode of the page
        if (this.colorModeButton.classList.contains('lightMode')) {
            this.colorModeButton.style.right = '-13px';
        } else if (this.colorModeButton.classList.contains('darkMode')) {
            this.colorModeButton.style.right = '13px';
        };
        //toggle the color mode of all elements on the page
        this.allElements.forEach(element => {
            element.classList.toggle('lightMode');
            element.classList.toggle('darkMode');
        });
        //save the current color state of the page to browser cache
        const pageState = {
            colorMode: this.colorModeButton.classList[1],
            buttonPosition: this.colorModeButton.style.right,
        };
        localStorage.setItem("landingPageColorMode", JSON.stringify(pageState));
    },
    //load the color mode of the page from browser cache or set it to light mode if no color state is saved
    loadColorMode: function() {
        //load the saved color state of the page from browser cache
        if (localStorage.getItem("landingPageColorMode")) {
            const savedState = JSON.parse(localStorage.getItem("landingPageColorMode"));
            this.colorModeButton.style.right = savedState.buttonPosition;
            this.allElements.forEach(element => {
                element.classList.toggle(savedState.colorMode);
            });
        //if no color state is saved, set the color mode to light mode
        } else {
            this.allElements.forEach(elm => {
                elm.classList.toggle('lightMode');
            });
        };
    },
    //initialize the page by displaying projects and loading color mode from browser cache
    initializePage: function() {
        projectSpace.displayProjects();
        this.allElements = document.querySelectorAll('*');
        this.loadColorMode();
    }
};

const projectSpace = {
    projectArea : document.querySelector('#projectArea'),
    projectArray : [],
    //add a project to the project array
    addProject : function(project, projectDescription, highlights, properName) {
        this.projectArray.push({
            projectName : project,
            projectLocation : `..\\Projects\\${project}\\index.html`,
            imgLocation : `..\\Imgs\\Projects\\${project}.png`,
            projectDescription : projectDescription,
            githubLink : `https://github.com/bbarrington0099/Workshop/tree/main/Projects/${project}`,
            highlights : highlights,
            properName : properName
        })
    },
    //display all projects in the project array
    displayProjects : function() {
        this.projectArea.innerHTML = this.projectArray.map(project => {
            return (
            `<div id="${project.projectName}" class="project">
                <h2>${project.properName ? project.properName : project.projectName}</h2>
                <a href="${project.projectLocation}" target="_blank">
                    <img src="${project.imgLocation}" alt="${project.projectDescription}" class="projectImg">
                </a>
                <p class="projectHighlights">${project.highlights}</p>
                <a class="sourceLink" href="${project.githubLink}" target="_blank">Source Code</a>
            </div>`)
        }).join('');
    },
};

//list which projects to display and their descriptions
projectSpace.addProject('PrimeChecker', 'a tool for working with prime numbers');
projectSpace.addProject('HiddenVillageCards', 'expandable cards that give information about the hidden villages in the Naruto Universe');
projectSpace.addProject('RPG', 'a text-based RPG game');
projectSpace.addProject('Bible', 'the KJV of The Holy Bible', 'Using Fetch for API calls and parsing the data to be used in the DOM', 'The Holy Bible (KJV)')

/*
TO-DO:
    add project description to tooltip?
    change lorem ipsum to introduction
    add contact info to footer (host Mailserver)
    create studio Github account?
    add github link to footer
    host on apache VPS (host Webserver)
*/