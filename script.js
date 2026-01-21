// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '15px 0';
    }
});

// 智能规划演示
function initAIDemo() {
    // 初始化标签点击事件
    const tags = document.querySelectorAll('.tag');
    if (tags) {
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    }
    
    // 初始化生成行程按钮事件
    const generatePlanBtn = document.getElementById('generate-plan');
    if (generatePlanBtn) {
        generatePlanBtn.onclick = function() {
            const resultDiv = document.querySelector('.demo-result');
            if (resultDiv) {
                // 获取用户选择的标签
                const selectedTags = [];
                document.querySelectorAll('.tag.active').forEach(tag => {
                    selectedTags.push(tag.textContent);
                });
                
                // 获取用户选择的旅行条件
                const duration = document.getElementById('duration').value;
                const people = document.getElementById('people').value;
                
                // 根据用户选择生成行程
                let itinerary = generateItinerary(selectedTags, duration, people);
                
                // 显示生成的行程
                resultDiv.innerHTML = itinerary;
                resultDiv.style.display = 'block';
            }
        };
    };
    
    // 根据用户选择生成行程
    function generateItinerary(tags, duration, people) {
        // 根据选择的标签生成行程标题
        let titleTags = tags.length > 0 ? tags.join(' · ') : '经典路线';
        
        // 基础行程模板
        let itinerary = `<h4>生成的行程规划：<span style="color: var(--primary-color); font-size: 16px;">(${titleTags})</span></h4>`;
        
        // 根据旅行时长生成不同天数的行程
        if (duration === '1') {
            // 1天行程
            itinerary += `
                <div class="itinerary-day">
                    <h5><strong>D1：</strong>秦岭一日精华游</h5>
                    <div class="itinerary-details">
                        <p><i class="fas fa-clock"></i> 上午：抵达秦岭核心景区</p>
            `;
            
            // 优先处理标签活动
            let hasSpecificActivity = false;
            
            // 自然风光标签
            if (tags.includes('自然风光')) {
                itinerary += `<p><i class="fas fa-mountain"></i> <strong>特色活动：</strong>徒步观赏秦岭主峰太白山，领略云海松涛</p>`;
                hasSpecificActivity = true;
            }
            
            // 徒步摄影标签
            if (tags.includes('徒步摄影')) {
                itinerary += `<p><i class="fas fa-camera"></i> <strong>特色活动：</strong>专业摄影师带领，拍摄秦岭秘境风光</p>`;
                hasSpecificActivity = true;
            }
            
            // 非遗文化标签
            if (tags.includes('非遗文化')) {
                itinerary += `<p><i class="fas fa-hands"></i> <strong>特色活动：</strong>体验秦岭竹编技艺，亲手制作纪念品</p>`;
                hasSpecificActivity = true;
            }
            
            // 美食探索标签
            if (tags.includes('美食探索')) {
                itinerary += `<p><i class="fas fa-utensils"></i> <strong>特色活动：</strong>品尝秦岭山珍宴，包括野生菌菇、土蜂蜜等</p>`;
                hasSpecificActivity = true;
            }
            
            // 亲子家庭标签
            if (tags.includes('亲子家庭')) {
                itinerary += `<p><i class="fas fa-child"></i> <strong>特色活动：</strong>秦岭自然课堂，让孩子了解生态知识</p>`;
                hasSpecificActivity = true;
            }
            
            // 休闲度假标签
            if (tags.includes('休闲度假')) {
                itinerary += `<p><i class="fas fa-spa"></i> <strong>特色活动：</strong>秦岭温泉体验，放松身心</p>`;
                hasSpecificActivity = true;
            }
            
            // 如果没有选择标签，显示默认活动
            if (!hasSpecificActivity) {
                itinerary += `<p><i class="fas fa-compass"></i> <strong>推荐活动：</strong>秦岭经典路线游览，适合各类人群</p>`;
            }
            
            itinerary += `
                        <p><i class="fas fa-car"></i> 傍晚：返程</p>
                    </div>
                </div>
            `;
        } else if (duration === '2') {
            // 2天1晚行程
            itinerary += `
                <div class="itinerary-day">
                    <h5><strong>D1：</strong>初见秦岭 · 山乡风情</h5>
                    <div class="itinerary-details">
                        <p><i class="fas fa-clock"></i> 上午：抵达秦岭脚下</p>
                        <p><i class="fas fa-leaf"></i> 中午：品尝地道农家菜</p>
                        <p><i class="fas fa-home"></i> 下午：入住特色民宿</p>
            `;
            
            // 根据标签添加特色活动
            if (tags.includes('自然风光')) {
                itinerary += `<p><i class="fas fa-sun"></i> <strong>特色活动：</strong>傍晚漫步金丝峡，欣赏峡谷夕阳美景</p>`;
            }
            if (tags.includes('休闲度假')) {
                itinerary += `<p><i class="fas fa-moon"></i> <strong>特色活动：</strong>星空下品茶聊天，听山风鸟鸣</p>`;
            }
            if (tags.includes('美食探索')) {
                itinerary += `<p><i class="fas fa-beer"></i> <strong>特色活动：</strong>品尝秦岭自酿果酒，体验农家夜话</p>`;
            }
            
            itinerary += `
                    </div>
                </div>
                <div class="itinerary-day">
                    <h5><strong>D2：</strong>山水之约 · 文化体验</h5>
                    <div class="itinerary-details">
            `;
            
            if (tags.includes('徒步摄影')) {
                itinerary += `<p><i class="fas fa-camera"></i> <strong>特色活动：</strong>在专业摄影师指导下，拍摄秦岭日出和云海</p>`;
            }
            if (tags.includes('非遗文化')) {
                itinerary += `<p><i class="fas fa-hands"></i> <strong>特色活动：</strong>探访秦岭民俗村，体验剪纸、刺绣等传统技艺</p>`;
            }
            if (tags.includes('亲子家庭')) {
                itinerary += `<p><i class="fas fa-child"></i> <strong>特色活动：</strong>亲子采摘活动，体验收获的乐趣</p>`;
            }
            
            itinerary += `
                        <p><i class="fas fa-car"></i> 傍晚：返程</p>
                    </div>
                </div>
            `;
        } else if (duration === '3') {
            // 3天2晚行程
            itinerary += `
                <div class="itinerary-day">
                    <h5><strong>D1：</strong>初见秦岭 · 山乡人家</h5>
                    <div class="itinerary-details">
                        <p><i class="fas fa-clock"></i> 上午：抵达秦岭脚下</p>
                        <p><i class="fas fa-leaf"></i> 中午：品尝地道农家菜</p>
                        <p><i class="fas fa-home"></i> 下午：入住特色农家乐</p>
            `;
            
            if (tags.includes('自然风光')) {
                itinerary += `<p><i class="fas fa-sun"></i> <strong>特色活动：</strong>漫步佛坪国家级自然保护区，寻找野生大熊猫踪迹</p>`;
            }
            if (tags.includes('休闲度假')) {
                itinerary += `<p><i class="fas fa-moon"></i> <strong>特色活动：</strong>围坐篝火旁，听当地老人讲述秦岭传说</p>`;
            }
            
            itinerary += `
                    </div>
                </div>
                <div class="itinerary-day">
                    <h5><strong>D2：</strong>山水之约 · 文化之旅</h5>
                    <div class="itinerary-details">
            `;
            
            if (tags.includes('徒步摄影')) {
                itinerary += `<p><i class="fas fa-mountain"></i> <strong>特色活动：</strong>徒步穿越秦岭核心山脉，拍摄原始森林风光</p>`;
            }
            if (tags.includes('非遗文化')) {
                itinerary += `<p><i class="fas fa-hands"></i> <strong>特色活动：</strong>探访非遗文化村落，体验古法造纸工艺</p>`;
            }
            if (tags.includes('美食探索')) {
                itinerary += `<p><i class="fas fa-utensils"></i> <strong>特色活动：</strong>学习制作秦岭特色美食，如浆水面、锅盔</p>`;
            }
            
            itinerary += `
                    </div>
                </div>
                <div class="itinerary-day">
                    <h5><strong>D3：</strong>自然探秘 · 满载而归</h5>
                    <div class="itinerary-details">
            `;
            
            if (tags.includes('自然风光')) {
                itinerary += `<p><i class="fas fa-landmark"></i> <strong>特色活动：</strong>参观秦岭自然博物馆，了解地质变迁</p>`;
            }
            if (tags.includes('休闲度假')) {
                itinerary += `<p><i class="fas fa-shopping-bag"></i> <strong>特色活动：</strong>选购秦岭特色产品，如野生蜂蜜、木耳</p>`;
            }
            if (tags.includes('亲子家庭')) {
                itinerary += `<p><i class="fas fa-child"></i> <strong>特色活动：</strong>亲子互动游戏，在自然中快乐成长</p>`;
            }
            
            itinerary += `
                        <p><i class="fas fa-car"></i> 傍晚：返程</p>
                    </div>
                </div>
            `;
        } else {
            // 5天以上行程
            itinerary += `
                <div class="itinerary-day">
                    <h5><strong>D1：</strong>抵达秦岭 · 山乡欢迎</h5>
                    <div class="itinerary-details">
                        <p><i class="fas fa-clock"></i> 上午：抵达秦岭</p>
                        <p><i class="fas fa-leaf"></i> 中午：品尝农家菜</p>
                        <p><i class="fas fa-home"></i> 下午：入住特色民宿</p>
            `;
            
            if (tags.includes('美食探索')) {
                itinerary += `<p><i class="fas fa-utensils"></i> <strong>特色活动：</strong>欢迎晚宴，品尝秦岭全席</p>`;
            }
            
            itinerary += `
                    </div>
                </div>
                <div class="itinerary-day">
                    <h5><strong>D2：</strong>自然风光 · 徒步探索</h5>
                    <div class="itinerary-details">
            `;
            
            if (tags.includes('自然风光')) {
                itinerary += `<p><i class="fas fa-mountain"></i> <strong>特色活动：</strong>深度徒步太白山，领略第四纪冰川遗迹</p>`;
            }
            if (tags.includes('徒步摄影')) {
                itinerary += `<p><i class="fas fa-camera"></i> <strong>特色活动：</strong>拍摄太白山日出，记录云海奇观</p>`;
            }
            
            itinerary += `
                    </div>
                </div>
                <div class="itinerary-day">
                    <h5><strong>D3：</strong>文化体验 · 非遗传承</h5>
                    <div class="itinerary-details">
            `;
            
            if (tags.includes('非遗文化')) {
                itinerary += `<p><i class="fas fa-hands"></i> <strong>特色活动：</strong>全天体验多种非遗技艺，包括皮影戏、泥塑等</p>`;
            }
            if (tags.includes('亲子家庭')) {
                itinerary += `<p><i class="fas fa-child"></i> <strong>特色活动：</strong>亲子非遗课堂，共同制作传统手工艺品</p>`;
            }
            
            itinerary += `
                    </div>
                </div>
                <div class="itinerary-day">
                    <h5><strong>D4：</strong>休闲放松 · 山乡生活</h5>
                    <div class="itinerary-details">
            `;
            
            // 确保无论选择什么标签，第4天都有活动内容
            let day4HasActivity = false;
            
            if (tags.includes('休闲度假')) {
                itinerary += `<p><i class="fas fa-spa"></i> <strong>特色活动：</strong>秦岭温泉SPA，享受身心放松</p>`;
                day4HasActivity = true;
            }
            if (tags.includes('美食探索')) {
                itinerary += `<p><i class="fas fa-tree"></i> <strong>特色活动：</strong>参观生态农场，采摘有机蔬果</p>`;
                day4HasActivity = true;
            }
            if (tags.includes('自然风光')) {
                itinerary += `<p><i class="fas fa-leaf"></i> <strong>特色活动：</strong>漫步秦岭国家森林公园，感受自然气息</p>`;
                day4HasActivity = true;
            }
            if (tags.includes('亲子家庭')) {
                itinerary += `<p><i class="fas fa-child"></i> <strong>特色活动：</strong>亲子手工制作，用自然材料创作艺术品</p>`;
                day4HasActivity = true;
            }
            if (tags.includes('非遗文化')) {
                itinerary += `<p><i class="fas fa-music"></i> <strong>特色活动：</strong>欣赏秦岭民间音乐表演</p>`;
                day4HasActivity = true;
            }
            if (tags.includes('徒步摄影')) {
                itinerary += `<p><i class="fas fa-camera"></i> <strong>特色活动：</strong>学习风景摄影后期处理技巧</p>`;
                day4HasActivity = true;
            }
            
            // 如果没有匹配的标签活动，显示默认活动
            if (!day4HasActivity) {
                itinerary += `<p><i class="fas fa-coffee"></i> <strong>推荐活动：</strong>在山中小院享受悠闲时光，品茶读书</p>`;
            }
            
            itinerary += `
                    </div>
                </div>
                <div class="itinerary-day">
                    <h5><strong>D5：</strong>深度体验 · 满载而归</h5>
                    <div class="itinerary-details">
            `;
            
            if (tags.includes('徒步摄影')) {
                itinerary += `<p><i class="fas fa-camera"></i> <strong>特色活动：</strong>最后机会，拍摄秦岭日出美景</p>`;
            }
            if (tags.includes('美食探索')) {
                itinerary += `<p><i class="fas fa-shopping-bag"></i> <strong>特色活动：</strong>选购秦岭特色美食，如核桃油、土鸡蛋等</p>`;
            }
            
            itinerary += `
                        <p><i class="fas fa-car"></i> 傍晚：返程</p>
                    </div>
                </div>
            `;
        }
        
        // 添加标签相关的特色说明
        if (tags.length > 0) {
            itinerary += `<div style="margin-top: 20px; padding: 15px; background-color: rgba(240, 250, 245, 0.8); border-radius: 8px;">`;
            itinerary += `<h5><i class="fas fa-star"></i> 特色标签体验</h5>`;
            
            tags.forEach(tag => {
                const tagDescriptions = {
                    '自然风光': '您将深度体验秦岭的壮丽山水，包括山脉、森林、溪流等自然景观',
                    '徒步摄影': '专业摄影指导，带您探索秦岭秘境，捕捉绝美瞬间',
                    '非遗文化': '亲身参与多项国家级非遗项目，感受传统文化的魅力',
                    '美食探索': '品尝地道秦岭美食，从山珍野味到传统小吃，应有尽有',
                    '亲子家庭': '专为家庭设计的互动活动，让孩子在自然中学习成长',
                    '休闲度假': '慢节奏的度假体验，远离城市喧嚣，享受宁静时光'
                };
                
                if (tagDescriptions[tag]) {
                    itinerary += `<p><i class="fas fa-check-circle"></i> <strong>${tag}：</strong>${tagDescriptions[tag]}</p>`;
                }
            });
            
            itinerary += `</div>`;
        }
        
        // 添加人数相关的建议
        itinerary += `<div style="margin-top: 20px; padding: 15px; background-color: rgba(240, 250, 245, 0.8); border-radius: 8px;">`;
        itinerary += `<h5><i class="fas fa-info-circle"></i> 出行建议</h5>`;
        itinerary += `<p>本次行程适合 ${people} 人出行</p>`;
        
        if (people === '1') {
            itinerary += `<p>单人出行建议：注意安全，建议参加当地团</p>`;
        } else if (people === '2') {
            itinerary += `<p>双人出行建议：适合情侣或朋友结伴，可选择浪漫路线</p>`;
        } else if (people === '3-4') {
            itinerary += `<p>家庭/小团体出行建议：适合亲子游或好友聚会</p>`;
        } else {
            itinerary += `<p>大团体出行建议：建议提前预订住宿和交通</p>`;
        }
        
        itinerary += `</div>`;
        
        return itinerary;
    }
}

