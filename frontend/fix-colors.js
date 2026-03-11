const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (f === 'node_modules') return;
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

walk('./src/app', function(filePath) {
    if (filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content
            .replace(/#f0f0f5/ig, 'var(--text-primary)')
            .replace(/#a0a0b8/ig, 'var(--text-secondary)')
            .replace(/#6b6b80/ig, 'var(--text-muted)')
            .replace(/#1a1a2e/ig, 'var(--bg-card)')
            .replace(/#12121a/ig, 'var(--bg-secondary)');
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log('Updated ' + filePath);
        }
    }
});
