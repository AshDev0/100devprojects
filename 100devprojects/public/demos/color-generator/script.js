// ============================================
// 🎨 COLOR GENERATOR - LEARNING VERSION
// ============================================



// ============================================
// 1️⃣ GLOBAL STATE (App ka data)
// ============================================

// Current mode: single | palette | gradient | favorites
let currentMode = 'single';

// Current color object
let currentColor = {
    hex: '#FFFFFF',
    rgb: {r:255, g: 255, b:255},
    hsl: {h: 0, s: 0, l: 100}
};

// Palette state
let paletteColors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'
];        // 5 colors
let lockedColors = [false, false, false, false, false];         // true / false

// Gradient state
let gradientColors = ['#3B82F6', '#8B5CF6', '#EC4899'];       // 3 colors
let gradientDirection = 'to right';

// Favorites
let favorites = [];



// ============================================
// 2️⃣ DOM ELEMENTS (HTML se connection)
// ============================================

// DOM Elements - Single Mode
const singleColorDisplay = document.getElementById('single-color-display');
const colorName = document.getElementById('color-name');
const hexCode = document.getElementById('hex-code');
const rgbCode = document.getElementById('rgb-code');
const hslCode = document.getElementById('hsl-code');
const generateSingleBtn = document.getElementById('generate-single');
const saveColorBtn = document.getElementById('save-color');
const pickColorBtn = document.getElementById('pick-color');
const shadesGrid = document.getElementById('shades-grid');
const hiddenColorPicker = document.getElementById('hidden-color-picker');

// DOM Elements - Palette Mode
const paletteTypeSelect = document.getElementById('palette-type');
const generatePaletteBtn = document.getElementById('generate-palette');
const exportPaletteBtn = document.getElementById('export-palette');
const paletteDisplay = document.getElementById('palette-display');

// DOM Elements - Gradient Mode
const gradientPreview = document.querySelector('.gradient-preview');
const gradientDirectionSelect = document.getElementById('gradient-direction');
const gradientColor1 = document.getElementById('gradient-color-1');
const gradientColor2 = document.getElementById('gradient-color-2');
const gradientColor3 = document.getElementById('gradient-color-3');
const randomizeGradientBtn = document.getElementById('randomize-gradient');
const gradientCodeDisplay = document.getElementById('gradient-code-display');

// DOM Elements - Favorites Mode
const favoritesGrid = document.getElementById('favorites-grid');
const clearFavoritesBtn = document.getElementById('clear-favorites');



// ============================================
// 3️⃣ UTILITY FUNCTIONS (HELPER)
// ============================================

// 🎯 TASK: Random HEX color banana
function randomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log('Color: ',color)
    return color;
}

// 🎯 TASK: HEX → RGB
function hexToRgb(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    return {r, g, b};

}

// 🎯 TASK: RGB → HEX
function rgbToHex(r, g, b) {
    // "#FFFFFF" return karo
    const toHex = (n) =>{
        const hex = Math.round(n).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// 🎯 TASK: RGB → HSL
function rgbToHsl(r, g, b) {
    // return { h, s, l }
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0;
    }else{
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max){
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b: 
                h = ((r - g) / d + 4 ) / 6;
                break;
        }
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    }
}

