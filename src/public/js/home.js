const handlePre = (event) => {
    const currentPage = window.location.href;
    const lastCharacter = currentPage.slice(-1);

    if (!lastCharacter.match(/[0-9]/)) {
        event.target.setAttribute("href", "?page=1");
    } else {
        if (lastCharacter === '1') {
            event.target.setAttribute("href", "?page=1");
        } else {
            const newHref = "?page=" + (parseInt(lastCharacter) - 1)
            event.target.setAttribute("href", newHref);
        }
    }
}

const handleNext = (event, size) => {
    const currentPage = window.location.href;
    const lastCharacter = currentPage.slice(-1);

    if (!lastCharacter.match(/[0-9]/)) {
        event.target.setAttribute("href", "?page=2");
    } else {
        if (lastCharacter === size) {
            event.target.setAttribute("href", "?page=" + size);
        } else {
            const newHref = "?page=" + (parseInt(lastCharacter) + 1);
            event.target.setAttribute("href", newHref);
        }
    }
}