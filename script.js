document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("startBtn");
    const welcomeScreen = document.getElementById("welcomeScreen");
    const loginScreen = document.getElementById("loginScreen");
    const loginForm = document.getElementById("loginForm");

    // عند الضغط على "لنبدأ" تختفي شاشة الترحيب وتظهر واجهة تسجيل الدخول
    if (startBtn && welcomeScreen && loginScreen) {
        startBtn.addEventListener("click", function() {
            welcomeScreen.style.opacity = "0";
            setTimeout(() => {
                welcomeScreen.style.display = "none";
                loginScreen.style.display = "flex"; // إظهار تسجيل الدخول
            }, 500);
        });
    }

    // عند إتمام تسجيل الدخول بنجاح
    if (loginForm && loginScreen) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const username = document.getElementById("loginUser").value.trim();
            if(username !== "") {
                loginScreen.style.opacity = "0";
                setTimeout(() => {
                    loginScreen.style.display = "none";
                }, 500);
            }
        });
    }

    // القائمة الجانبية للمشرفين
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const sidebarMenu = document.getElementById("sidebarMenu");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const closeSidebarBtn = document.getElementById("closeSidebarBtn");

    function toggleSidebar() {
        sidebarMenu.classList.toggle("active");
        sidebarOverlay.style.display = sidebarMenu.classList.contains("active") ? "block" : "none";
    }

    if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener("click", toggleSidebar);

    // غرفة الإدارة
    const openAdminRoom = document.getElementById("openAdminRoom");
    const adminModal = document.getElementById("adminModal");
    const closeAdminRoom = document.getElementById("closeAdminRoom");
    const adminSendBtn = document.getElementById("adminSendBtn");
    const adminInputText = document.getElementById("adminInputText");
    const adminMessagesContainer = document.getElementById("adminMessagesContainer");

    if (openAdminRoom) {
        openAdminRoom.addEventListener("click", function(e) {
            e.preventDefault();
            sidebarMenu.classList.remove("active");
            sidebarOverlay.style.display = "none";
            adminModal.style.display = "flex";
        });
    }
    if (closeAdminRoom) {
        closeAdminRoom.addEventListener("click", function() {
            adminModal.style.display = "none";
        });
    }
    if (adminSendBtn) {
        adminSendBtn.addEventListener("click", function() {
            const txt = adminInputText.value.trim();
            if(txt !== "") {
                const msgDiv = document.createElement("div");
                msgDiv.style.cssText = "background: #fff; padding: 12px; border-radius: 8px; margin-bottom: 10px; font-size: 13px; border-right: 4px solid #d4af37;";
                msgDiv.innerHTML = `<b>المشرف:</b> ${txt}`;
                adminMessagesContainer.appendChild(msgDiv);
                adminInputText.value = "";
                adminMessagesContainer.scrollTop = adminMessagesContainer.scrollHeight;
            }
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
