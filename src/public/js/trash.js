// Loaded content dom
document.addEventListener('DOMContentLoaded', function () {

    //================== Delete product ===================
    var productId;
    var deleteForm = document.forms['delete-product-form'];
    var restoreForm = document.forms['restore-course-form'];
    var btnDeleteProduct = document.getElementById('btn-delete-product');
    var restoredBtn = $('.btn-restored');

    //When dialog confirm clicked
    $('#delete-product-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        productId = button.data('id');

        console.log(productId);
    });

    // When delete course btn clicked
    btnDeleteProduct.onclick = function () {
        deleteForm.action = '/admin/trash/delete-product/' + productId + '?_method=DELETE';
        deleteForm.submit();
    }

    //Restore btn click (with JQuery)
    restoredBtn.click(function (e) {
        e.preventDefault();

        var courseId = $(this).data('id');
        restoreForm.action = '/admin/trash/restore-product/' + courseId + '?_method=PATCH';
        restoreForm.submit();
    });
});