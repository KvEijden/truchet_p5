
const raster_w = 900;         // width of raster (floor) of truchet tiles
const cell_size = 10;         // the size of an edge of a square cell
let raster;

const anim_freq = 0.05;

function preload() {
  img = loadImage("../img/photo1.jpg");
}

function setup() {
  // Convert photo to b/w image
  img.filter(GRAY);
  
  // Resizing image to one pixel for every cell
  let ncol = raster_w / cell_size;   // the number of cells along the x-axis
  let ratio = img.height/img.width;
  let nrow  = int(ncol * ratio); 
  img.resize(ncol, nrow);
  
  // Make canvas the same size as raster
  createCanvas(raster_w, int(raster_w * ratio));
  
  fill('white')
  rect(0, 0, raster_w, height);
  raster = new TruchetRaster(ncol, nrow, cell_size, img);
  // raster.display_raster(img, cell_size);
  
  //rect(clip.x, clip.y, clip.w, clip.h);
  
}

function draw() {
  background('white');
  
  // animation function
  time = millis();
  let t = map(sin(2*PI * anim_freq * time/1000), -1, 1, 0, 1)
  raster.display_raster(t);
}
