document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const loginModal = document.getElementById("loginModal");
    const closeLoginModal = document.getElementById("closeLoginModal");
    const loginForm = document.getElementById("loginForm");

    // عناصر القائمة الجانبية
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const sideDrawer = document.getElementById("sideDrawer");
    const drawerOverlay = document.getElementById("drawerOverlay");
    const closeDrawer = document.getElementById("closeDrawer");
    const drawerUsername = document.getElementById("drawerUsername");
    const drawerUserBio = document.getElementById("drawerUserBio");

    // زر "لنبدأ"
    if (startBtn && welcomeScreen && loginModal) {
        startBtn.addEventListener("click", function() {
            welcomeScreen.style.opacity = "0";
            setTimeout(() => {
                welcomeScreen.style.display = "none";
                loginModal.style.display = "flex";
            }, 500);
        });
    }

    // تخطي تسجيل الدخول
    if (closeLoginModal && loginModal) {
        closeLoginModal.addEventListener("click", function() {
            loginModal.style.display = "none";
        });
    }

    // تسجيل الدخول وجلب الاسم والبايو المدخلين وعرضهما في القائمة الجانبية
    if (loginForm && loginModal) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("loginUser").value.trim();
            const bio = document.getElementById("loginBio").value.trim();
            
            if(username !== "") {
                drawerUsername.textContent = username;
                drawerUserBio.textContent = bio || "شاعر وباحث في الأدب العربي...";
                loginModal.style.display = "none";
            }
        });
    }

    // فتح وإغلاق القائمة الجانبية عند الضغط على الخطوط الثلاثة
    if (menuToggleBtn && sideDrawer && drawerOverlay) {
        menuToggleBtn.addEventListener("click", function() {
            sideDrawer.classList.add("open");
            drawerOverlay.classList.add("open");
        });
    }

    if (closeDrawer && sideDrawer && drawerOverlay) {
        closeDrawer.addEventListener("click", function() {
            sideDrawer.classList.remove("open");
            drawerOverlay.classList.remove("open");
        });
    }

    if (drawerOverlay && sideDrawer) {
        drawerOverlay.addEventListener("click", function() {
            sideDrawer.classList.remove("open");
            drawerOverlay.classList.remove("open");
        });
    }

    // نافذة كتابة نص جديد
    const modal = document.getElementById("writeModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeWriteModal = document.getElementById("closeWriteModal");
    const publishBtn = document.getElementById("publishBtn");
    const postTitle = document.getElementById("postTitle");
    const postContent = document.getElementById("postContent");
    const postsContainer = document.getElementById("postsContainer");

    if (openModalBtn && modal) {
        openModalBtn.addEventListener("click", () => { modal.style.display = "flex"; });
    }
    if (closeWriteModal && modal) {
        closeWriteModal.addEventListener("click", () => { modal.style.display = "none"; });
    }

    if (publishBtn) {
        publishBtn.addEventListener("click", function() {
            const title = postTitle.value.trim();
            const content = postContent.value.trim();
            if (title === "" || content === "") {
                alert("الرجاء كتابة العنوان والمحتوى قبل النشر.");
                return;
            }
            const postCard = document.createElement("div");
            postCard.className = "competition-card";
            postCard.innerHTML = `
                <div class="card-body">
                    <h3 style="color:#d4af37; margin-bottom:6px;">${title}</h3>
                    <p style="white-space: pre-wrap;">${content}</p>
                    <span style="font-size: 11px; color: #888; display: inline-block; margin-top: 8px;">بواسطة الكاتب • الآن</span>
                </div>
            `;
            postsContainer.prepend(postCard);
            postTitle.value = "";
            postContent.value = "";
            modal.style.display = "none";
        });
    }
});
