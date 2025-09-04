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
    }

    async loadArticles() {
        try {
            // 模拟读取文件列表 - 在实际项目中需要后端API支持
            const articleFiles = [
                'How Headlight Level Sensors Enhance Road Safety.md',
                'Advanced Technology in Action- The Functionality of Headlight Level Sensors.md',
                'How to clean your Ford MAP sensor.md',
                'How to install a headlight level sensor in your car.md',
                'Where are headlight level sensors located in different car brands.md',
                'Where to Purchase Volkswagen Oil Level Sensors for Your Business.md'
            ];

            for (const fileName of articleFiles) {
                try {
                    const response = await fetch(`../assets/file/docs/${fileName}`);
                    if (response.ok) {
                        const content = await response.text();
                        const title = fileName.replace('.md', '');
                        const imageName = fileName.replace('.md', '.png');
                        
                        // 获取文件修改时间（在实际项目中从后端获取）
                        const date = this.getDateFromFileName(fileName);
                        
                        this.articles.push({
                            title: title,
                            content: content,
                            date: date,
                            image: `../assets/file/pics/${imageName}`,
                            fileName: fileName
                        });
                    }
                } catch (error) {
                    console.warn(`Failed to load article: ${fileName}`, error);
                }
            }
            
            // 按日期排序（最新的在前）
            this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Failed to load articles:', error);
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
        window.location.href = './news-detail.html';
    }

    bindEvents() {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => this.loadMore());
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new NewsManager();
});