// 🎯 TASK: HSL → RGB
function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if(s === 0){
        r = g = b = l; //achromatic
    }else{
        const hue2rgb = (p, q, t) => {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {

        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    }
}

function getColorName(hex) {
    // 🎨 Extended Color Names Database - 140+ colors
    const colorNames = {
        // Reds
        '#FF0000': 'Red', '#DC143C': 'Crimson', '#8B0000': 'Dark Red',
        '#B22222': 'Fire Brick', '#CD5C5C': 'Indian Red', '#F08080': 'Light Coral',
        '#FA8072': 'Salmon', '#E9967A': 'Dark Salmon', '#FFA07A': 'Light Salmon',

        // Pinks
        '#FFC0CB': 'Pink', '#FFB6C1': 'Light Pink', '#FF69B4': 'Hot Pink',
        '#FF1493': 'Deep Pink', '#C71585': 'Medium Violet Red', '#DB7093': 'Pale Violet Red',

        // Oranges
        '#FFA500': 'Orange', '#FF8C00': 'Dark Orange', '#FF7F50': 'Coral',
        '#FF6347': 'Tomato', '#FF4500': 'Orange Red', '#FFD700': 'Gold',

        // Yellows
        '#FFFF00': 'Yellow', '#FFFFE0': 'Light Yellow', '#FFFACD': 'Lemon Chiffon',
        '#FAFAD2': 'Light Goldenrod', '#FFEFD5': 'Papaya Whip', '#FFE4B5': 'Moccasin',
        '#FFDAB9': 'Peach Puff', '#EEE8AA': 'Pale Goldenrod', '#F0E68C': 'Khaki',

        // Greens
        '#00FF00': 'Lime', '#008000': 'Green', '#006400': 'Dark Green',
        '#228B22': 'Forest Green', '#32CD32': 'Lime Green', '#90EE90': 'Light Green',
        '#98FB98': 'Pale Green', '#8FBC8F': 'Dark Sea Green', '#00FA9A': 'Medium Spring Green',
        '#00FF7F': 'Spring Green', '#2E8B57': 'Sea Green', '#3CB371': 'Medium Sea Green',
        '#20B2AA': 'Light Sea Green', '#66CDAA': 'Medium Aquamarine', '#7FFFD4': 'Aquamarine',

        // Cyans
        '#00FFFF': 'Cyan', '#00CED1': 'Dark Turquoise', '#40E0D0': 'Turquoise',
        '#48D1CC': 'Medium Turquoise', '#AFEEEE': 'Pale Turquoise', '#E0FFFF': 'Light Cyan',

        // Blues
        '#0000FF': 'Blue', '#000080': 'Navy', '#00008B': 'Dark Blue',
        '#0000CD': 'Medium Blue', '#4169E1': 'Royal Blue', '#4682B4': 'Steel Blue',
        '#1E90FF': 'Dodger Blue', '#00BFFF': 'Deep Sky Blue', '#87CEEB': 'Sky Blue',
        '#87CEFA': 'Light Sky Blue', '#ADD8E6': 'Light Blue', '#B0C4DE': 'Light Steel Blue',
        '#6495ED': 'Cornflower Blue', '#5F9EA0': 'Cadet Blue',

        // Purples
        '#800080': 'Purple', '#8B008B': 'Dark Magenta', '#9370DB': 'Medium Purple',
        '#9932CC': 'Dark Orchid', '#BA55D3': 'Medium Orchid', '#DA70D6': 'Orchid',
        '#DDA0DD': 'Plum', '#EE82EE': 'Violet', '#FF00FF': 'Magenta',
        '#8A2BE2': 'Blue Violet', '#9400D3': 'Dark Violet', '#4B0082': 'Indigo',
        '#6A5ACD': 'Slate Blue', '#7B68EE': 'Medium Slate Blue',

        // Browns
        '#A52A2A': 'Brown', '#8B4513': 'Saddle Brown', '#D2691E': 'Chocolate',
        '#CD853F': 'Peru', '#F4A460': 'Sandy Brown', '#DEB887': 'Burlywood',
        '#D2B48C': 'Tan', '#BC8F8F': 'Rosy Brown', '#FFE4C4': 'Bisque',

        // Grays & Whites
        '#FFFFFF': 'White', '#FFFAF0': 'Floral White', '#F5F5F5': 'White Smoke',
        '#DCDCDC': 'Gainsboro', '#D3D3D3': 'Light Gray', '#C0C0C0': 'Silver',
        '#A9A9A9': 'Dark Gray', '#808080': 'Gray', '#696969': 'Dim Gray',
        '#000000': 'Black', '#2F4F4F': 'Dark Slate Gray', '#708090': 'Slate Gray',

        // Special Colors
        '#F0FFF0': 'Honeydew', '#F5FFFA': 'Mint Cream', '#F0F8FF': 'Alice Blue',
        '#F8F8FF': 'Ghost White', '#FFFAFA': 'Snow', '#FFF5EE': 'Seashell',
        '#FDF5E6': 'Old Lace', '#FAF0E6': 'Linen', '#FFF0F5': 'Lavender Blush',
        '#FFE4E1': 'Misty Rose'
    };

    // Exact match check
    const upperHex = hex.toUpperCase();
    if(colorNames[upperHex]){
        return colorNames[upperHex];
    }

    // Closest color match using color distance
    let closestColor = '';
    let minDistance = Infinity;

    const targetRgb = hexToRgb(hex);

    // Check distance from all named colors
    for(const [colorHex, colorName] of Object.entries(colorNames)) {
        const namedRgb = hexToRgb(colorHex);

        // Calculate Euclidean distance in RGB space
        const distance = Math.sqrt(
            Math.pow(targetRgb.r - namedRgb.r, 2) +
            Math.pow(targetRgb.g - namedRgb.g, 2) +
            Math.pow(targetRgb.b - namedRgb.b, 2)
        );

        if(distance < minDistance) {
            minDistance = distance;
            closestColor = colorName;
        }
    }

    // If very close match found (within 30 units), return it
    if(minDistance < 30) {
        return closestColor;
    }

    // Otherwise, generate descriptive name based on HSL
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Get lightness descriptor
    let lightnessPrefix = '';
    if (hsl.l > 90) lightnessPrefix = 'Very Light ';
    else if (hsl.l > 70) lightnessPrefix = 'Light ';
    else if (hsl.l < 20) lightnessPrefix = 'Very Dark ';
    else if (hsl.l < 40) lightnessPrefix = 'Dark ';

    // Get saturation descriptor
    let saturationPrefix = '';
    if (hsl.s < 10) {
        // Gray colors
        if (hsl.l > 90) return 'Almost White';
        if (hsl.l > 70) return 'Light Gray';
        if (hsl.l > 40) return 'Gray';
        if (hsl.l > 20) return 'Dark Gray';
        return 'Almost Black';
    } else if (hsl.s < 30) {
        saturationPrefix = 'Grayish ';
    } else if (hsl.s > 80) {
        saturationPrefix = 'Vivid ';
    }

    // Get base color name from hue
    let baseName = '';
    if (hsl.h < 15) baseName = 'Red';
    else if (hsl.h < 45) baseName = 'Orange';
    else if (hsl.h < 70) baseName = 'Yellow';
    else if (hsl.h < 150) baseName = 'Green';
    else if (hsl.h < 200) baseName = 'Cyan';
    else if (hsl.h < 250) baseName = 'Blue';
    else if (hsl.h < 290) baseName = 'Purple';
    else if (hsl.h < 330) baseName = 'Magenta';
    else baseName = 'Red';

    return `${lightnessPrefix}${saturationPrefix}${baseName}`.trim();
}


function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c=>{
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastColor(hex) {
    const rgb = hexToRgb(hex);
    const luminance = getLuminance(rgb.r, rgb.g, rgb.b);
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
}



// ============================================
// 4️⃣ SINGLE COLOR MODE
// ============================================

// 🎯 TASK 1: New random color generate karna
function generateSingleColor() {
    const hex = randomHexColor();
    updateSingleColorDisplay(hex);
}

// 🎯 TASK 2: UI update karna
function updateSingleColorDisplay(hex) {

    // Convert to all formats
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Update current color state
    currentColor = {hex, rgb, hsl};

    // Update background with smooth transition
    singleColorDisplay.style.background = `linear-gradient(135deg, ${hex} 0%, ${adjustBrightness(hex, -20)} 100%)`;

    // Update color name
    colorName.textContent = getColorName(hex);
    colorName.style.color = getContrastColor(hex);

    //Update color codes

    const hexCodeStr = hex.toUpperCase();
    const rgbCodeStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b} )`;
    const hslCodeStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

    hexCode.querySelector('span').textContent = hexCodeStr;
    hexCode.setAttribute('data-value', hexCodeStr);

    rgbCode.querySelector('span').textContent = rgbCodeStr;
    rgbCode.setAttribute('data-value', rgbCodeStr);

    hslCode.querySelector('span').textContent = hslCodeStr;
    hslCode.setAttribute('data-value', hslCodeStr);

    generateShades(hex);
}

function adjustBrightness(hex, percent){
    const rgb = hexToRgb(hex);
    const adjust = (value) => {
        const adjusted = value + (value * percent / 100);
        return Math.max(0, Math.min(255, adjusted));
    }
    return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
}


// 🎯 TASK 3: Shades generate karna
function generateShades(hex) {
    shadesGrid.innerHTML = '';

    // Generate 9 variations: darker to lighter

    const variations = [-80, -60, -40, -20, 0, 20, 40, 60, 80];

    variations.forEach(percent => {
        const shadeHex = adjustBrightness(hex, percent);
        const shadeBox = document.createElement('div');
        shadeBox.className = 'shade-box';
        shadeBox.style.background = shadeHex;
        shadeBox.setAttribute('data-color', shadeHex);
        shadeBox.onclick = ()=> updateSingleColorDisplay(shadeHex);
        shadesGrid.appendChild(shadeBox);
    });
}

// 🎯 TASK 4: Color picker open karna
function openColorPicker() {
    // input[type=color] handle karo
    hiddenColorPicker.value = currentColor.hex;
    hiddenColorPicker.click();
    hiddenColorPicker.onchange = ()=>{
    updateSingleColorDisplay(hiddenColorPicker.value);
    }
}

// 🎯 TASK 5: Color copy karna
function copyColor(format) {
    let textToCopy = '';

    if(format === 'hex') {
        textToCopy = hexCode.getAttribute('data-value');
    } else if(format === 'rgb') {
        textToCopy = rgbCode.getAttribute('data-value');
    } else if(format === 'hsl') {
        textToCopy = hslCode.getAttribute('data-value');
    }

    copyToClipboard(textToCopy);
    showToast(`${format.toUpperCase()} copied to clipboard!`);
}

// 🎯 TASK 6: Favorite me save
function saveColorToFavorites() {
    const hex = currentColor.hex;

    // Check if already in favorites
    if(favorites.includes(hex)) {
        showToast('Color already in favorites!');
        return;
    }

    favorites.push(hex);
    saveFavoritesToStorage();
    updateFavoritesDisplay();
    showToast('Color added to favorites!');
}



// ============================================
// 5️⃣ PALETTE MODE
// ============================================

// 🎯 TASK: Palette generate karna
function generatePalette() {
    const paletteType = paletteTypeSelect.value;

    // Generate based on type
    switch(paletteType) {
        case 'random':
            generateRandomPalette();
            break;
        case 'monochromatic':
            generateMonochromaticPalette();
            break;
        case 'complementary':
            generateComplementaryPalette();
            break;
        case 'analogous':
            generateAnalogousPalette();
            break;
        case 'triadic':
            generateTriadicPalette();
            break;
        case 'tetradic':
            generateTetradicPalette();
            break;
    }

    updatePaletteDisplay();
}

function generateRandomPalette() {
    for(let i = 0; i < 5; i++) {
        if(!lockedColors[i]) {
            paletteColors[i] = randomHexColor();
        }
    }
}

function generateMonochromaticPalette() {
    const baseColor = lockedColors.some(locked => locked)
        ? paletteColors[lockedColors.indexOf(true)]
        : randomHexColor();

    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    for(let i = 0; i < 5; i++) {
        if(!lockedColors[i]) {
            const newL = 20 + (i * 15);
            const newRgb = hslToRgb(hsl.h, hsl.s, newL);
            paletteColors[i] = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        }
    }
}

function generateComplementaryPalette() {
    const baseColor = lockedColors.some(locked => locked)
        ? paletteColors[lockedColors.indexOf(true)]
        : randomHexColor();

    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    for(let i = 0; i < 5; i++) {
        if(!lockedColors[i]) {
            const hue = i < 3 ? hsl.h : (hsl.h + 180) % 360;
            const newRgb = hslToRgb(hue, hsl.s, 50 + (i % 3) * 10);
            paletteColors[i] = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        }
    }
}

function generateAnalogousPalette() {
    const baseColor = lockedColors.some(locked => locked)
        ? paletteColors[lockedColors.indexOf(true)]
        : randomHexColor();

    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    for(let i = 0; i < 5; i++) {
        if(!lockedColors[i]) {
            const hue = (hsl.h + (i - 2) * 30 + 360) % 360;
            const newRgb = hslToRgb(hue, hsl.s, 50);
            paletteColors[i] = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        }
    }
}

function generateTriadicPalette() {
    const baseColor = lockedColors.some(locked => locked)
        ? paletteColors[lockedColors.indexOf(true)]
        : randomHexColor();

    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    for(let i = 0; i < 5; i++) {
        if(!lockedColors[i]) {
            const hue = (hsl.h + Math.floor(i / 2) * 120) % 360;
            const newRgb = hslToRgb(hue, hsl.s, 50 + (i % 2) * 10);
            paletteColors[i] = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        }
    }
}

function generateTetradicPalette() {
    const baseColor = lockedColors.some(locked => locked)
        ? paletteColors[lockedColors.indexOf(true)]
        : randomHexColor();

    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const hues = [0, 60, 180, 240, 300];
    for(let i = 0; i < 5; i++) {
        if(!lockedColors[i]) {
            const hue = (hsl.h + hues[i]) % 360;
            const newRgb = hslToRgb(hue, hsl.s, 50);
            paletteColors[i] = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        }
    }
}

// 🎯 TASK: Palette UI update
function updatePaletteDisplay() {
    const colorCards = paletteDisplay.querySelectorAll('.color-card');

    colorCards.forEach((card, index) => {
        const colorBox = card.querySelector('.color-box');
        const colorHex = card.querySelector('.color-hex');
        const lockBtn = card.querySelector('.lock-btn');

        // Update color
        colorBox.style.backgroundColor = paletteColors[index];
        colorHex.textContent = paletteColors[index].toUpperCase();

        // Update lock button
        if(lockedColors[index]) {
            lockBtn.classList.add('locked');
            lockBtn.innerHTML = '<i class="fas fa-lock"></i>';
        } else {
            lockBtn.classList.remove('locked');
            lockBtn.innerHTML = '<i class="fas fa-unlock"></i>';
        }
    });
}

// 🎯 TASK: Lock / Unlock color
function toggleLock(index) {
    lockedColors[index] = !lockedColors[index];
    updatePaletteDisplay();
    showToast(lockedColors[index] ? 'Color locked!' : 'Color unlocked!');
}

// 🎯 TASK: Palette color copy
function copyPaletteColor(index) {
    const color = paletteColors[index];
    copyToClipboard(color);
    showToast('Color copied to clipboard!');
}

// 🎯 TASK: Palette export
function exportPalette() {
    // Create CSS and JSON formats
    const cssContent = `/* Color Palette */\n:root {\n${paletteColors.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n')}\n}`;

    const jsonContent = JSON.stringify({
        palette: paletteColors,
        type: paletteTypeSelect.value,
        created: new Date().toISOString()
    }, null, 2);

    // Create download
    const blob = new Blob([cssContent + '\n\n' + jsonContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Palette exported!');
}



// ============================================
// 6️⃣ GRADIENT MODE
// ============================================

// 🎯 TASK: Gradient preview update
function updateGradientPreview() {
    const direction = gradientDirection;
    const color1 = gradientColors[0];
    const color2 = gradientColors[1];
    const color3 = gradientColors[2];

    let gradientCSS = '';

    if(direction === 'circle') {
        gradientCSS = `radial-gradient(circle, ${color1}, ${color2}, ${color3})`;
    } else {
        gradientCSS = `linear-gradient(${direction}, ${color1}, ${color2}, ${color3})`;
    }

    // Update preview
    gradientPreview.style.background = gradientCSS;

    // Update CSS code display
    const codeElement = gradientCodeDisplay.querySelector('code');
    codeElement.textContent = `background: ${gradientCSS};`;
}

// 🎯 TASK: Random gradient
function randomizeGradient() {
    gradientColors[0] = randomHexColor();
    gradientColors[1] = randomHexColor();
    gradientColors[2] = randomHexColor();

    // Update input values
    gradientColor1.value = gradientColors[0];
    gradientColor2.value = gradientColors[1];
    gradientColor3.value = gradientColors[2];

    updateGradientPreview();
    showToast('Gradient randomized!');
}

// 🎯 TASK: Gradient CSS copy
function copyGradientCode() {
    const codeElement = gradientCodeDisplay.querySelector('code');
    const cssCode = codeElement.textContent;

    copyToClipboard(cssCode);
    showToast('Gradient CSS copied!');
}



// ============================================
// 7️⃣ FAVORITES MODE
// ============================================

// 🎯 TASK: Favorites display
function updateFavoritesDisplay() {
    favoritesGrid.innerHTML = '';

    if(favorites.length === 0) {
        favoritesGrid.innerHTML = '<p class="empty-message">No favorite colors yet. Start saving colors you love!</p>';
        return;
    }

    favorites.forEach((color, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.style.backgroundColor = color;
        favoriteItem.setAttribute('data-color', color);
        favoriteItem.onclick = () => applyFavoriteColor(color);

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-fav-btn';
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            border: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            favorites.splice(index, 1);
            saveFavoritesToStorage();
            updateFavoritesDisplay();
            showToast('Color removed from favorites!');
        };

        favoriteItem.style.position = 'relative';
        favoriteItem.appendChild(deleteBtn);
        favoriteItem.addEventListener('mouseenter', () => deleteBtn.style.opacity = '1');
        favoriteItem.addEventListener('mouseleave', () => deleteBtn.style.opacity = '0');

        favoritesGrid.appendChild(favoriteItem);
    });
}

// 🎯 TASK: Favorite color apply karna
function applyFavoriteColor(hex) {
    currentMode = 'single';
    switchMode('single');
    updateSingleColorDisplay(hex);
    showToast('Color applied!');
}

// 🎯 TASK: Clear favorites
function clearFavorites() {
    if(favorites.length === 0) {
        showToast('No favorites to clear!');
        return;
    }

    if(confirm('Are you sure you want to clear all favorites?')) {
        favorites = [];
        saveFavoritesToStorage();
        updateFavoritesDisplay();
        showToast('All favorites cleared!');
    }
}

// 🎯 TASK: localStorage save
function saveFavoritesToStorage() {
    localStorage.setItem('colorGeneratorFavorites', JSON.stringify(favorites));
}

// 🎯 TASK: localStorage load
function loadFavoritesFromStorage() {
    const saved = localStorage.getItem('colorGeneratorFavorites');
    if(saved) {
        favorites = JSON.parse(saved);
        updateFavoritesDisplay();
    }
}



// ============================================
// 8️⃣ COMMON UTILITIES
// ============================================

// 🎯 TASK: Clipboard function
function copyToClipboard(text) {
    // Modern clipboard API
    if(navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => console.log('Copied to clipboard'))
            .catch(err => console.error('Failed to copy:', err));
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

// 🎯 TASK: Toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 🎯 TASK: Mode switch
function switchMode(mode) {
    currentMode = mode;

    // Update tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        if(tab.getAttribute('data-tab') === mode) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update content
    const contents = document.querySelectorAll('.mode-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const activeContent = document.getElementById(`${mode}-mode`);
    if(activeContent) {
        activeContent.classList.add('active');
    }
}



// ============================================
// 9️⃣ KEYBOARD SHORTCUTS
// ============================================

function handleKeyboardShortcuts(e) {
    // Ignore if typing in input
    if(e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') {
        return;
    }

    switch(e.key.toLowerCase()) {
        case ' ': // Space - Generate
            e.preventDefault();
            if(currentMode === 'single') {
                generateSingleColor();
            } else if(currentMode === 'palette') {
                generatePalette();
            } else if(currentMode === 'gradient') {
                randomizeGradient();
            }
            break;

        case 'c': // C - Copy
            if(currentMode === 'single') {
                copyColor('hex');
            }
            break;

        case 'f': // F - Add to Favorites
            if(currentMode === 'single') {
                saveColorToFavorites();
            }
            break;
    }
}


// ============================================
// EVENT LISTENERS
// ============================================

// Tab switching
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-tab');
        switchMode(mode);
    });
});

// Single mode
generateSingleBtn.addEventListener('click', generateSingleColor);
saveColorBtn.addEventListener('click', saveColorToFavorites);
pickColorBtn.addEventListener('click', openColorPicker);

// Single mode - Copy buttons (using event delegation)
document.querySelectorAll('#single-mode .copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const format = e.currentTarget.getAttribute('data-format');
        copyColor(format);
    });
});

