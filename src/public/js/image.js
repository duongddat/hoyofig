document.addEventListener('DOMContentLoaded', function () {
    const readURL = (input) => {
        if (input.files && input.files[0]) {
            let reader = new FileReader();

            reader.onload = function (e) {
                $("#imgPreview").attr('src', e.target.result).width(100).height(100);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#image").change(function () {
        readURL(this);
    });
})