// 会员等级切换
function initMembershipLevels() {
    const levels = document.querySelectorAll('.level');
    const privilegesDiv = document.querySelector('.level-privileges');
    
    if (levels && privilegesDiv) {
        const privileges = {
            '注册': '基础用户，可浏览信息，参与平台活动',
            '青铜会员': '享受9.5折优惠，可参与基础活动',
            '白银会员': '享受9折优惠，专属客服，优先报名活动',
            '黄金会员': '享受8.5折优惠，专属顾问，免费体验部分项目',
            '铂金会员': '享受8折优惠，私人定制，免费参加所有活动'
        };
        
        // 更新特权显示
        window.updatePrivileges = function(activeLevelIndex) {
            // 移除所有活动状态
            levels.forEach(l => l.classList.remove('active'));
            // 添加当前活动状态
            levels[activeLevelIndex].classList.add('active');
            
            const levelName = levels[activeLevelIndex].querySelector('h4').textContent;
            privilegesDiv.innerHTML = `
                <h3>${levelName}特权</h3>
                <p>${privileges[levelName]}</p>
            `;
        };
        
        // 为等级圆圈添加点击事件
        levels.forEach((level, index) => {
            // 添加点击提示样式
            level.style.cursor = 'pointer';
            level.style.transition = 'all 0.3s ease';
            
            level.addEventListener('click', function() {
                updatePrivileges(index);
            });
        });
        
        // 为特权区域添加点击事件，实现切换到下一个等级
        privilegesDiv.style.cursor = 'pointer';
        privilegesDiv.style.transition = 'all 0.3s ease';
        privilegesDiv.addEventListener('click', function() {
            // 找到当前激活的等级
            let currentActiveIndex = 0;
            levels.forEach((level, index) => {
                if (level.classList.contains('active')) {
                    currentActiveIndex = index;
                }
            });
            
            // 切换到下一个等级，循环切换
            const nextIndex = (currentActiveIndex + 1) % levels.length;
            updatePrivileges(nextIndex);
        });
    }
}

