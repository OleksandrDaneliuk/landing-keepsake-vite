import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'raw-images';
const OUT = 'src/assets/images';

const PRESETS = [
    { prefix: 'work-', widths: [400, 800], ratio: 0.79 }, // 800x632
    { prefix: 'journal-', widths: [150, 300], ratio: 1 }, // 300x300
    { prefix: 'avatar-', widths: [96, 192], ratio: 1 },
];
const DEFAULT = { widths: [400, 800], ratio: 0.79 };

const FORMATS = {
    avif: (img) => img.avif({ quality: 50 }),
    webp: (img) => img.webp({ quality: 78 }),
    jpg: (img) => img.jpeg({ quality: 80, mozjpeg: true }),
};

await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));

for (const file of files) {
    const name = path.parse(file).name;
    const preset = PRESETS.find((p) => name.startsWith(p.prefix)) ?? DEFAULT;
    const { width: srcWidth } = await sharp(path.join(SRC, file)).metadata();

    for (const width of preset.widths) {
        if (width > srcWidth) {
            console.warn(`skip ${name}-${width}: оригінал вужчий (${srcWidth}px)`);
            continue;
        }
        const height = Math.round(width * preset.ratio);

        for (const [ext, encode] of Object.entries(FORMATS)) {
            const img = sharp(path.join(SRC, file)).resize({ width, height, fit: 'cover' });
            await encode(img).toFile(path.join(OUT, `${name}-${width}.${ext}`));
        }
        console.log(`ok   ${name}-${width} (${width}x${height})`);
    }
}