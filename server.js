// server.js - خادم ويب محلي بسيط
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // تحديد الملف المطلوب
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // تحديد نوع المحتوى
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            break;
    }
    
    // قراءة الملف
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                // ملف غير موجود
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // خطأ في الخادم
                res.writeHead(500);
                res.end('خطأ في الخادم: ' + error.code);
            }
        } else {
            // نجاح
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*' // حل مشكلة CORS
            });
            res.end(content, 'utf-8');
        }
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`✅ الخادم يعمل على http://localhost:${port}`);
    console.log(`✅ افتح هذا الرابط في المتصفح`);
    console.log(`✅ جميع الألعاب ستعمل بشكل صحيح`);
});