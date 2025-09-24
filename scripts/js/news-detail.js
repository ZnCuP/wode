// News Detail page functionality
class NewsDetailManager {
    constructor() {
        this.currentArticle = null;
        this.allArticles = [];
        this.init();
    }

    async init() {
        await this.loadCurrentArticle();
        await this.loadAllArticles();
        this.renderArticle();
        this.renderRelatedArticles();
    }

    loadCurrentArticle() {
        try {
            const articleData = sessionStorage.getItem('currentArticle');
            if (articleData) {
                this.currentArticle = JSON.parse(articleData);
            } else {
                // 如果没有文章数据，返回新闻页
                window.location.href = './news.html';
            }
        } catch (error) {
            console.error('Failed to load current article:', error);
            window.location.href = './news.html';
        }
    }

    async loadAllArticles() {
        try {
            // 从API获取所有新闻数据
            const response = await fetch('http://localhost:8001/api/news');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const newsData = await response.json();
            
            // 转换API数据格式并过滤掉当前文章
            this.allArticles = newsData
                .filter(news => news.id !== this.currentArticle.id)
                .map(news => ({
                    id: news.id,
                    title: this.getCurrentLanguage() === 'zh' ? (news.title_zh || news.title) : news.title,
                    content: this.getCurrentLanguage() === 'zh' ? (news.content_zh || news.content) : news.content,
                    summary: this.getCurrentLanguage() === 'zh' ? (news.summary_zh || news.summary) : news.summary,
                    date: news.publish_date || news.created_at,
                    image: news.cover_image || '../assets/file/pics/default-news.png',
                    category: news.category,
                    author: news.author,
                    tags: news.tags,
                    view_count: news.view_count,
                    is_featured: news.is_featured
                }));
            
            // 按日期排序（最新的在前）
            this.allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Failed to load articles:', error);
        }
    }

    getDateFromFileName(fileName) {
        const dates = {
            'How Headlight Level Sensors Enhance Road Safety?.md': '2024-08-28',
            'Advanced Technology in Action- The Functionality of Headlight Level Sensors.md': '2024-08-26',
            'How to clean your Ford MAP sensor?.md': '2024-08-24',
            'How to install a headlight level sensor in your car?.md': '2024-08-18',
            'Where are headlight level sensors located in different car brands?.md': '2024-08-20',
            'Where to Purchase Volkswagen Oil Level Sensors for Your Business.md': '2024-08-22'
        };
        return dates[fileName] || '2024-08-15';
    }

    renderArticle() {
        if (!this.currentArticle) return;

        // 更新页面标题
        document.title = `${this.currentArticle.title} - GW-GoWorld`;

        // 更新文章标题
        const titleElement = document.getElementById('articleTitle');
        if (titleElement) {
            titleElement.textContent = this.currentArticle.title;
        }

        // 更新文章日期
        const dateElement = document.getElementById('articleDate');
        if (dateElement) {
            dateElement.textContent = this.formatDate(this.currentArticle.date);
        }

        // 更新文章图片
        const imageElement = document.getElementById('articleImage');
        if (imageElement) {
            imageElement.src = this.currentArticle.image;
            imageElement.alt = this.currentArticle.title;
        }

        // 更新文章内容
        const bodyElement = document.getElementById('articleBody');
        if (bodyElement) {
            bodyElement.innerHTML = this.formatContent(this.currentArticle.content);
        }
    }

    formatContent(content) {
        // 改进的 Markdown 转 HTML 处理
        let html = content;
        
        // 首先处理标题（必须在段落处理之前）
        html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
        
        // 处理粗体和斜体
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');
        
        // 处理段落 - 将双换行符转为段落分隔
        html = html.replace(/\n\n/g, '</p><p>');
        
        // 添加段落标签
        html = '<p>' + html + '</p>';
        
        // 清理标题周围的段落标签
        html = html.replace(/<p>(<h[1-6]>.*?<\/h[1-6]>)<\/p>/g, '$1');
        html = html.replace(/<\/h([1-6])><\/p>\s*<p>/g, '</h$1>');
        
        // 清理空段落
        html = html.replace(/<p>\s*<\/p>/g, '');
        
        return html;
    }

    renderRelatedArticles() {
        const relatedGrid = document.getElementById('relatedGrid');
        if (!relatedGrid) return;

        relatedGrid.innerHTML = '';
        
        // 显示前3篇相关文章
        const relatedArticles = this.allArticles.slice(0, 3);
        
        relatedArticles.forEach((article, index) => {
            const card = this.createRelatedCard(article, index);
            relatedGrid.appendChild(card);
        });
    }

    createRelatedCard(article, index) {
        const card = document.createElement('div');
        card.className = 'related-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="related-card-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="related-card-content">
                <h3 class="related-card-title">${article.title}</h3>
                <p class="related-card-date">${this.formatDate(article.date)}</p>
            </div>
        `;

        // 点击事件
        card.addEventListener('click', () => {
            sessionStorage.setItem('currentArticle', JSON.stringify(article));
            window.location.reload();
        });

        return card;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    getCurrentLanguage() {
        // 获取当前语言设置
        return localStorage.getItem('language') || 'en';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new NewsDetailManager();
});