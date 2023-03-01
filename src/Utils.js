class Utils {
  static isIn_c(X, Y, x, y, w, h){
    return Math.abs(X - x) < w / 2 && Math.abs(Y - y) < h / 2;
  }

  static isIn_v(X, Y, x, y, w, h){
    return 0 < X-x && X-x < w && 0 < Y - y && Y - y < h;
  }

  static directions = [
    new Vec2( 1, 0),
    new Vec2( 0, 1),
    new Vec2(-1, 0),
    new Vec2( 0,-1),
  ];
}