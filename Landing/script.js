const landingPage = {
    allElements : (document.querySelectorAll('*')),
    lightModeElements: document.querySelectorAll('.lightMode'),
    darkModeElements: document.querySelectorAll('.darkMode'),
    colorModeButton: document.querySelector('#colorModeButton'),
    changeColorMode: function() {
        this.darkModeElements = document.querySelectorAll('.darkMode');
        this.lightModeElements = document.querySelectorAll('.lightMode');

        if (this.colorModeButton.classList.contains('lightMode')) {
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

        const pageState = {
            colorMode: landingPage.colorModeButton.classList[1],
            buttonPosition: landingPage.colorModeButton.style.right,
        };
        localStorage.setItem("landingPageColorMode", JSON.stringify(pageState));
    },
    loadColorMode : function() {
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