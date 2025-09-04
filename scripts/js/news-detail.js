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
            const articleFiles = [
                'How Headlight Level Sensors Enhance Road Safety?.md',
                'Advanced Technology in Action- The Functionality of Headlight Level Sensors.md',
                'How to clean your Ford MAP sensor?.md',
                'How to install a headlight level sensor in your car?.md',
                'Where are headlight level sensors located in different car brands?.md',
                'Where to Purchase Volkswagen Oil Level Sensors for Your Business.md'
            ];

            for (const fileName of articleFiles) {
                if (fileName !== this.currentArticle.fileName) {
                    try {
                        const response = await fetch(`../assets/file/docs/${fileName}`);
                        if (response.ok) {
                            const content = await response.text();
                            const title = fileName.replace('.md', '');
                            const imageName = fileName.replace('.md', '.png');
                            const date = this.getDateFromFileName(fileName);
                            
                            this.allArticles.push({
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
            }
            
            // 随机排序
            this.allArticles.sort(() => Math.random() - 0.5);
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
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new NewsDetailManager();
});