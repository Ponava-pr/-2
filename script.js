const centerBlock = document.getElementById('centerBlock');
const colorPicker = document.getElementById('colorPicker');
const blocks = {
    b1: document.getElementById('b1'),
    b2: document.getElementById('b2'),
    b3: document.getElementById('b3'),
    b4: document.getElementById('b4')
};

// Функция преобразования HEX в RGB с смещением
function hexToRgb(hex, rOffset = 0, gOffset = 0, bOffset = 0) {
    hex = hex.replace('#', '');
    
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    
    r = Math.max(0, Math.min(255, r + rOffset));
    g = Math.max(0, Math.min(255, g + gOffset));
    b = Math.max(0, Math.min(255, b + bOffset));
    
    return `rgb(${r}, ${g}, ${b})`;
}

// Функция для получения HEX из RGB
function rgbToHex(rgb) {
    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!match) return '#000000';
    
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

// Обновление цветов блоков на основе выбранного цвета
function updateColors(hexColor) {
    // Обновляем центральный блок
    centerBlock.style.background = hexColor;
    
    // Обновляем 4 блока с разными смещениями
    blocks.b1.style.backgroundColor = hexToRgb(hexColor, 40, -20, -10);
    blocks.b2.style.backgroundColor = hexToRgb(hexColor, -20, 30, -15);
    blocks.b3.style.backgroundColor = hexToRgb(hexColor, 25, -15, 25);
    blocks.b4.style.backgroundColor = hexToRgb(hexColor, -30, -10, 40);
}

// Обработчик клика по центральному блоку
centerBlock.addEventListener('click', function() {
    colorPicker.click();
});

// Обработчик выбора цвета
colorPicker.addEventListener('input', function() {
    const selectedColor = this.value;
    updateColors(selectedColor);
    centerBlock.querySelector('span').textContent = selectedColor.toUpperCase();
});

// Обработчики для блоков (показ цвета при наведении)
Object.keys(blocks).forEach(blockId => {
    const block = blocks[blockId];
    
    block.addEventListener('mouseenter', function() {
        const bgColor = this.style.backgroundColor;
        const hexColor = rgbToHex(bgColor);
        this.textContent = hexColor.toUpperCase();
    });
    
    block.addEventListener('mouseleave', function() {
        this.textContent = blockId;
    });
});

// Инициализация начального цвета
updateColors('#667eea');
