const photos = [{'image': 'images/IMG-20250707-WA0000.jpg', 'title': 'The First Hello', 'caption': 'That nervous, shy smile on our very first day at university. Who knew we’d become inseparable?'}, {'image': 'images/IMG-20250923-WA0097.jpg', 'title': 'Shared Notes', 'caption': 'The first time I asked to borrow your notes because I was lost. Thank you for always helping me out.'}, {'image': 'images/IMG-20251123-WA0009.jpg', 'title': 'Cafeteria Chronicles', 'caption': 'Those quick lunch breaks that turned into hours of endless conversations.'}, {'image': 'images/IMG-20251203-WA0034.jpg', 'title': 'Assignment Anxiety', 'caption': 'Late nights, way too much coffee, and the stress of deadlines—we conquered them all together.'}, {'image': 'images/IMG-20251214-WA0023.jpg', 'title': 'Exam Partners', 'caption': 'Before every exam, our shared panic and last-minute revisions kept us going.'}, {'image': 'images/IMG-20260104-WA0141.jpg', 'title': 'The “Us” Moments', 'caption': 'The random outings, the bad jokes, and the laughter that only we understand.'}, {'image': 'images/IMG-20260722-WA0003.jpg', 'title': 'Support System', 'caption': 'When things got tough, you were the first person I called. Thank you for being my rock.'}, {'image': 'images/IMG-20260121-WA0015.jpg', 'title': 'Shared Dreams', 'caption': 'Late-night talks about our futures—I love that we’re dreaming big together.'}, {'image': 'images/IMG-20260107-WA0029.jpg', 'title': 'Celebrating Wins', 'caption': 'Every small accomplishment felt like a big victory because we shared the joy.'}, {'image': 'images/IMG-20260107-WA0026.jpg', 'title': 'Growth', 'caption': 'We’ve evolved, learned, and grown into better versions of ourselves side-by-side.'}, {'image': 'images/IMG-20260104-WA0179.jpg', 'title': 'Beyond University', 'caption': 'Life is constantly changing, but knowing you’re in it makes everything less scary.'}, {'image': 'images/IMG-20260104-WA0149.jpg', 'title': 'Best Friends Forever', 'caption': 'From day one until now, you are the best chapter of my university life. Happy Birthday, Mohona!'}];
const gallery = document.getElementById("gallery");

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

function goToScreen(number) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(`screen${number}`);
    if (target) target.classList.add("active");
    window.scrollTo({top:0, behavior:"smooth"});
    if (number === 2 && typeof confetti === "function") {
        confetti({particleCount:120, spread:80, origin:{y:.6}});
    }
}

function openLightbox(photo) {
    document.getElementById("bigImage").src = photo.image;
    document.getElementById("bigTitle").textContent = photo.title;
    document.getElementById("bigCaption").textContent = photo.caption;
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

let wishes = JSON.parse(localStorage.getItem("birthdayWishes") || "[]");

/* Remove the accidental test comment */
wishes = wishes.filter(
    w => !(w.name === "FARJANA RAHAMAN SAIMA" && w.message === "kuduycsuyd")
);
localStorage.setItem("birthdayWishes", JSON.stringify(wishes));

const wishForm = document.getElementById("wishForm");
const wishesBox = document.getElementById("wishes");

function renderWishes() {
    wishesBox.innerHTML = "";

    [...wishes].reverse().forEach((w, reversedIndex) => {
        const actualIndex = wishes.length - 1 - reversedIndex;

        const div = document.createElement("div");
        div.className = "wish";

        const name = document.createElement("strong");
        name.textContent = w.name;

        const msg = document.createElement("p");
        msg.textContent = w.message;

        const actions = document.createElement("div");
        actions.className = "wish-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.type = "button";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";

        editBtn.onclick = () => {
            const edited = prompt("Edit your birthday wish:", wishes[actualIndex].message);
            if (edited !== null && edited.trim()) {
                wishes[actualIndex].message = edited.trim();
                localStorage.setItem("birthdayWishes", JSON.stringify(wishes));
                renderWishes();
            }
        };

        deleteBtn.onclick = () => {
            if (confirm("Delete this wish?")) {
                wishes.splice(actualIndex, 1);
                localStorage.setItem("birthdayWishes", JSON.stringify(wishes));
                renderWishes();
            }
        };

        actions.append(editBtn, deleteBtn);
        div.append(name, msg, actions);
        wishesBox.appendChild(div);
    });
}

wishForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) return;

    wishes.push({ name, message });
    localStorage.setItem("birthdayWishes", JSON.stringify(wishes));
    wishForm.reset();
    renderWishes();
});

