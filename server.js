const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// 配置中间件
app.use(cors());
app.use(express.json());

// 静态文件服务
app.use(express.static(path.join(__dirname, '.')));

// 用于存储验证码（实际项目中应使用Redis等持久化存储）
const verificationCodes = new Map();

// 生成6位随机验证码
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// 模拟发送短信（实际项目中替换为真实的短信服务）
function sendSMS(phone, code) {
    console.log(`向手机号 ${phone} 发送验证码：${code}`);
    // 这里可以集成真实的短信服务API，例如：
    // 阿里云短信服务
    // 腾讯云短信服务
    // 容联云通讯等
    return true;
}

// 获取验证码API
app.post('/api/send-code', (req, res) => {
    const { phone } = req.body;
    
    // 简单的手机号验证
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        return res.status(400).json({ error: '手机号格式不正确' });
    }
    
    // 生成验证码
    const code = generateVerificationCode();
    
    // 保存验证码到内存（有效期5分钟）
    verificationCodes.set(phone, {
        code,
        expiresAt: Date.now() + 5 * 60 * 1000 // 5分钟后过期
    });
    
    // 模拟发送短信
    const success = sendSMS(phone, code);
    
    if (success) {
        res.json({ message: '验证码已发送' });
    } else {
        res.status(500).json({ error: '验证码发送失败，请稍后重试' });
    }
});

// 验证验证码API
app.post('/api/verify-code', (req, res) => {
    const { phone, code } = req.body;
    
    const storedCodeInfo = verificationCodes.get(phone);
    
    if (!storedCodeInfo) {
        return res.status(400).json({ error: '验证码不存在或已过期' });
    }
    
    if (Date.now() > storedCodeInfo.expiresAt) {
        verificationCodes.delete(phone);
        return res.status(400).json({ error: '验证码已过期' });
    }
    
    if (storedCodeInfo.code !== code) {
        return res.status(400).json({ error: '验证码不正确' });
    }
    
    // 验证成功后删除验证码
    verificationCodes.delete(phone);
    
    res.json({ message: '验证码验证成功' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('可用API：');
    console.log('POST /api/send-code - 获取验证码');
    console.log('POST /api/verify-code - 验证验证码');
});