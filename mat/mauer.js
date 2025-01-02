function buildWall() {
    const wall = [];
    const wallWidth = 12;
    const wallHeight = 10;
    const brickSizes = [1, 2, 3, 4, 5, 6];

    for (let layer = 0; layer < wallHeight; layer++) {
        let row = [];
        let widthRemaining = wallWidth;

        while (widthRemaining > 0) {
            const brick = getRandomBrick(brickSizes, widthRemaining);
            if (brick !== null) {
                row.push(brick);
                widthRemaining -= brick;
            } else {
                // Reset row if no suitable brick is found
                row = [];
                widthRemaining = wallWidth;
            }
        }

        wall.push(row);
    }

    return wall;
}

function getRandomBrick(brickSizes, maxWidth) {
    const suitableBricks = brickSizes.filter(size => size <= maxWidth);
    if (suitableBricks.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * suitableBricks.length);
    return suitableBricks[randomIndex];
}

const wall = buildWall();
console.log(wall);
