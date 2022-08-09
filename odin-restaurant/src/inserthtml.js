import logoRW from './img/logo-redwhite.svg';
import home from './img/home.svg';
import menu from './img/messages.svg';
import contact from './img/settings.svg';
import './styles.scss';


const displayController = (() => {
    const navArray = ['home', 'menu', 'contact'];
    const navImgArray = [home,menu,contact];

    const renderNav = () => {

        let ul = document.createElement('ul');
        navArray.forEach((elem,index) => {
            let li = document.createElement('li');
            if (window.innerWidth > 699) {
                li.textContent = elem.toUpperCase();
            }
            else {
                let img = document.createElement('img');
                img.src = navImgArray[index];
                li.appendChild(img);
            }
            ul.appendChild(li);
        });
        document.querySelector('.nav').appendChild(ul)

    }

    const renderFooter = () => {
        let div = document.createElement('div');
        div.classList.add('author');
        div.innerHTML = 'Made with<span class="heart"></span>by <a href="https://github.com/patsok" target="_blank">Falco</a>'
        document.querySelector('.footer').appendChild(div);
    }

    const renderLogo = () => {
        let logoRedWhite = document.createElement('img');
        logoRedWhite.src = logoRW;
        document.querySelector('.container').appendChild(logoRedWhite);
    }

    const renderFrame = () => {
        let content = document.querySelector('#content');
        content.innerHTML = `<div class="nav"></div><div class="container"></div><div class="footer"></div>`;
        renderNav();
        renderFooter();
        renderLogo();
    }

    const renderPage = (index) => {
        document.querySelector('.container').innerHTML = '';
        renderLogo();
        index == 0 ? renderHomePage() : index == 1 ? renderMenuPage() : renderContactPage();
    }

    const renderHomePage = () => {
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('desc');
        let para = document.createElement('p');
        let menuButton = document.createElement('a');
        para.innerHTML = 'We will bring a soul-stirring experience for you and your clients, whether it is single order, an office party or a business meeting. The finest quality products served in authentic japanese culture in a professional manner tailored to your needs.'
        menuButton.href = '#menu';
        menuButton.textContent = 'SEE MENU';
        contentDiv.appendChild(para);
        contentDiv.appendChild(menuButton);
        document.querySelector('.container').appendChild(contentDiv);
        menuButton.addEventListener('click', () => renderPage(1));
    }

    const renderMenuPage = () => {
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('desc');

        const addPositionMenu = (str1, str2) => {
            let h1 = document.createElement('h1');
            let p = document.createElement('p');
            let div = document.createElement('div');
            h1.textContent = str1;
            p.textContent = str2;
            p.classList.add('ing');
            h1.classList.add('name');
            appendElement(div, h1, p);
            appendElement(contentDiv, div);
        }

        function appendElement(par, ...el) {
            let arr = [...el];
            arr.forEach(elem => {
                par.appendChild(elem);
            });
        }
        addPositionMenu('Sushi premium box', 'Fresh fish with soy sauce');
        addPositionMenu('Sushi normal box', 'Mediocre fish with spoon');
        addPositionMenu('Sushi small box', 'Rotten fish with tomato juice');
        document.querySelector('.container').appendChild(contentDiv);
    }

    const renderContactPage = () => {
        let contentDiv = document.createElement('div');
        contentDiv.classList.add('desc');
        let phone = document.createElement('p');
        let address = document.createElement('p');
        phone.textContent = '📞 423 122 831';
        address.textContent = '🏠 Wrocław, ul. japońska 12, Poland';
        contentDiv.appendChild(phone);
        contentDiv.appendChild(address);
        document.querySelector('.container').appendChild(contentDiv);

    }

    renderFrame();
    renderHomePage();

    return { renderPage };
})();

const buttonController = (() => {
    let navButtons = document.querySelectorAll('.nav>ul li');
    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => displayController.renderPage(index));
    });
})()








