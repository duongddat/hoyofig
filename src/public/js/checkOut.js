// Loaded content dom
document.addEventListener('DOMContentLoaded', function () {
    //Btn click steps
    let productId;
    const btn = $(".btn-quantity");
    const btnDelete = $(".btn-delete");
    var handleActionForm = document.forms['action-cart-form'];


    btn.on("click", function (event) {
        event.preventDefault();
        productId = $(this).attr("data-id");
        let id = $(this).attr("id");

        if (id === "decrement") {
            handleActionForm.action = '/cart/update/' + productId + '?action=decrement';
        } else if (id === "increment") {
            handleActionForm.action = '/cart/update/' + productId + '?action=increment';
        }
        handleActionForm.submit();
    });

    btnDelete.on("click", function (event) {
        event.preventDefault();
        productId = $(this).attr("data-id");

        handleActionForm.action = '/cart/update/' + productId + '?action=delete';
        handleActionForm.submit();
    });

    console.log(handleActionForm);
});