// Palette mode
generatePaletteBtn.addEventListener('click', generatePalette);
exportPaletteBtn.addEventListener('click', exportPalette);

// Palette mode - Lock buttons (using event delegation)
document.addEventListener('click', (e) => {
    if(e.target.closest('.lock-btn')) {
        const btn = e.target.closest('.lock-btn');
        const index = parseInt(btn.getAttribute('data-index'));
        toggleLock(index);
    }
});

// Palette mode - Copy buttons (using event delegation)
document.addEventListener('click', (e) => {
    if(e.target.closest('.copy-btn-small')) {
        const btn = e.target.closest('.copy-btn-small');
        const index = parseInt(btn.getAttribute('data-index'));
        copyPaletteColor(index);
    }
});

// Gradient mode
gradientDirectionSelect.addEventListener('change', (e) => {
    gradientDirection = e.target.value;
    updateGradientPreview();
});

gradientColor1.addEventListener('input', (e) => {
    gradientColors[0] = e.target.value;
    updateGradientPreview();
});

gradientColor2.addEventListener('input', (e) => {
    gradientColors[1] = e.target.value;
    updateGradientPreview();
});

gradientColor3.addEventListener('input', (e) => {
    gradientColors[2] = e.target.value;
    updateGradientPreview();
});

randomizeGradientBtn.addEventListener('click', randomizeGradient);

// Gradient mode - Copy button
const copyGradientBtn = document.getElementById('copy-gradient-btn');
if(copyGradientBtn) {
    copyGradientBtn.addEventListener('click', copyGradientCode);
}

// Favorites mode
clearFavoritesBtn.addEventListener('click', clearFavorites);

// Keyboard shortcuts
document.addEventListener('keydown', handleKeyboardShortcuts);


// ============================================
// 🔟 INITIALIZATION
// ============================================

function init() {
    console.log('🎨 Color Generator initialized - Chai aur Code Style');

    // Load favorites from localStorage
    loadFavoritesFromStorage();

    // Initialize displays for all modes
    updateSingleColorDisplay(currentColor.hex);
    updatePaletteDisplay();
    updateGradientPreview();

    // Add smooth page transition
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Show welcome toast
    setTimeout(() => {
        showToast('🎨 Welcome to Color Generator! Press Space to generate colors.');
    }, 800);
}

// DOM ready check
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
