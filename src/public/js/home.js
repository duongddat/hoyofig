const handlePre = (event, page) => {
    if (page === '1') {
        event.target.setAttribute("href", "?page=1");
    } else {
        const newHref = "?page=" + (parseInt(page) - 1)
        event.target.setAttribute("href", newHref);
    }
}

const handleNext = (event, page, size) => {
    if (page === size) {
        event.target.setAttribute("href", "?page=" + size);
    } else {
        const newHref = "?page=" + (parseInt(page) + 1);
        event.target.setAttribute("href", newHref);
    }
}