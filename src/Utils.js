class Utils {
  static isIn_c(X, Y, x, y, w, h){
    return Math.abs(X - x) < w / 2 && Math.abs(Y - y) < h / 2;
  }
}