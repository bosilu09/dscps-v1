const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function addWatermark(imagePath, watermarkPath, outputPath) {
    // Load the image and watermark
    const [image, watermark] = await Promise.all([
        loadImage(imagePath),
        loadImage(watermarkPath)
    ]);

    // Create a canvas with the same dimensions as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the main image
    ctx.drawImage(image, 0, 0);

    // Calculate watermark dimensions and position
    const watermarkWidth = image.width * 0.3; // Adjust this scale as needed
    const watermarkHeight = watermarkWidth * (watermark.height / watermark.width);
    const xPosition = image.width - watermarkWidth - 10; // 10px from right
    const yPosition = image.height - watermarkHeight - 10; // 10px from bottom

    // Draw the watermark
    ctx.drawImage(watermark, xPosition, yPosition, watermarkWidth, watermarkHeight);

    // Save the resulting image
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Watermarked image saved to ${outputPath}`);
}

// Usage example
addWatermark('./image.jpg', './DSCPS3@3x.png', './watermarked_image.png')
    .then(() => console.log('Watermark added successfully'))
    .catch(err => console.error('Error:', err));
