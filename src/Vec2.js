class Vec2 {
  constructor(x=0, y=0){
    this.x = x;
    this.y = y;
  }

  static sum(A, B){
    return new Vec2(A.x+B.x, A.y+B.y);
  }

  static dif(A, B){
    return new Vec2(A.x-B.x, A.y-B.y);
  }

  static cross(A,B){
    return A.x*B.y - A.y*B.x;
  }

  static rotAt(v,o,a){
    return Vec2.sum(Vec2.rot(Vec2.dif(v,o),a),o);
  }

  static rot(v,a){
    return new Vec2(
      v.x*Math.cos(a)-v.y*Math.sin(a),
      v.y*Math.cos(a)+v.x*Math.sin(a)
    )
  }
}