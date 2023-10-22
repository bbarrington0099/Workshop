let landingPage = {
    lightModeElements: document.querySelectorAll('.lightMode'),
    darkModeElements: document.querySelectorAll('.darkMode'),
    colorModeButton: document.querySelector('#colorModeButton'),
    colorModeChange: function() {
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
        }
    },
};


