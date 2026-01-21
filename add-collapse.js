// 用于为所有页面添加折叠功能的脚本
// 这个脚本将自动为页面中的各个部分添加折叠功能

// 添加折叠CSS样式
function addCollapseCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* 折叠组件样式 */
        .collapsible-container {
            margin-bottom: 20px;
        }
        
        .collapsible-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background-color: var(--community-card-bg);
            border-radius: 10px 10px 0 0;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .collapsible-header:hover {
            background-color: var(--community-bg);
        }
        
        .collapsible-title {
            font-size: 18px;
            font-weight: bold;
            color: var(--community-text-primary);
        }
        
        .collapsible-toggle {
            font-size: 16px;
            color: var(--community-text-secondary);
            transition: transform 0.3s ease;
        }
        
        .collapsible-toggle.collapsed {
            transform: rotate(-90deg);
        }
        
        .collapsible-content {
            background-color: var(--community-card-bg);
            border-radius: 0 0 10px 10px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            padding: 0 20px;
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .collapsible-content.expanded {
            padding: 20px;
            max-height: 1000px;
        }
    `;
    document.head.appendChild(style);
}

// 添加折叠JavaScript功能
function addCollapseJS() {
    const script = document.createElement('script');
    script.textContent = `
        // 折叠功能实现
        document.addEventListener('DOMContentLoaded', function() {
            // 为所有带有collapsible-header类的元素添加点击事件
            const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
            collapsibleHeaders.forEach(header => {
                header.addEventListener('click', function() {
                    // 获取当前折叠容器
                    const container = this.closest('.collapsible-container');
                    // 获取内容区域和切换按钮
                    const content = container.querySelector('.collapsible-content');
                    const toggle = container.querySelector('.collapsible-toggle');
                    
                    // 切换展开/折叠状态
                    content.classList.toggle('expanded');
                    toggle.classList.toggle('collapsed');
                });
            });
        });
    `;
    document.body.appendChild(script);
}

// 为页面添加折叠功能
function addCollapseFunctionality() {
    addCollapseCSS();
    addCollapseJS();
}

// 当DOM加载完成后添加折叠功能
document.addEventListener('DOMContentLoaded', addCollapseFunctionality);
