const photos = [
    {
        image: "IMG-20250707-WA0000.jpg",
        title: "The First Hello",
        caption: "That nervous, shy smile on our very first day at university. Who knew we’d become inseparable?"
    },
    {
        image: "IMG-20250923-WA0097.jpg",
        title: "Shared Notes",
        caption: "The first time I asked to borrow your notes because I was lost. Thank you for always helping me out."
    },
    {
        image: "IMG-20251123-WA0009.jpg",
        title: "Cafeteria Chronicles",
        caption: "Those quick lunch breaks that turned into hours of endless conversations."
    },
    {
        image: "IMG-20251203-WA0034.jpg",
        title: "Assignment Anxiety",
        caption: "Late nights, way too much coffee, and the stress of deadlines—we conquered them all together."
    },
    {
        image: "IMG-20251214-WA0023.jpg",
        title: "Exam Partners",
        caption: "Before every exam, our shared panic and last-minute revisions kept us going."
    },
    {
        image: "IMG-20260104-WA0141.jpg",
        title: "The “Us” Moments",
        caption: "The random outings, the bad jokes, and the laughter that only we understand."
    },
    {
        image: "IMG-20260722-WA0003.jpg",
        title: "Support System",
        caption: "When things got tough, you were the first person I called. Thank you for being my rock."
    },
    {
        image: "IMG-20260121-WA0015.jpg",
        title: "Shared Dreams",
        caption: "Late-night talks about our futures—I love that we’re dreaming big together."
    },
    {
        image: "IMG-20260107-WA0029.jpg",
        title: "Celebrating Wins",
        caption: "Every small accomplishment felt like a big victory because we shared the joy."
    },
    {
        image: "IMG-20260107-WA0026.jpg",
        title: "Growth",
        caption: "We’ve evolved, learned, and grown into better versions of ourselves side-by-side."
    },
    {
        image: "IMG-20260104-WA0179.jpg",
        title: "Beyond University",
        caption: "Life is constantly changing, but knowing you’re in it makes everything less scary."
    },
    {
        image: "IMG-20260104-WA0149.jpg",
        title: "Best Friends Forever",
        caption: "From day one until now, you are the best chapter of my university life. Happy Birthday, Mohona!"
    }
];

const gallery = document.getElementById("gallery");

if (gallery) {
    photos.forEach((photo) => {
        const card = document.createElement("article");
        card.className = "photo";

        card.innerHTML = `
            <img src="${photo.image}" alt="${photo.title}" loading="lazy">
            <div class="note">
                <h3>${photo.title}</h3>
                <p>${photo.caption}</p>
            </div>
        `;

        card.addEventListener("click", () => openLightbox(photo));
        gallery.appendChild(card);
    });
}


/* =========================
   SCREEN NAVIGATION
========================= */

function goToScreen(number) {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(`screen${number}`);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (number === 2 && typeof confetti === "function") {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: {
                y: 0.6
            }
        });
    }

    if (number === 2) {
        startBirthdayMusic();
    }
}

window.goToScreen = goToScreen;


/* =========================
   LIGHTBOX
========================= */

function openLightbox(photo) {
    const bigImage = document.getElementById("bigImage");
    const bigTitle = document.getElementById("bigTitle");
    const bigCaption = document.getElementById("bigCaption");
    const lightbox = document.getElementById("lightbox");

    if (!lightbox || !bigImage) {
        return;
    }

    bigImage.src = photo.image;

    if (bigTitle) {
        bigTitle.textContent = photo.title;
    }

    if (bigCaption) {
        bigCaption.textContent = photo.caption;
    }

    lightbox.style.display = "flex";
}

window.openLightbox = openLightbox;


function closeLightbox() {
    const lightbox = document.getElementById("lightbox");

    if (lightbox) {
        lightbox.style.display = "none";
    }
}

window.closeLightbox = closeLightbox;


document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
        closeGiftSurprise();
        closeCakeExperience();
    }
});


/* =========================
   BIRTHDAY WISHES
========================= */

let wishes = JSON.parse(
    localStorage.getItem("birthdayWishes") || "[]"
);


/* Remove accidental test comment */

wishes = wishes.filter(
    (wish) =>
        !(
            wish.name === "FARJANA RAHAMAN SAIMA" &&
            wish.message === "kuduycsuyd"
        )
);

localStorage.setItem(
    "birthdayWishes",
    JSON.stringify(wishes)
);


const wishForm = document.getElementById("wishForm");
const wishesBox = document.getElementById("wishes");


