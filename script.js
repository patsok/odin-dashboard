const trendingCards = document.querySelectorAll('.trending-card');
const newProjectButton = document.querySelector('.nav button');
const projects = document.querySelector('.projects');


trendingCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        let link = '';
        switch (index) {
            case 0:
                link = 'https://github.com/patsok';
                break;
            case 1:
                link = 'https://www.behance.net/falco-design';
                break;
            case 2:
                link = 'https://linktr.ee/patsok';
                break;
            case 3:
                link = 'https://www.linkedin.com/in/patryk-sokol/';
                break;
            default:
                link = '';
                break;
        }
        window.open(link, '_blank').focus();
    })
});

let projectButtons = document.querySelectorAll('.project-buttons img');

projectButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        changeIcon(button, index)
    })
});

function changeIcon(button, index) {
    if (index % 3 == 0) {
        button.getAttribute('src') == 'img/star2.svg' ? button.setAttribute('src', 'img/staractive.svg') : button.setAttribute('src', 'img/star2.svg');
    }
    if (index % 3 == 1) {
        button.getAttribute('src') == 'img/watch2.svg' ? button.setAttribute('src', 'img/watchactive.svg') : button.setAttribute('src', 'img/watch2.svg');
    }
}

let click = 4;
newProjectButton.addEventListener('click', () => {
    click++;
    let projectCardDiv = document.createElement('div');
    projectCardDiv.classList.add('project-card');
    let projectContentDiv = document.createElement('div');
    projectContentDiv.classList.add('project-content');
    let projectH2 = document.createElement('h2');
    projectH2.textContent = `Project #${click}`;
    let projectP = document.createElement('p');
    projectP.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim ipsum sit amet iaculis convallis. Fusce faucibus lorem vitae massa ullamcorper scelerisque. Nulla facilisi. Proin et lacus et velit euismod elementum.'
    let projectButtonsDiv = document.createElement('div');
    projectButtonsDiv.classList.add('project-buttons');
    for (let i = 0; i < 3; i++) {
        let projectButtonImg = document.createElement('img')
        let img = '';
        switch (i) {
            case 0:
                img = "img/star2.svg";
                break;
            case 1:
                img = "img/watch2.svg";
                break;
            case 2:
                img = "img/share2.svg";
                break;
            default:
                img = "img/heart.png";
                break;
        }
        projectButtonImg.setAttribute('src', img);
        projectButtonImg.addEventListener('click', () => { changeIcon(projectButtonImg, i) });
        projectButtonsDiv.appendChild(projectButtonImg);
    }
    projectContentDiv.appendChild(projectH2);
    projectContentDiv.appendChild(projectP);
    projectCardDiv.appendChild(projectContentDiv);
    projectCardDiv.appendChild(projectButtonsDiv);
    projects.appendChild(projectCardDiv);
})

const menu = document.querySelector('.hamburger');
const closeButton = document.querySelector('.closeButton');
const sidebar = document.querySelector('.sidebar');


menu.addEventListener('click', () => {
    sidebar.classList.add('open');
    closeButton.classList.add('visible');

})

closeButton.addEventListener('click', () => {
    closeButton.classList.remove('visible');
    sidebar.classList.remove('open');
})

let projectCards = document.querySelectorAll('.project-card')
projectCards[0].addEventListener('click', () => {
    window.open('odin-library/index.html', '_blank').focus();
})
projectCards[1].addEventListener('click', () => {
    window.open('odin-etch/index.html', '_blank').focus();
})
projectCards[2].addEventListener('click', () => {
    window.open('odin-rps/index.html', '_blank').focus();
})
projectCards[3].addEventListener('click', () => {
    window.open('odin-landing-page/index.html', '_blank').focus();
})
projectCards[4].addEventListener('click', () => {
    window.open('odin-restaurant-page/dist/index.html', '_blank').focus();
})

let annoCards = document.querySelectorAll('.anno-card')
annoCards[0].addEventListener('click', () => {
    window.open('https://github.com/patsok/odin-dashboard', '_blank').focus();
})
annoCards[1].addEventListener('click', () => {
    window.open('https://github.com/patsok/code-wars', '_blank').focus();
})
annoCards[2].addEventListener('click', () => {
    alert('You broke matrix. Are you satisfied?');
    alert('I though you would be better...');
    alert('Shame on you!');
})