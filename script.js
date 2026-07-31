document.addEventListener("DOMContentLoaded", function() {
    // عناصر القائمة الجانبية (Drawer)
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const sideDrawer = document.getElementById("sideDrawer");
    const closeDrawer = document.querySelector(".close-drawer");
    const bottomProfileBtn = document.getElementById("bottomProfileBtn");

    // فتح القائمة الجانبية من زر الثلاث خطوط أو زر الحساب السفلي
    function openDrawer() {
        sideDrawer.classList.add("open");
        loadUserData();
    }

    menuToggleBtn.addEventListener("click", openDrawer);
    if(bottomProfileBtn) {
        bottomProfileBtn.addEventListener("click", function(e) {
            e.preventDefault();
            openDrawer();
        });
    }

    // إغلاق القائمة الجانبية
    closeDrawer.addEventListener("click", function() {
        sideDrawer.classList.remove("open");
    });

    // إدارة البايو (النبرة التعريفية) وحفظها محلياً
    const authorBioInput = document.getElementById("authorBio");
    const saveBioBtn = document.getElementById("saveBioBtn");

    saveBioBtn.addEventListener("click", function() {
        const bioText = authorBioInput.value;
        localStorage.setItem("sudaf_author_bio", bioText);
        alert("تم حفظ البايو بنجاح!");
    });

    function loadUserData() {
        const savedBio = localStorage.getItem("sudaf_author_bio");
        if(savedBio) {
            authorBioInput.value = savedBio;
        }
        updateStats();
    }

    // عناصر نافذة كتابة النصوص والنشر
    const modal = document.getElementById("writeModal");
    const openBtn = document.getElementById("openModalBtn");
    const closeBtn = document.querySelector(".close-btn");
    const publishBtn = document.getElementById("publishBtn");
    const postsContainer = document.getElementById("postsContainer");

    openBtn.addEventListener("click", function() {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    loadPosts();

    publishBtn.addEventListener("click", function() {
        const title = document.getElementById("postTitle").value.trim();
        const content = document.getElementById("postContent").value.trim();

        if (title === "" || content === "") {
            alert("الرجاء كتابة العنوان ومحتوى النص قبل النشر.");
            return;
        }

        const newPost = { title, content };
        savePostToLocalStorage(newPost);

        document.getElementById("postTitle").value = "";
        document.getElementById("postContent").value = "";
        modal.style.display = "none";

        loadPosts();
        updateStats();
    });

    function savePostToLocalStorage(post) {
        let posts = JSON.parse(localStorage.getItem("sudaf_posts")) || [];
        posts.unshift(post);
        localStorage.setItem("sudaf_posts", JSON.stringify(posts));
    }

    function loadPosts() {
        postsContainer.innerHTML = "";
        let posts = JSON.parse(localStorage.getItem("sudaf_posts")) || [];

        if (posts.length === 0) {
            postsContainer.innerHTML = `<p style="color: #666; font-size: 12px; text-align: center;">لا توجد منشورات حالياً، كن أول من يكتب!</p>`;
            return;
        }

        posts.forEach(post => {
            const postCard = document.createElement("div");
            postCard.className = "user-post-card";
            postCard.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postCard);
        });
    }

    // تحديث عداد المنشورات في الملف الشخصي تلقائياً
    function updateStats() {
        let posts = JSON.parse(localStorage.getItem("sudaf_posts")) || [];
        const statPostsCount = document.getElementById("statPostsCount");
        if(statPostsCount) {
            statPostsCount.textContent = posts.length;
        }
    }
});