function renderWishes() {
    if (!wishesBox) {
        return;
    }

    wishesBox.innerHTML = "";

    [...wishes].reverse().forEach((wish, reversedIndex) => {

        const actualIndex = wishes.length - 1 - reversedIndex;

        const div = document.createElement("div");
        div.className = "wish";


        const name = document.createElement("strong");
        name.textContent = wish.name;


        const message = document.createElement("p");
        message.textContent = wish.message;


        const actions = document.createElement("div");
        actions.className = "wish-actions";


        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.type = "button";


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";


        editButton.onclick = () => {

            const edited = prompt(
                "Edit your birthday wish:",
                wishes[actualIndex].message
            );

            if (edited !== null && edited.trim()) {

                wishes[actualIndex].message = edited.trim();

                localStorage.setItem(
                    "birthdayWishes",
                    JSON.stringify(wishes)
                );

                renderWishes();
            }
        };


        deleteButton.onclick = () => {

            if (confirm("Delete this wish?")) {

                wishes.splice(actualIndex, 1);

                localStorage.setItem(
                    "birthdayWishes",
                    JSON.stringify(wishes)
                );

                renderWishes();
            }
        };


        actions.append(
            editButton,
            deleteButton
        );

        div.append(
            name,
            message,
            actions
        );

        wishesBox.appendChild(div);
    });
}


if (wishForm) {

    wishForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nameInput = document.getElementById("name");
        const messageInput = document.getElementById("message");

        if (!nameInput || !messageInput) {
            return;
        }

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (!name || !message) {
            return;
        }

        wishes.push({
            name: name,
            message: message
        });

        localStorage.setItem(
            "birthdayWishes",
            JSON.stringify(wishes)
        );

        wishForm.reset();

        renderWishes();
    });
}


renderWishes();


/* =========================
   YOUTUBE BIRTHDAY MUSIC
========================= */

const ytFrame = document.getElementById("ytPlayer");
const musicButton = document.getElementById("musicBtn");

let musicStarted = false;


function startBirthdayMusic() {

    if (!ytFrame || !ytFrame.contentWindow) {
        return;
    }

    try {

        ytFrame.contentWindow.postMessage(
            JSON.stringify({
                event: "command",
                func: "playVideo",
                args: []
            }),
            "https://www.youtube.com"
        );

        musicStarted = true;

        if (musicButton) {
            musicButton.textContent = "🔊";
        }

    } catch (error) {
        console.log("Music could not be started automatically.");
    }
}


if (musicButton) {

    musicButton.addEventListener("click", () => {

        if (!ytFrame) {
            alert("Music player is not available.");
            return;
        }

        if (!musicStarted) {

            startBirthdayMusic();

        } else {

            try {

                ytFrame.contentWindow.postMessage(
                    JSON.stringify({
                        event: "command",
                        func: "pauseVideo",
                        args: []
                    }),
                    "https://www.youtube.com"
                );

                musicStarted = false;
                musicButton.textContent = "🎵";

            } catch (error) {
                console.log("Music control error.");
            }
        }
    });
}


/* =========================
   GIFT SURPRISES
========================= */

const giftSurprises = {

    1: {
        kicker: "You opened the bouquet",
        title: "A Bouquet of Little Wishes 🌷",
        text: "Every flower here carries a wish for you: a peaceful heart, beautiful opportunities, genuine happiness, and a future that makes you proud.",

        visual: `
            <div class="flower-surprise">

                <div class="real-flower lily pink">
                    <span></span>
                </div>

                <div class="real-flower rose red">
                    <span></span>
                </div>

                <div class="real-flower orchid purple">
                    <span></span>
                </div>

                <div class="real-flower lily white">
                    <span></span>
                </div>

                <div class="real-flower rose yellow">
                    <span></span>
                </div>

                <div class="real-flower orchid white">
                    <span></span>
                </div>

            </div>
        `,

        decor: "Lilies, roses & orchids — in every colour, for a beautiful soul."
    },


    2: {
        kicker: "You opened the beauty box",
        title: "A Little Self-Care Treat 💄",
        text: "Inside this virtual box: confidence, good days, soft moments, and a reminder that you deserve to celebrate yourself too.",

        visual: "🪞  💄  ✨",

        decor: "Look in the mirror and remember how far you've come."
    },


    3: {
        kicker: "You opened the wish jar",
        title: "Your Wishes Are Safe Here ✨",
        text: "Imagine every little light inside this jar as one dream of yours. Keep going, keep believing, and keep making those dreams bigger.",

        visual: "✦  ✧  ✦",

        decor: "One day, these wishes will become memories."
    },


    4: {
        kicker: "You opened the special gift",
        title: "The Real Gift Is Our Friendship ❤️",
        text: "No ribbon can wrap this one. Through university, deadlines, exams, random conversations and everything still ahead, I hope our friendship stays one of your favorite chapters.",

        visual: "🎁  ♡  ✨",

        decor: "For all the chapters we haven't written yet."
    }

};


