//web state
//responsive menu
const hamBtn = document.querySelector("#hamIcon");//select
hamBtn.addEventListener("click", toggleMenus);//click change menu
const menuItemsList = document.querySelector("nav ul");//select

function toggleMenus() {
    if (menuItemsList.classList.contains("menuShow")) {
        hamBtn.innerHTML = "Open Menu";
        menuItemsList.classList.remove("menuShow");
    } else {
        hamBtn.innerHTML = "Close Menu";
        menuItemsList.classList.add("menuShow");
    }
}

//font-size
const btn = document.getElementById('page0btn');
const h1 = btn.querySelector('h1');

function setFontSize() {
    const btnHeight = btn.clientHeight;//get the height of the button
    h1.style.fontSize = (btnHeight / 5) + 'px';
}

//menu to page
window.addEventListener('load', setFontSize);
window.addEventListener('resize', setFontSize);

const page0btn = document.querySelector("#page0btn");
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
var allpages = document.querySelectorAll(".page");

const navButtons = [page1btn, page2btn, page3btn, page4btn]

function hideall() {
    for (let onepage of allpages) {
        onepage.style.display = "none"; //hide
    }
}
function show(pgno) {
    hideall();

    const headerPage1 = document.getElementById("page1");
    if (pgno >= 2 && pgno <= 4) {//hide header for main pages
        headerPage1.style.display = "none";
    } else {
        headerPage1.style.display = "block";
    }

    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show

    document.querySelectorAll('nav ul li button .sts').forEach(span => {
        span.classList.remove('active');//remove active state for all points
    });

    const currentBtn = navButtons[pgno - 1];//get the current point
    if (currentBtn) {
        const span = currentBtn.querySelector('.sts');
        if (span) {
            span.classList.add('active');//let the point state active and show
        }
    }
}

page0btn.addEventListener("click", function () {
    show(0);
});
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
});
hideall();
show(1);

const ecoBtn1 = document.querySelector("#page4btn1");
const ecoBtn2 = document.querySelector("#page4btn2");
const ecoBtn3 = document.querySelector("#page4btn3");
const ecoBtn4 = document.querySelector("#page4btn4");

const ecoPages = document.querySelectorAll(".page4");

function hideEcoPages() {
    ecoPages.forEach(page => {
        page.style.display = "none";
    });
}

function showEcoPage(id) {
    hideEcoPages();
    const section = document.getElementById(id);
    if (section) {
        section.style.display = "block";
    }
}

ecoBtn1.addEventListener("click", () => showEcoPage("button1"));
ecoBtn2.addEventListener("click", () => showEcoPage("button2"));
ecoBtn3.addEventListener("click", () => showEcoPage("button3"));
ecoBtn4.addEventListener("click", () => showEcoPage("button4"));

hideEcoPages();

//show accordingly
window.addEventListener("load", () => {//initially show
    const lh = document.querySelector(".LH");
    const top2 = document.querySelector(".TOP_2");
    const bot = document.querySelector(".BOT");//select

    const resetAnimations = () => {
        lh.style.opacity = 0;
        top2.style.opacity = 0;
        bot.style.opacity = 0;//transparent

        lh.style.transition = "none";
        top2.style.transition = "none";
        bot.style.transition = "none";//reset transition

        void lh.offsetWidth;
        void top2.offsetWidth;
        void bot.offsetWidth;//reflow the layout

        lh.style.transition = "opacity 1s";
        top2.style.transition = "opacity 1s";
        bot.style.transition = "opacity 1s";
    }

    const playAnimation = () => {
        resetAnimations();

        setTimeout(() => {
            lh.style.transition = "opacity 1s";
            lh.style.opacity = 1;
        }, 1000);

        setTimeout(() => {
            top2.style.transition = "opacity 1s";
            top2.style.opacity = 1;
        }, 2000);

        setTimeout(() => {
            bot.style.transition = "opacity 1s";
            bot.style.opacity = 1;
        }, 3000);
    };

    page2btn.addEventListener("click", () => {
        playAnimation();
    })
});
//Q&A
document.querySelectorAll('.btmsubmit').forEach(button => {//select
    button.addEventListener('click', function () {
        const parentSection = button.closest('section');//find section
        const answerDiv = parentSection.querySelector('.ct1.answer');
        const correctAnswer = button.dataset.correct;//get the correct answer
        const radios = parentSection.querySelectorAll("input[type='radio']");//get all radio buttons

        radios.forEach(radio => {
            radio.classList.remove('correct', 'incorrect')//remove previous classes(prevent multiple clicks)
        })

        const selected = parentSection.querySelector("input[type='radio']:checked");

        if (selected) {
            if (selected.value === correctAnswer) {
                selected.classList.add('correct');
            } else {
                selected.classList.add('incorrect');

                radios.forEach(radio => {
                    if (radio.value === correctAnswer) {
                        radio.classList.add('correct');
                    }
                })
            }
        }

        if (answerDiv) {
            answerDiv.style.display = 'block';
        }
    })
})

