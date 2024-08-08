export const walls = new Set();

// left wall
for (let i = 0; i < 640; i += 16) {
    walls.add(`0,${i}`);
}

// top wall
for (let i = 0; i < 1104; i += 16) {
    walls.add(`${i},32`);
}

for (let i = 32; i < 128; i += 16) {
    walls.add(`${i},32`);
}