function openGiftSurprise(id) {

    const data = giftSurprises[id];

    if (!data) {
        return;
    }

    const kicker = document.getElementById("surpriseKicker");
    const title = document.getElementById("surpriseTitle");
    const text = document.getElementById("surpriseText");
    const visual = document.getElementById("surpriseVisual");
    const decor = document.getElementById("surpriseDecor");
    const modal = document.getElementById("giftSurprise");


    if (kicker) {
        kicker.textContent = data.kicker;
    }

    if (title) {
        title.textContent = data.title;
    }

    if (text) {
        text.textContent = data.text;
    }

    if (visual) {

        if (id === 1) {
            visual.innerHTML = data.visual;
        } else {
            visual.textContent = data.visual;
        }

    }

    if (decor) {
        decor.textContent = data.decor;
    }


    if (modal) {

        modal.style.display = "flex";

        modal.setAttribute(
            "aria-hidden",
            "false"
        );
    }
}


window.openGiftSurprise = openGiftSurprise;


function closeGiftSurprise() {

    const modal = document.getElementById("giftSurprise");

    if (modal) {

        modal.style.display = "none";

        modal.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}


window.closeGiftSurprise = closeGiftSurprise;


/* =========================
   VIRTUAL BIRTHDAY CAKE
========================= */

function getCandles() {

    return document.querySelectorAll(
        "#cakeExperience .candle"
    );
}


function openCakeExperience() {

    const modal =
        document.getElementById("cakeExperience");

    if (!modal) {
        return;
    }

    modal.style.display = "flex";

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    resetCake();
}


window.openCakeExperience =
    openCakeExperience;


function closeCakeExperience() {

    const modal =
        document.getElementById("cakeExperience");

    if (!modal) {
        return;
    }

    modal.style.display = "none";

    modal.setAttribute(
        "aria-hidden",
        "true"
    );
}


window.closeCakeExperience =
    closeCakeExperience;


function lightCandle(button) {

    if (!button) {
        return;
    }

    button.classList.add("lit");

    const candles = [...getCandles()];

    const allLit =
        candles.length > 0 &&
        candles.every(
            candle =>
                candle.classList.contains("lit")
        );


    const instruction =
        document.getElementById("cakeInstruction");


    if (!instruction) {
        return;
    }


    if (allLit) {

        instruction.textContent =
            "Make your wish... then cut the cake! ✨";

    } else {

        instruction.textContent =
            "One more little flame at a time... 🕯️";
    }
}


window.lightCandle =
    lightCandle;


function lightAllCandles() {

    getCandles().forEach(
        candle =>
            candle.classList.add("lit")
    );


    const instruction =
        document.getElementById("cakeInstruction");


    if (instruction) {

        instruction.textContent =
            "All the candles are glowing. Make your birthday wish! ✨";
    }
}


window.lightAllCandles =
    lightAllCandles;


function cutCake() {

    const candles = [...getCandles()];

    const allLit =
        candles.length > 0 &&
        candles.every(
            candle =>
                candle.classList.contains("lit")
        );


    const instruction =
        document.getElementById("cakeInstruction");


    if (!allLit) {

        if (instruction) {

            instruction.textContent =
                "Light all five candles before cutting the cake. 🕯️";
        }

        return;
    }


    const cakeScene =
        document.getElementById("bigCakeScene");

    const cakeResult =
        document.getElementById("cakeResult");

    const cutCakeButton =
        document.getElementById("cutCakeBtn");


    if (cakeScene) {

        cakeScene.classList.add(
            "cake-cut"
        );
    }


    if (cakeResult) {

        cakeResult.textContent =
            "🎉 Cake cut! May your wish come true, Mohona. Happy Birthday! ❤️";
    }


    if (cutCakeButton) {

        cutCakeButton.textContent =
            "Cake Cut ✓";
    }


    if (typeof confetti === "function") {

        confetti({
            particleCount: 180,
            spread: 100,
            origin: {
                y: 0.58
            }
        });
    }
}


window.cutCake =
    cutCake;


function resetCake() {

    getCandles().forEach(
        candle =>
            candle.classList.remove("lit")
    );


    const cakeScene =
        document.getElementById("bigCakeScene");

    const instruction =
        document.getElementById("cakeInstruction");

    const result =
        document.getElementById("cakeResult");

    const cutCakeButton =
        document.getElementById("cutCakeBtn");


    if (cakeScene) {

        cakeScene.classList.remove(
            "cake-cut"
        );
    }


    if (instruction) {

        instruction.textContent =
            "Light the candles first.";
    }


    if (result) {

        result.textContent = "";
    }


    if (cutCakeButton) {

        cutCakeButton.textContent =
            "Cut the Cake 🎂";
    }
}


window.resetCake =
    resetCake;
