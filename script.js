// 1. تفعيل الإعجاب وزيادة وتناقص العداد لحظياً
function toggleLike(button) {
  const countSpan = button.querySelector('.likes-count');
  let currentLikes = parseInt(countSpan.textContent);
  
  if (button.classList.contains('liked')) {
    button.classList.remove('liked');
    currentLikes -= 1;
  } else {
    button.classList.add('liked');
    currentLikes += 1;
  }
  countSpan.textContent = currentLikes;
}

// 2. دالة فتح نافذة التعليقات
function openComments(button) {
  alert("جاري فتح قسم التعليقات في منصة سُدف...");
}

// 3. دالة إعادة النشر (Repost)
function repostPost(button) {
  alert("تمت إعادة نشر النص بنجاح في منصة سُدف!");
}

// 4. دالة معالجة اختيار الخلفية المتحركة وصلاحيات المشرفين والمالكين
function handleCoverUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // التحقق من الرتبة (يتم السماح للـ owner والـ admin بشكل افتراضي هنا)
  const userRole = localStorage.getItem("userRole") || "owner"; 
  const allowedRoles = ["admin", "owner", "مالك", "مشرف"];

  if (!allowedRoles.includes(userRole.toLowerCase())) {
    alert("عذراً، هذه الميزة مخصصة لرتبة المشرفين والمالكين في سُدف فقط.");
    return;
  }

  // دعم اختيار الصور العادية والصور المتحركة بصيغة GIF
  if (file.type.startsWith("image/") || file.type === "image/gif") {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageUrl = e.target.result;
      
      // تطبيق الخلفية المتحركة أو الصورة على بروفايل القائمة الجانبية
      const profileCoverElement = document.getElementById("profileCover");
      if (profileCoverElement) {
        profileCoverElement.style.backgroundImage = `url(${imageUrl})`;
      }
      
      alert("تم تحديث خلفية الملف الشخصي المتحركة بنجاح في سُدف!");
    };
    reader.readAsDataURL(file);
  } else {
    alert("الرجاء اختيار ملف صورة صالح أو صورة متحركة (GIF).");
  }
}
