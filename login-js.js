// Toggle password visibility
$(document).ready(function() {
    $(".password-toggle").click(function() {
        const passwordInput = $(this).closest('.input-group').find('input');
        const icon = $(this).find('i');
        
        if (passwordInput.attr("type") === "password") {
            passwordInput.attr("type", "text");
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
        } else {
            passwordInput.attr("type", "password");
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        }
    });
});
