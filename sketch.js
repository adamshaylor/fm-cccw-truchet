const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

/**
 * Input
 */

const settings = {
  dimensions: [ 2048, 2048 ]
};

const seed = random.getRandomSeed();
random.setSeed(seed);

// eslint-disable-next-line no-console
console.log('seed:', seed);

const gridCount = [
  16,
  16
];

const cellDimensions = [
  settings.dimensions[0] / gridCount[0],
  settings.dimensions[1] / gridCount[1]
];


/**
 * Process
 */

const tileGrid = Array.from({ length: gridCount[0] }, (emptyColumn, columnIndex) => {
  return Array.from({ length: gridCount[1] }, (emptyRow, rowIndex) => {
    const rotations = [
      0,
      Math.PI / 2,
      Math.PI,
      3 * Math.PI / 2
    ];

    return {
      left: columnIndex * cellDimensions[0],
      top: rowIndex * cellDimensions[1],
      rotation: random.pick(rotations)
    };
  });
});

const drawTile = ({
  context,
  left,
  top,
  rotation,
  width,
  height
}) => {
  context.fillStyle = 'white';
  context.fillRect(left, top, width, height);
  
  const horizontalCenter = left + width / 2;
  const verticalCenter = top + height / 2;

  // Move the context to the center of the tile
  context.translate(horizontalCenter, verticalCenter);
  context.rotate(rotation);
  context.beginPath();

  // Draw ◢ from the center of the tile
  context.fillStyle = 'black';
  context.moveTo(width / 2, height / -2);
  context.lineTo(width / -2, height / 2);
  context.lineTo(width / 2, height / 2);
  context.fill();
  context.resetTransform();
};


/**
 * Output
 */

const sketch = () => {
  return ({ context }) => {
    tileGrid.forEach(column => {
      column.forEach(tile => {
        drawTile({
          context,
          width: cellDimensions[0],
          height: cellDimensions[1],
          ...tile
        });
      });
    })
  };
};

canvasSketch(sketch, settings);