//game
//select
document.getElementById("selectButterfly").addEventListener("change", function () {
    const selected = this.value;
    const img = document.getElementById("butterflyImage");

    if (selected === "Choice B") img.src = "photo/button2.png";
    else if (selected === "Choice C") img.src = "photo/button3.png";
    else if (selected === "Choice D") img.src = "photo/button4.png";
    else img.src = "photo/button1.png";
});

const container = document.getElementById("flowerContainer")
const flowerCount = 10;
const flowers = [];
const popAudio = new Audio("audio/popsound.mp3");
let moveFlowerItvld = null;

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function createFlowers() {
    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('img');
        flower.src = 'photo/flower.png';
        flower.classList.add('flower');
        container.appendChild(flower);
        flowers.push(flower);

        flower.addEventListener("click", function () {
            popAudio.play();
            flower.remove();

            const butterfly = document.getElementById("butterflyImage");
            const currentWidth = butterfly.offsetWidth;
            const currentHeight = butterfly.offsetHeight;
            butterfly.style.width = (currentWidth + 10) + "px";
            butterfly.style.height = (currentHeight + 8) + "px";
        });
    }
}

function moveFlower() {
    const maxX = container.clientWidth - 100;
    const maxY = container.clientHeight - 100;

    flowers.forEach(flower => {
        flower.style.left = getRandom(0, maxX) + "px";
        flower.style.top = getRandom(0, maxY) + "px";
    });
}

function startGame() {
    flowers.length = 0;
    const container=document.getElementById("flowerContainer");
    container.innerHTML = "";

    const butterfly = document.createElement("img");
    butterfly.id = "butterflyImage";
    butterfly.src = "photo/button1.png";
    butterfly.alt = "butterfly";
    butterfly.style.width = "100px";
    butterfly.style.height = "80px";
    container.appendChild(butterfly);

    createFlowers();

    if (moveFlowerItvld) clearInterval(moveFlowerItvld);
    moveFlowerItvld = setInterval(moveFlower, 1000);
}

document.querySelector("#playAgainBtn").addEventListener("click", startGame);

startGame();

//Full screen mode
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");

btnWS.style.display = "none";

btnFS.addEventListener("click", enterFullscreen);
btnWS.addEventListener("click", exitFullscreen);

function enterFullscreen() { //must be called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) { // Firefox
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
        document.documentElement.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
}
document.addEventListener("fullscreenchange", toggleBtns);
document.addEventListener("mozfullscreenchange", toggleBtns);
document.addEventListener("webkitscreenchange", toggleBtns);
document.addEventListener("mssrceenchange", toggleBtns);

function toggleBtns() {
    if (document.requestFullscreen ||
        document.mozRequestFullScreen ||
        document.webkitRequestFullscreen ||
        document.msRequestFullscreen
    ) {
        btnFS.style.display = "inline-block";
        btnWS.style.display = "none";
    } else {
        btnWS.style.display = "inline-block";
        btnFS.style.display = "none";
    }
}