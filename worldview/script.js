let chapter_number

const chapters = [
    {first_name: "Глава I",
     second_name: "Картина мира",
     link: "chapter1.html"},
    {first_name: "Глава II",
     second_name: "Билингвизм",
     link: "chapter2.html"},
    {first_name: "Глава III",
     second_name: "Лакунарность",
     link: "chapter3.html"},
    {first_name: "Глава IV",
     second_name: "Язык и культура",
     link: "chapter4.html"},
    {first_name: "Глава V",
     second_name: "Концепт",
     link: "chapter5.html"}
]

const nav = document.querySelector("nav")
const top_nav = document.querySelector(".topnav")
const main = document.querySelector("main")
const menu_button = document.getElementById("menu-button")
const back_button = document.getElementById("back-button")
const next_button = document.getElementById("next-button")

function determineChapterNumber() {
    const meta = document.querySelector("meta[itemprop=\"chapter\"]")
    chapter_number = +meta.getAttribute("content")
}

function closeNav() {
    nav.classList.remove("extended");
    nav.classList.add("collapsed");

    main.classList.remove("nav-extended")
    top_nav.classList.remove("nav-extended")
    next_button.classList.remove("nav-extended")
    back_button.classList.remove("nav-extended")
    menu_button.classList.remove("active")
}

function openNav() {
    nav.classList.remove("collapsed");
    nav.classList.add("extended");

    main.classList.add("nav-extended")
    top_nav.classList.add("nav-extended")
    next_button.classList.add("nav-extended")
    back_button.classList.add("nav-extended")
    menu_button.classList.add("active")
}

function toggleNav() {
    if(nav.classList.contains("extended"))
        closeNav()
    else
        openNav()
}

function constructTopNav() {
    if(chapter_number > 0) {
        const chapter = chapters[chapter_number - 1]

        const content = document.querySelector("#back-button .content")
        content.append(chapter.first_name)

        const button = document.getElementById("back-button")
        button.setAttribute("href", chapter.link)
        button.classList.remove("hidden")
    }

    if(chapter_number + 1 < chapters.length) {
        const chapter = chapters[chapter_number + 1]

        const content = document.querySelector("#next-button .content")
        content.append(chapter.first_name)

        const button = document.getElementById("next-button")
        button.setAttribute("href", chapter.link)
        button.classList.remove("hidden")
    }

    menu_button.addEventListener("click", toggleNav)
}

function constructChapterEntry(chapter) {
    const entry = document.createElement("a")
    entry.classList.add("chapter_entry")
    entry.setAttribute("href", chapter.link)

    const first_name = document.createElement("div")
    first_name.classList.add("first_name")
    first_name.append(chapter.first_name)

    const second_name = document.createElement("div")
    second_name.classList.add("second_name")
    second_name.append(chapter.second_name)

    entry.append(first_name)
    entry.append(second_name)
    nav.append(entry)
}

function constructNav() {
    for(chapter of chapters) {
        constructChapterEntry(chapter)
    }
}

function construct() {
    determineChapterNumber()

    constructTopNav()
    constructNav()

    main.addEventListener("click", () => {
        if(nav.classList.contains("extended"))
            closeNav()
    })
}

construct()