// 直接切换会员等级的函数
function changeLevel(index) {
    if (window.updatePrivileges) {
        window.updatePrivileges(index);
    }
}

// 个人中心菜单切换
function initUserCenter() {
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    const contentSections = document.querySelectorAll('.content-section');
    
    if (menuItems && contentSections) {
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                // 获取目标内容区域ID
                const targetContent = this.dataset.content;
                const targetSection = document.getElementById(`content-${targetContent}`);
                
                if (targetSection) {
                    // 移除所有菜单的活动状态
                    menuItems.forEach(mi => mi.classList.remove('active'));
                    // 添加当前菜单的活动状态
                    this.classList.add('active');
                    
                    // 隐藏所有内容区域
                    contentSections.forEach(section => section.classList.remove('active'));
                    // 显示目标内容区域
                    targetSection.classList.add('active');
                }
            });
        });
    }
}

// 表单提交处理
function initForms() {
    // 只处理非登录/注册表单
    const forms = document.querySelectorAll('form:not(#login-form):not(#register-form):not(#forgot-password-form)');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('表单已提交，我们会尽快与您联系！');
            form.reset();
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 用户中心 - 头像上传功能
function initAvatarUpload() {
    const avatarInput = document.getElementById('avatar-input');
    const avatarWrapper = document.querySelector('.avatar-wrapper');
    const currentAvatar = document.getElementById('current-avatar');
    
    if (avatarInput && avatarWrapper && currentAvatar) {
        // 点击头像区域触发文件选择
        avatarWrapper.addEventListener('click', function() {
            avatarInput.click();
        });
        
        // 文件选择后处理
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    // 更新头像显示
                    currentAvatar.src = event.target.result;
                    
                    // 保存到localStorage（实际项目中应上传到服务器）
                    localStorage.setItem('userAvatar', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // 从localStorage加载保存的头像
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
            currentAvatar.src = savedAvatar;
        }
    }
}

// 用户中心 - 名称修改功能
function initNameEdit() {
    const currentName = document.getElementById('current-name');
    const welcomeName = document.getElementById('welcome-name');
    const editNameBtn = document.getElementById('edit-name-btn');
    const nameEditForm = document.getElementById('name-edit-form');
    const newNameInput = document.getElementById('new-name');
    const saveNameBtn = document.getElementById('save-name-btn');
    const cancelNameBtn = document.getElementById('cancel-name-btn');
    
    if (currentName && editNameBtn && nameEditForm && newNameInput && saveNameBtn && cancelNameBtn) {
        // 点击编辑按钮显示表单
        editNameBtn.addEventListener('click', function() {
            nameEditForm.style.display = 'flex';
            newNameInput.value = currentName.textContent;
            newNameInput.focus();
        });
        
        // 取消编辑
        cancelNameBtn.addEventListener('click', function() {
            nameEditForm.style.display = 'none';
        });
        
        // 保存新名称
        saveNameBtn.addEventListener('click', function() {
            const newName = newNameInput.value.trim();
            if (newName && newName.length <= 20) {
                // 更新显示的名称
                currentName.textContent = newName;
                if (welcomeName) {
                    welcomeName.textContent = newName;
                }
                
                // 保存到localStorage（实际项目中应保存到服务器）
                localStorage.setItem('userName', newName);
                
                // 隐藏表单
                nameEditForm.style.display = 'none';
            } else {
                alert('请输入有效的名称（1-20个字符）');
            }
        });
        
        // 从localStorage加载保存的名称
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            currentName.textContent = savedName;
            if (welcomeName) {
                welcomeName.textContent = savedName;
            }
        }
        
        // 按Enter键保存
        newNameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                saveNameBtn.click();
            }
        });
        
        // 按Esc键取消
        newNameInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                cancelNameBtn.click();
            }
        });
    }
}

