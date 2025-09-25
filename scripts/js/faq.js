// FAQ page functionality
class FAQManager {
    constructor() {
        this.faqs = [];
        this.init();
    }

    async init() {
        await this.loadFAQs();
        this.renderFAQs();
        this.bindEvents();
        this.bindLanguageEvents();
    }

    async loadFAQs() {
        try {
            const currentLang = this.getCurrentLanguage();
            console.log('Loading FAQs with language:', currentLang);
            
            // 从API获取FAQ数据
            const response = await fetch(`${window.API_BASE_URL}/faqs`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const faqData = await response.json();
            console.log('Raw FAQ data:', faqData);
            
            // 转换API数据格式为前端需要的格式
            this.faqs = faqData.map(faq => ({
                id: faq.id,
                question: currentLang === 'zh' ? (faq.question_zh || faq.question) : faq.question,
                answer: currentLang === 'zh' ? (faq.answer_zh || faq.answer) : faq.answer,
                category: faq.category,
                sort_order: faq.sort_order
            }));

            console.log('Processed FAQs:', this.faqs);
            
            // 按排序顺序排序
            this.faqs.sort((a, b) => a.sort_order - b.sort_order);
        } catch (error) {
            console.error('Error loading FAQs:', error);
            this.showErrorMessage('Failed to load FAQ data. Please try again later.');
        }
    }

    renderFAQs() {
        const faqContainer = document.querySelector('.faq-container');
        if (!faqContainer) return;

        if (this.faqs.length === 0) {
            faqContainer.innerHTML = '<p class="no-faqs">No FAQ items available.</p>';
            return;
        }

        const faqHTML = this.faqs.map((faq, index) => this.createFAQItem(faq, index === 0)).join('');
        faqContainer.innerHTML = faqHTML;
    }

    createFAQItem(faq, isExpanded = false) {
        // 将答案按段落分割
        const answerParagraphs = faq.answer.split('\n\n').filter(p => p.trim());
        const answerHTML = answerParagraphs.map(paragraph => `<p>${paragraph.trim()}</p>`).join('');

        return `
            <div class="faq-item${isExpanded ? ' active' : ''}">
                <button class="faq-question" data-faq-id="${faq.id}">
                    ${faq.question}
                </button>
                <div class="faq-answer">
                    ${answerHTML}
                </div>
            </div>
        `;
    }

    bindEvents() {
        // FAQ折叠功能
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('faq-question')) {
                const question = e.target;
                const isActive = question.classList.contains('active');
                
                // 关闭所有其他FAQ
                document.querySelectorAll('.faq-question').forEach(q => {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('active');
                });
                
                // 如果当前FAQ不是激活状态，则激活它
                if (!isActive) {
                    question.classList.add('active');
                    question.nextElementSibling.classList.add('active');
                }
            }
        });
    }

    bindLanguageEvents() {
        // 监听语言切换事件
        document.addEventListener('languageChanged', async (event) => {
            console.log('FAQ: Language changed event received!', event.detail);
            // 重新加载和渲染FAQ内容
            await this.loadFAQs();
            this.renderFAQs();
        });
        console.log('FAQ: Language event listener bound');
    }

    getCurrentLanguage() {
        // 获取当前语言设置
        return localStorage.getItem('language') || 'en';
    }

    showErrorMessage(message) {
        // 显示错误信息
        const faqContainer = document.querySelector('.faq-container');
        if (faqContainer) {
            faqContainer.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem; color: #e74c3c;">
                    <h3>Error</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Retry
                    </button>
                </div>
            `;
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保header组件已加载
    setTimeout(() => {
        console.log('FAQ: Initializing FAQManager...');
        new FAQManager();
    }, 200);
});