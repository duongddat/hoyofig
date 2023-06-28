// Loaded content dom
document.addEventListener('DOMContentLoaded', function () {

    //================== Delete product ===================
    var productId;
    var deleteForm = document.forms['delete-product-form'];
    var btnDeleteProduct = document.getElementById('btn-delete-product');

    //When dialog confirm clicked
    $('#delete-product-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        productId = button.data('id');

        console.log(productId);
    });

    // When delete course btn clicked
    // btnDeleteProduct.onclick = function () {
    //     deleteForm.action = '/admin/products/delete-product/' + productId + '?_method=DELETE';
    //     deleteForm.submit();
    // }
});