// 用户中心 - 个人信息管理
function initUserInfo() {
    // 显示真实手机号
    const userPhoneElement = document.getElementById('setting-phone');
    if (userPhoneElement) {
        const userPhone = localStorage.getItem('userPhone');
        if (userPhone) {
            // 根据手机号长度进行脱敏处理
            if (/^1[3-9]\d{9}$/.test(userPhone)) {
                // 手机号脱敏显示
                const maskedPhone = userPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                userPhoneElement.value = maskedPhone;
            } else {
                // 邮箱直接显示
                userPhoneElement.value = userPhone;
            }
        }
    }
    
    // 初始化邮箱编辑功能
    const userEmailElement = document.getElementById('setting-email');
    const saveSettingsBtn = document.querySelector('.settings-form .btn-primary');
    
    if (userEmailElement && saveSettingsBtn) {
        // 从localStorage加载保存的邮箱
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            userEmailElement.value = savedEmail;
        }
        
        // 保存设置按钮事件
        saveSettingsBtn.addEventListener('click', function() {
            const email = userEmailElement.value.trim();
            if (email) {
                // 保存邮箱到localStorage
                localStorage.setItem('userEmail', email);
                alert('设置保存成功！');
            }
        });
    }
}

// 标记管理功能
function initMarkers() {
    // 标记列表
    let markers = [];
    
    // 从localStorage加载标记
    function loadMarkers() {
        const savedMarkers = localStorage.getItem('mapMarkers');
        if (savedMarkers) {
            markers = JSON.parse(savedMarkers);
            // 更新标记列表
            updateMarkerList();
        }
    }
    
    // 保存标记到localStorage
    function saveMarkers() {
        localStorage.setItem('mapMarkers', JSON.stringify(markers));
    }
    
    // 更新标记列表显示
    function updateMarkerList() {
        const container = document.getElementById('markers-container');
        if (!container) return;
        
        if (markers.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--gray-color);">暂无标记地点</p>';
            return;
        }
        
        container.innerHTML = markers.map((marker, index) => `
            <div class="marker-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; margin-bottom: 10px; background-color: var(--accent-color); border-radius: 5px;">
                <div>
                    <strong>${marker.name}</strong>
                    <p style="margin: 5px 0 0; font-size: 14px; color: var(--gray-color);">
                        ${marker.lng.toFixed(6)}, ${marker.lat.toFixed(6)}
                    </p>
                </div>
                <button class="btn btn-secondary" style="font-size: 12px; padding: 5px 10px;" onclick="deleteMarker(${index})">删除</button>
            </div>
        `).join('');
    }
    
    // 添加标记函数 - 模拟添加，使用预设坐标
    window.addMarker = function(lng, lat, name) {
        // 使用预设的秦岭地区坐标
        const defaultLng = 108.95 + (Math.random() - 0.5) * 2;
        const defaultLat = 34.34 + (Math.random() - 0.5) * 2;
        
        // 添加到标记列表
        markers.push({
            lng: lng || defaultLng,
            lat: lat || defaultLat,
            name: name || `标记${markers.length + 1}`
        });
        
        // 保存标记
        saveMarkers();
        // 更新标记列表
        updateMarkerList();
    };
    
    // 删除标记函数
    window.deleteMarker = function(index) {
        if (index >= 0 && index < markers.length) {
            // 从数组中删除
            markers.splice(index, 1);
            // 保存标记
            saveMarkers();
            // 更新标记列表
            updateMarkerList();
        }
    };
    
    // 自定义模态框相关元素
    const markerModal = document.getElementById('marker-modal');
    const markerNameInput = document.getElementById('marker-name');
    const confirmMarkerBtn = document.getElementById('confirm-marker');
    const cancelMarkerBtn = document.getElementById('cancel-marker');
    
    // 打开标记模态框
    function openMarkerModal() {
        markerModal.style.display = 'flex';
        markerNameInput.value = '';
        markerNameInput.focus();
    }
    
    // 关闭标记模态框
    function closeMarkerModal() {
        markerModal.style.display = 'none';
    }
    
    // 添加标记按钮事件
    document.getElementById('add-marker-btn')?.addEventListener('click', function() {
        openMarkerModal();
    });
    
    // 自定义提示模态框相关元素
    const alertModal = document.getElementById('alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const closeAlertBtn = document.getElementById('close-alert');
    
    // 显示提示消息
    function showAlert(message) {
        alertMessage.textContent = message;
        alertModal.style.display = 'flex';
    }
    
    // 关闭提示模态框
    function closeAlertModal() {
        alertModal.style.display = 'none';
    }
    
    // 关闭提示
    closeAlertBtn?.addEventListener('click', function() {
        closeAlertModal();
    });
    
    // 点击模态框外部关闭
    alertModal?.addEventListener('click', function(e) {
        if (e.target === alertModal) {
            closeAlertModal();
        }
    });
    
    // 确认添加标记
    confirmMarkerBtn?.addEventListener('click', function() {
        const name = markerNameInput.value.trim();
        if (name) {
            addMarker(null, null, name);
            closeMarkerModal();
        } else {
            showAlert('请输入标记名称');
        }
    });
    
    // 取消添加标记
    cancelMarkerBtn?.addEventListener('click', function() {
        closeMarkerModal();
    });
    
    // 点击模态框外部关闭
    markerModal?.addEventListener('click', function(e) {
        if (e.target === markerModal) {
            closeMarkerModal();
        }
    });
    
    // 按Enter键确认，按Escape键取消
    document.addEventListener('keydown', function(e) {
        if (markerModal && markerModal.style.display === 'flex') {
            if (e.key === 'Enter') {
                confirmMarkerBtn.click();
            } else if (e.key === 'Escape') {
                closeMarkerModal();
            }
        }
    });
    
    // 自定义确认模态框相关元素
    const confirmModal = document.getElementById('confirm-modal');
    const confirmMessage = document.getElementById('confirm-message');
    const confirmConfirmBtn = document.getElementById('confirm-confirm');
    const cancelConfirmBtn = document.getElementById('cancel-confirm');
    let confirmCallback = null;
    
    // 打开确认模态框
    function openConfirmModal(message, callback) {
        confirmMessage.textContent = message;
        confirmCallback = callback;
        confirmModal.style.display = 'flex';
    }
    
    // 关闭确认模态框
    function closeConfirmModal() {
        confirmModal.style.display = 'none';
        confirmCallback = null;
    }
    
    // 确认操作
    confirmConfirmBtn?.addEventListener('click', function() {
        if (confirmCallback) {
            confirmCallback(true);
        }
        closeConfirmModal();
    });
    
    // 取消操作
    cancelConfirmBtn?.addEventListener('click', function() {
        if (confirmCallback) {
            confirmCallback(false);
        }
        closeConfirmModal();
    });
    
    // 点击模态框外部关闭
    confirmModal?.addEventListener('click', function(e) {
        if (e.target === confirmModal) {
            closeConfirmModal();
        }
    });
    
    // 清除所有标记
    document.getElementById('clear-markers-btn')?.addEventListener('click', function() {
        openConfirmModal('确定要清除所有标记吗？', function(confirmed) {
            if (confirmed) {
                markers = [];
                saveMarkers();
                updateMarkerList();
            }
        });
    });
    
    // 初始加载标记
    loadMarkers();
    
    console.log('标记管理功能初始化成功');
}

