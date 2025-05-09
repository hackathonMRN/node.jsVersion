const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// CORS 설정
app.use(cors());

// 정적 파일 제공
app.use(express.static('public'));

// JSON 파일 제공을 위한 라우트
app.get('/api/image-text-pairs', (req, res) => {
    try {
        const jsonPath = path.join(__dirname, 'ysc_image_text_pairs.json');
        const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        res.json(jsonData);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        res.status(500).json({ error: 'Failed to read JSON file' });
    }
});

// 루트 경로
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 