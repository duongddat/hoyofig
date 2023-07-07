const handlePre = (event) => {
    const currentPage = window.location.href;

    if (currentPage.length < 29) {
        event.target.setAttribute("href", "?page=1");
    } else {
        const page = currentPage.slice(28, 29);
        if (page === '1') {
            event.target.setAttribute("href", "?page=1");
        } else {
            const newHref = "?page=" + (parseInt(page) - 1)
            event.target.setAttribute("href", newHref);
        }
    }
}

const handleNext = (event, size) => {
    const currentPage = window.location.href;

    if (currentPage.length < 29) {
        event.target.setAttribute("href", "?page=2");
    } else {
        const page = currentPage.slice(28, 29);
        if (page === size) {
            event.target.setAttribute("href", "?page=" + size);
        } else {
            const newHref = "?page=" + (parseInt(page) + 1);
            event.target.setAttribute("href", newHref);
        }
    }
}