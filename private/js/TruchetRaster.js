// A Truchet Raster contains Truchet Tiles arranged in a pattern

class TruchetRaster {
  constructor(nw, nh, size, img) {
    this.ntiles_w  = nw;         // number of tiles horizontal
    this.ntiles_h  = nh;     // idem vertical
    this.tile_size = size     // size of edge of a tile (square)
    
    this.raster = [];
    this.pattern = [['b', 'a'], ['c', 'd']];
    
    // fill every raster cell with gray value of corresponding image pixel.
    //
    for (let row = 0; row < this.ntiles_h; row++) {       
      let raster_row = [];
      for (let col = 0; col < this.ntiles_w; col++) {
        let pat_mod = this.pattern.length     // asuming pattern is a square!
        let type = this.pattern[row%pat_mod][col%pat_mod];
        raster_row[col] = new AnimTruchetTile(this.tile_size, type, img.get(col, row)[0]);
      }
      this.raster[row] = raster_row;
    }
  }
  
  display_raster(t) {
    noStroke();

    for (let row = 0; row < this.ntiles_h; row++) {
      for (let col = 0; col < this.ntiles_w; col++) {
        // console.log(row, col, this.raster[row][col]);
        push();
        translate(col*this.tile_size, row*this.tile_size,);
        this.raster[row][col].display(t);
        pop();
       }
    }
  }
}

class AnimTruchetTile {
  constructor(size, type, gray_value) {
    
    this.type = type;
    this.size = size;
    this.gray_value = gray_value;
  }
  
  // display draws a tile at current canvas position. The factor t is for animation puposes.
  // If t = 0 an ordinary truchet tile of type type will be drawn. If t = 1 the black/white ratio of the tile reflects
  // the gray value of the tile which is equal to the pixel value of the image
  //
  display(t) {
    let q0, q1, q2, q3;       // corners of the black area of the tile.
    
    let g = constrain(map(this.gray_value, 0, 255, 0, 1), 0.25, 0.75);       // scale gray value
    let g1 = (g-0.5)*t + 0.5;
    switch(this.type) {
      case 'a' : 
        q0 = createVector((1-g1)*this.size, g1*this.size);
        q1 = createVector(this.size, this.size);
        q2 = createVector(0, this.size);
        q3 = createVector(0, 0);
        break;
      case 'b' :
        q0 = createVector((1-g1)*this.size, (1-g1)*this.size);
        q1 = createVector(0, this.size);
        q2 = createVector(0, 0);
        q3 = createVector(this.size, 0);
        break;
      case 'c' :
        q0 = createVector(g1*this.size, (1-g1)*this.size);
        q1 = createVector(0, 0);
        q2 = createVector(this.size, 0);
        q3 = createVector(this.size, this.size);
        break;
      case 'd' :
        q0 = createVector(g1*this.size, g1*this.size);
        q3 = createVector(0, this.size);
        q1 = createVector(this.size, 0);
        q2 = createVector(this.size, this.size);
        break;
    }
    fill('black');
    noStroke();
    quad(q0.x, q0.y, q1.x, q1.y, q2.x, q2.y, q3.x, q3.y);
  }
} 