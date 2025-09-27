// News page functionality
class NewsManager {
    constructor() {
        this.articles = [];
        this.displayedCount = 6; // 2*3 布局显示6篇
        this.articlesPerLoad = 6;
        this.init();
    }

    async init() {
        await this.loadArticles();
        this.renderArticles();
        this.bindEvents();
        this.bindLanguageEvents();
    }

    async loadArticles() {
        try {
            // 从API获取新闻数据
            const response = await fetch(`${window.API_BASE_URL}/news`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const newsData = await response.json();
            
            // 转换API数据格式为前端需要的格式
            this.articles = newsData.map(news => ({
                id: news.id,
                title: this.getCurrentLanguage() === 'zh' ? (news.title_zh || news.title) : news.title,
                content: this.getCurrentLanguage() === 'zh' ? (news.content_zh || news.content) : news.content,
                summary: this.getCurrentLanguage() === 'zh' ? (news.summary_zh || news.summary) : news.summary,
                date: news.publish_date || news.created_at,
                image: news.cover_image || '../assets/file/pics/default-news.png', // 使用新的cover_image字段
                category: news.category,
                author: news.author,
                tags: news.tags,
                view_count: news.view_count,
                is_featured: news.is_featured
            }));

            // 按日期排序（最新的在前）
            this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Failed to load articles:', error);
            // 显示错误信息给用户
            this.showErrorMessage('Failed to load news articles. Please try again later.');
        }
    }

    getDateFromFileName(fileName) {
        // 模拟日期 - 在实际项目中应该从文件系统获取
        const dates = {
            'How Headlight Level Sensors Enhance Road Safety.md': '2024-08-28',
            'Advanced Technology in Action- The Functionality of Headlight Level Sensors.md': '2024-08-26',
            'How to clean your Ford MAP sensor.md': '2024-08-24',
            'How to install a headlight level sensor in your car.md': '2024-08-18',
            'Where are headlight level sensors located in different car brands.md': '2024-08-20',
            'Where to Purchase Volkswagen Oil Level Sensors for Your Business.md': '2024-08-22'
        };
        return dates[fileName] || '2024-08-15';
    }

    renderArticles() {
        const newsGrid = document.getElementById('newsGrid');
        if (!newsGrid) return;

        newsGrid.innerHTML = '';
        
        const articlesToShow = this.articles.slice(0, this.displayedCount);
        
        articlesToShow.forEach((article, index) => {
            const card = this.createNewsCard(article, index);
            newsGrid.appendChild(card);
        });

        // 更新Load More按钮状态
        this.updateLoadMoreButton();
    }

    createNewsCard(article, index) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        // 提取文章摘要（前150个字符）
        const excerpt = this.extractExcerpt(article.content);
        
        card.innerHTML = `
            <div class="news-card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="news-card-content">
                <h3 class="news-card-title">${article.title}</h3>
                <p class="news-card-date">${this.formatDate(article.date)}</p>
                <p class="news-card-excerpt">${excerpt}</p>
            </div>
        `;

        // 点击事件
        card.addEventListener('click', () => {
            this.openArticleDetail(article);
        });

        return card;
    }

    extractExcerpt(content) {
        // 移除markdown格式并获取纯文本
        const plainText = content.replace(/[#*_`]/g, '').replace(/\n\n/g, ' ');
        return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (!loadMoreBtn) return;

        if (this.displayedCount >= this.articles.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }

    loadMore() {
        this.displayedCount += this.articlesPerLoad;
        this.renderArticles();
    }

    openArticleDetail(article) {
        // 将文章数据存储到 sessionStorage
        sessionStorage.setItem('currentArticle', JSON.stringify(article));
        
        // 跳转到详情页
        window.location.href = './news-detail';
    }

    bindEvents() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }
    }

    bindLanguageEvents() {
        // 监听语言切换事件
        document.addEventListener('languageChanged', (event) => {
            console.log('Language changed to:', event.detail.language);
            // 重新加载和渲染文章
            this.loadArticles().then(() => {
                this.renderArticles();
            });
        });
    }

    getCurrentLanguage() {
        // 获取当前语言设置
        return localStorage.getItem('language') || 'en';
    }

    showErrorMessage(message) {
        // 显示错误信息
        const newsGrid = document.getElementById('newsGrid');
        if (newsGrid) {
            newsGrid.innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #e74c3c;">
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
    new NewsManager();
});