renderWishes();

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        if (!music.src) {
            alert("Music is not added yet. We can add a birthday song in the next step.");
            return;
        }
        music.play();
        musicBtn.textContent = "🔊";
    } else {
        music.pause();
        musicBtn.textContent = "🎵";
    }
});


/* ===== Gift surprises ===== */

const giftSurprises = {
    1: {
        kicker: "You opened the bouquet",
        title: "A Bouquet of Little Wishes 🌷",
        text: "Every flower here carries a wish for you: a peaceful heart, beautiful opportunities, genuine happiness, and a future that makes you proud.",
        visual: `
            <div class="flower-surprise">
                <div class="real-flower lily pink"><span></span></div>
                <div class="real-flower rose red"><span></span></div>
                <div class="real-flower orchid purple"><span></span></div>
                <div class="real-flower lily white"><span></span></div>
                <div class="real-flower rose yellow"><span></span></div>
                <div class="real-flower orchid white"><span></span></div>
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

window.openGiftSurprise = function(id) {
    const data = giftSurprises[id];
    if (!data) return;

    document.getElementById("surpriseKicker").textContent = data.kicker;
    document.getElementById("surpriseTitle").textContent = data.title;
    document.getElementById("surpriseText").textContent = data.text;
    document.getElementById("surpriseVisual").textContent = data.visual;
    document.getElementById("surpriseDecor").textContent = data.decor;

    const modal = document.getElementById("giftSurprise");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
};

window.closeGiftSurprise = function() {
    const modal = document.getElementById("giftSurprise");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
};

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeGiftSurprise();
});

/* ===== Persistent YouTube background music ===== */

const ytFrame = document.getElementById("ytPlayer");

function startBirthdayMusic() {
    if (!ytFrame) return;

    ytFrame.contentWindow.postMessage(
        JSON.stringify({
            event: "command",
            func: "playVideo",
            args: []
        }),
        "https://www.youtube.com"
    );
}

/* Start music from the first user gesture so browser autoplay restrictions are respected. */
const originalGoToScreen = window.goToScreen;

window.goToScreen = function(number) {
    if (number === 2) {
        startBirthdayMusic();
    }
    return originalGoToScreen(number);
};


/* ===== Flower surprise renderer ===== */
const originalOpenGiftSurprise = window.openGiftSurprise;
window.openGiftSurprise = function(id) {
    originalOpenGiftSurprise(id);
    if (id === 1) {
        const visual = document.getElementById("surpriseVisual");
        if (visual) {
            visual.innerHTML = giftSurprises[1].visual;
        }
    }
};

/* ===== Virtual birthday cake ===== */
function getCandles() {
    return document.querySelectorAll("#cakeExperience .candle");
}

window.openCakeExperience = function() {
    const modal = document.getElementById("cakeExperience");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    resetCake();
};

window.closeCakeExperience = function() {
    const modal = document.getElementById("cakeExperience");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
};

window.lightCandle = function(button) {
    button.classList.add("lit");
    const allLit = [...getCandles()].every(c => c.classList.contains("lit"));
    if (allLit) {
        document.getElementById("cakeInstruction").textContent =
            "Make your wish... then cut the cake! ✨";
    } else {
        document.getElementById("cakeInstruction").textContent =
            "One more little flame at a time... 🕯️";
    }
};

window.lightAllCandles = function() {
    getCandles().forEach(c => c.classList.add("lit"));
    document.getElementById("cakeInstruction").textContent =
        "All the candles are glowing. Make your birthday wish! ✨";
};

window.cutCake = function() {
    const allLit = [...getCandles()].every(c => c.classList.contains("lit"));
    if (!allLit) {
        document.getElementById("cakeInstruction").textContent =
            "Light all five candles before cutting the cake. 🕯️";
        return;
    }

    document.getElementById("bigCakeScene").classList.add("cake-cut");
    document.getElementById("cakeResult").textContent =
        "🎉 Cake cut! May your wish come true, Mohona. Happy Birthday! ❤️";
    document.getElementById("cutCakeBtn").textContent = "Cake Cut ✓";
    if (typeof confetti === "function") {
        confetti({ particleCount: 180, spread: 100, origin: { y: 0.58 } });
    }
};

window.resetCake = function() {
    getCandles().forEach(c => c.classList.remove("lit"));
    document.getElementById("bigCakeScene").classList.remove("cake-cut");
    document.getElementById("cakeInstruction").textContent = "Light the candles first.";
    document.getElementById("cakeResult").textContent = "";
    document.getElementById("cutCakeBtn").textContent = "Cut the Cake 🎂";
};

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCakeExperience();
    }
});
