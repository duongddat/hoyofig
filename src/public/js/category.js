// Loaded content dom
document.addEventListener('DOMContentLoaded', function () {

    //================== Delete category ===================
    var categoryId;
    var deleteForm = document.forms['delete-category-form'];
    var btnDeleteCategory = document.getElementById('btn-delete-category');

    //When dialog confirm clicked
    $('#delete-category-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        categoryId = button.data('id');

        // console.log(categoryId);
    });

    // When delete course btn clicked
    btnDeleteCategory.onclick = function () {
        deleteForm.action = '/admin/categories/delete-category/' + categoryId + '?_method=DELETE';
        deleteForm.submit();
    }
});