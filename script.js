
// SECRET SPACE FOLDERS

const folders = [
    {
        id: "memories",
        icon: "✿",
        title: "Best Memories",
        description: "Little moments I wish could last forever.",
        prompt: "What is a memory that makes you smile every time you remember it?",
        quote: "Some moments become beautiful memories."
    },
    {
        id: "metime",
        icon: "☁",
        title: "Me Time Arrangements",
        description: "Little dates and beautiful moments with myself.",
        prompt: "Plan your perfect day. What would make you feel happy and relaxed?",
        quote: "You deserve time for yourself too."
    },
    {
        id: "friendship",
        icon: "♡",
        title: "Friendship Diary",
        description: "My favourite people and unforgettable stories.",
        prompt: "Write about your favourite friendship memory, inside jokes or people you appreciate.",
        quote: "Good friends make ordinary moments special."
    },
    {
        id: "feelings",
        icon: "✧",
        title: "Unspoken Feelings",
        description: "Everything I wish I could put into words.",
        prompt: "If you could express something without worrying about anyone's reaction, what would you say?",
        quote: "Your feelings deserve to be heard."
    },
    {
        id: "emotional",
        icon: "☾",
        title: "Emotional Setter",
        description: "A little check-in with my heart and mind.",
        prompt: "How are you feeling today? What do you need right now?",
        quote: "It is okay to take things one day at a time."
    },
    {
        id: "midnight",
        icon: "☆",
        title: "Midnight Thoughts",
        description: "Random thoughts, dreams and little wonders.",
        prompt: "What is going through your mind tonight? Write without worrying about grammar or structure.",
        quote: "Not every thought needs an answer tonight."
    },
    {
        id: "crush",
        icon: "♡",
        title: "Crush Corner",
        description: "A little corner for butterflies and daydreams.",
        prompt: "What little moment made you smile? What qualities do you admire?",
        quote: "Keep a little room for happy butterflies."
    },
    {
        id: "ask",
        icon: "？",
        title: "Ask Anything",
        description: "Questions, curiosity and discovering myself.",
        prompt: "Ask yourself anything. What do you dream about? What do you want to discover?",
        quote: "Never stop being curious about life."
    }
];


// DAILY KIND QUOTES

const quotes = [
    "You deserve all the little happiness life has to offer.",
    "You are growing beautifully, even on quiet days.",
    "Your story is still unfolding. Be patient.",
    "You don't need to be perfect to be wonderful.",
    "One day, you will thank yourself for not giving up.",
    "You deserve the kindness you give everyone else.",
    "Little steps still take you somewhere beautiful.",
    "Make yourself a priority sometimes."
];

document.getElementById("quote").textContent =
    '"' + quotes[new Date().getDate() % quotes.length] + '"';


// DISPLAY FOLDERS

const container = document.getElementById("folderContainer");

function displayFolders() {

    container.innerHTML = "";

    folders.forEach((folder, index) => {

        const card = document.createElement("div");

        card.className = "folder";

        card.style.animationDelay = (index * 0.08) + "s";

        card.innerHTML = `
            <span class="folder-icon">${folder.icon}</span>

            <h3>${folder.title}</h3>

            <p>${folder.description}</p>

            <span class="continue">CONTINUE →</span>
        `;

        card.addEventListener("click", () => {
            openFolder(folder.id);
        });

        container.appendChild(card);

    });
}


// OPEN INDIVIDUAL JOURNAL PAGE

let currentFolder = "";

function openFolder(id) {

    const folder = folders.find(item => item.id === id);

    if (!folder) return;

    currentFolder = id;

    document.getElementById("journalTitle").textContent =
        folder.title;

    document.getElementById("journalDescription").textContent =
        folder.prompt;

    document.getElementById("kindQuote").textContent =
        folder.quote;

    document.getElementById("entryTitle").value = "";

    document.getElementById("entryText").value = "";

    document.getElementById("saveMessage").textContent =
        "Your little memories matter ♡";

    showEntries();

    const overlay = document.getElementById("journalOverlay");

    overlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


// GO BACK TO HOME PAGE

function goBack() {

    document.getElementById("journalOverlay")
        .classList.remove("active");

    document.body.style.overflow = "";

}


// SAVE JOURNAL ENTRIES

function getSavedData() {

    try {
        return JSON.parse(
            localStorage.getItem("secretSpaceData") || "{}"
        );
    } catch {
        return {};
    }

}

function saveEntry() {

    const title = document.getElementById("entryTitle").value.trim();

    const text = document.getElementById("entryText").value.trim();

    const message = document.getElementById("saveMessage");

    if (text === "") {

        message.textContent = "Write a little something first ♡";

        return;
    }

    const data = getSavedData();

    if (!data[currentFolder]) {
        data[currentFolder] = [];
    }

    data[currentFolder].unshift({

        title: title || "A Little Memory",

        text: text,

        date: new Date().toLocaleString()

    });

    try {

        localStorage.setItem(
            "secretSpaceData",
            JSON.stringify(data)
        );

    } catch {

        message.textContent = "Storage is full. Please clear some old entries.";

        return;
    }

    document.getElementById("entryTitle").value = "";

    document.getElementById("entryText").value = "";

    message.textContent = "Your little entry has been saved! ✧";

    showEntries();

}


// DISPLAY SAVED ENTRIES

function showEntries() {

    const data = getSavedData();

    const entries = data[currentFolder] || [];

    const display = document.getElementById("savedEntries");

    if (entries.length === 0) {

        display.innerHTML = `
            <p style="color:#aaa;font-size:12px;margin-top:20px;">
                Your saved memories will appear here ♡
            </p>
        `;

        return;
    }

    display.innerHTML = "<h3>Your Little Archive ♡</h3>";

    entries.forEach(entry => {

        const article = document.createElement("article");

        article.className = "saved-entry";

        const heading = document.createElement("strong");

        heading.textContent = entry.title;

        const date = document.createElement("small");

        date.textContent = " · " + entry.date;

        const paragraph = document.createElement("p");

        paragraph.textContent = entry.text;

        article.append(heading, date, paragraph);

        display.appendChild(article);

    });

}


// CLOSE PAGE USING ESCAPE KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        goBack();
    }

});


// CLOSE PAGE WHEN CLICKING OUTSIDE

document.getElementById("journalOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            goBack();
        }

    });


// START WEBSITE

displayFolders();
