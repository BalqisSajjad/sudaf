// التحكم في زر الدخول من شاشة الترحيب
document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const welcomeScreen = document.getElementById("welcomeScreen");

    if (startBtn && welcomeScreen) {
        startBtn.addEventListener("click", function() {
            welcomeScreen.style.opacity = "0";
            welcomeScreen.style.transition = "opacity 0.5s ease";
            setTimeout(function() {
                welcomeScreen.style.display = "none";
            }, 500);
        });
    }
});

