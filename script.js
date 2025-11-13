const picker = document.querySelector('.colorPicker');
const blocks = {
    b1: document.getElementById('b1'),
    b2: document.getElementById('b2'),
    b3: document.getElementById('b3'),
    b4: document.getElementById('b4')
};

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

function updateColors() {
    const baseColor = picker.value;

    blocks.b1.style.backgroundColor = hexToRgb(baseColor, 30, -30, 10);
    blocks.b2.style.backgroundColor = hexToRgb(baseColor, -10, 20, -30);
    blocks.b3.style.backgroundColor = hexToRgb(baseColor, 20, 15, 0);
    blocks.b4.style.backgroundColor = hexToRgb(baseColor, -30, 10, 15);
}

picker.addEventListener('input', updateColors);


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

updateColors();