// 导航栏登录状态管理
function initNavigation() {
    // 检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // 获取所有导航栏中的认证按钮
    const authButtons = document.querySelectorAll('.auth-buttons');
    
    authButtons.forEach(container => {
        // 清除现有内容
        container.innerHTML = '';
        
        if (isLoggedIn) {
            // 已登录，显示退出登录按钮
            const logoutLink = document.createElement('a');
            logoutLink.href = 'index.html';
            logoutLink.className = 'btn btn-primary';
            logoutLink.textContent = '退出登录';
            
            // 添加退出登录事件
            logoutLink.addEventListener('click', function(e) {
                // 清除登录状态
                localStorage.removeItem('isLoggedIn');
                // 可选：清除用户数据
                localStorage.removeItem('userName');
                localStorage.removeItem('userAvatar');
            });
            
            container.appendChild(logoutLink);
        } else {
            // 未登录，显示登录/注册按钮
            const loginLink = document.createElement('a');
            loginLink.href = 'login.html';
            loginLink.className = 'btn btn-primary';
            loginLink.textContent = '登录/注册';
            
            container.appendChild(loginLink);
        }
    });
}

// 功能卡片交互
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards) {
        featureCards.forEach(card => {
            // 添加点击事件
            card.addEventListener('click', function() {
                // 获取卡片标题
                const title = this.querySelector('h3').textContent;
                
                // 创建模态框元素
                const modal = document.createElement('div');
                modal.className = 'feature-modal';
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                `;
                
                // 模态框内容
                let content = '';
                
                // 根据不同卡片显示不同内容
                switch(title) {
                    case '离线智能导览':
                        content = `
                            <div class="modal-content" style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%;">
                                <h3>离线智能导览</h3>
                                <div class="modal-body">
                                    <p>• 支持离线地图下载，无网络也能导航</p>
                                    <p>• AI语音讲解，景点故事娓娓道来</p>
                                    <p>• 实时定位，不用担心迷路</p>
                                    <p>• 支持多语言切换，满足不同游客需求</p>
                                </div>
                                <button class="close-modal" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                            </div>
                        `;
                        break;
                    case 'AI旅行管家':
                        content = `
                            <div class="modal-content" style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%;">
                                <h3>AI旅行管家</h3>
                                <div class="modal-body">
                                    <p>• 24小时在线，随时解答疑问</p>
                                    <p>• 个性化行程推荐，根据兴趣定制</p>
                                    <p>• 实时天气和交通信息</p>
                                    <p>• 紧急情况协助服务</p>
                                </div>
                                <button class="close-modal" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                            </div>
                        `;
                        break;
                    case '安全生态监测':
                        content = `
                            <div class="modal-content" style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%;">
                                <h3>安全生态监测</h3>
                                <div class="modal-body">
                                    <p>• 实时监测客流情况，避免拥挤</p>
                                    <p>• 气象预警，保障出行安全</p>
                                    <p>• 野生动物活动区域提示</p>
                                    <p>• 游客不文明行为举报功能</p>
                                </div>
                                <button class="close-modal" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                            </div>
                        `;
                        break;
                    case 'AR文化体验':
                        content = `
                            <div class="modal-content" style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%;">
                                <h3>AR文化体验</h3>
                                <div class="modal-body">
                                    <p>• 用手机扫描景点，历史场景重现</p>
                                    <p>• 互动式AR游戏，寓教于乐</p>
                                    <p>• 虚拟导游，带你穿越时空</p>
                                    <p>• 支持拍照分享，留下美好回忆</p>
                                </div>
                                <button class="close-modal" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                            </div>
                        `;
                        break;
                    default:
                        content = `
                            <div class="modal-content" style="background: white; padding: 30px; border-radius: 10px; max-width: 600px; width: 90%;">
                                <h3>${title}</h3>
                                <div class="modal-body">
                                    <p>这是一个很棒的功能！</p>
                                </div>
                                <button class="close-modal" style="margin-top: 20px; padding: 10px 20px; background: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                            </div>
                        `;
                }
                
                modal.innerHTML = content;
                document.body.appendChild(modal);
                
                // 关闭模态框
                const closeBtn = modal.querySelector('.close-modal');
                closeBtn.addEventListener('click', function() {
                    modal.remove();
                });
                
                // 点击模态框外部关闭
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
            });
            
            // 添加悬停效果
            card.style.cursor = 'pointer';
            card.style.transition = 'all 0.3s ease';
        });
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', function() {
    initAIDemo();
    initMembershipLevels();
    initUserCenter();
    initForms();
    initSmoothScroll();
    initAvatarUpload();
    initNameEdit();
    initNavigation();
    initUserInfo();
    initMarkers();
    initFeatureCards();
});
