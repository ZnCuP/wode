// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 初始化时确保地址正确显示
    function initAddressDisplay() {
        const addressElements = document.querySelectorAll('[data-translate="contactAddress"]');
        addressElements.forEach(element => {
            if (element.textContent.includes('\\n')) {
                element.innerHTML = element.textContent.replace(/\\n/g, '<br>');
            }
        });
    }

    // 页面加载后稍微延迟执行，确保语言系统初始化完成
    setTimeout(initAddressDisplay, 100);

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert(currentLanguage === 'zh' ? '请填写所有必填字段' : 'Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(currentLanguage === 'zh' ? '请输入有效的邮箱地址' : 'Please enter a valid email address');
                return;
            }
            
            // Success message
            alert(currentLanguage === 'zh' ? '感谢您的留言！我们会尽快回复您。' : 'Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
});