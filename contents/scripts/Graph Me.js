    //  難易度順に入れ替える!!!
    let problems0 = {
       0 : {
         type : "title",
         xaxis : 370,//  0...740
         yaxis : 460,//  0...920
         gscale : 175/2,//  グラフの目盛
         vars : [0,0,1,0],//  各変数を使用するかどうか
         min : [-1,-1,0,-1],//  最小値
         value : [0,0,.4,0],//  初期値
         max : [1,1,1,1],//  最大値  いつか2にする!!!
         vscale : [0,0,0,0],//  変数値の目盛
         answer : [0,0,0,0]//  各変数の解答値
       }
    }
    let problems1 = {
       1 : {
        type : "explicit",
        funcstr : "y=a",
        func : (x,a,b,c,d) => {
          return a;
        },
        xaxis : 550,
        yaxis : 460,
        gscale : 60,
        vars : [1,0,0,0],
        min : [-10,-1,-1,-1],
        value : [0,0,0,0],
        max : [10,1,1,1],
        vscale : [0,0,0,0],
        answer : [4,0,0,0]
      },
       2 : {
        type : "explicit",
        funcstr : "y=ax+b",
        func : (x,a,b,c,d) => {
          return a*x+b;
        },
        xaxis : 550,
        yaxis : 460,
        gscale : 60,
        vars : [1,1,0,0],
        min : [-10,-10,-1,-1],
        value : [0,0,0,0],
        max : [10,10,1,1],
        vscale : [0,0,0,0],
        answer : [3,-2,0,0]
      },
       3 : {
        type : "explicit",
        funcstr : "y=a(x-2)+b",
        func : (x,a,b,c,d) => {
          return a*(x-2)+b;
        },
        xaxis : 550,
        yaxis : 320,
        gscale : 60,
        vars : [1,1,0,0],
        min : [-3,-10,-1,-1],
        value : [0,0,0,0],
        max : [3,10,1,1],
        vscale : [0,0,0,0],
        answer : [.5,2,0,0]
      },
       4 : {
        type : "explicit",
        funcstr : "y=a(bx+1)",
        func : (x,a,b,c,d) => {
          return a*(b*x+1);
        },
        xaxis : 200,
        yaxis : 460,
        gscale : 60,
        vars : [1,1,0,0],
        min : [-10,-1,-1,-1],
        value : [0,0,0,0],
        max : [3,1,1,1],
        vscale : [0,0,0,0],
        answer : [-6,.25,0,0]
      },
       5 : {
        type : "explicit",
        funcstr : "y=ax^2+b",
        func : (x,a,b,c,d) => {
          return a*x*x+b;
        },
        xaxis : 370,
        yaxis : 460,
        gscale : 60,
        vars : [1,1,0,0],
        min : [-1,-5,-1,-1],
        value : [0,0,0,0],
        max : [1,5,1,1],
        vscale : [0,0,0,0],
        answer : [-.25,3,0,0]
      },
       6 : {
        type : "explicit",
        funcstr : "y=a(x-b)^2+c",
        func : (x,a,b,c,d) => {
          return a*(x-b)**2+c;
        },
        xaxis : 370,
        yaxis : 460,
        gscale : 60,
        vars : [1,1,1,0],
        min : [-3,-10,-10,-1],
        value : [0,0,0,0],
        max : [3,10,10,1],
        vscale : [0,0,0,0],
        answer : [.5,3,-2,0]
      },
       7 : {
        type : "explicit",
        funcstr : "y=a(x-b)(x-c)",
        func : (x,a,b,c,d) => {
          return a*(x-b)*(x-c);
        },
        xaxis : 370,
        yaxis : 460,
        gscale : 60,
        vars : [1,1,1,0],
        min : [-1,-5,-10,-1],
        value : [0,0,0,0],
        max : [1,5,10,1],
        vscale : [0,0,0,0],
        answer : [.125,3,-6,0]
      },
       8 : {
        type : "explicit",
        funcstr : "y=ax(x-b)+c",
        func : (x,a,b,c,d) => {
          return a*x*(x-b)+c;
        },
        xaxis : 370,
        yaxis : 460,
        gscale : 60,
        vars : [1,1,1,0],
        min : [-1,-10,-10,-1],
        value : [0,0,0,0],
        max : [1,10,10,1],
        vscale : [0,0,0,0],
        answer : [-.25,4,3,0]
      },
       9 : {
        type : "explicit",
        hide : 1,
        tangent : 1,
        funcstr : "y=0.25x^2+a",
        func : (x,a,b,c,d) => {
          return x*x/4+a;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-5;
        },
        xaxis : 370,
        yaxis : 460,
        gscale : 60,
        vars : [1,0,0,0],
        min : [-10,-10,-10,-1],
        value : [0,0,0,0],
        max : [10,10,10,1],
        vscale : [0,0,0,0],
        answer : [-4,4,3,0]
      },
      10 : {
        type : "explicit",
        hide : 1,
        points : [4],
        tangent : 1,
        funcstr : "y=ax^2+abx",
        func : (x,a,b,c,d) => {
          return a*x*x+a*b*x;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-4;
        },
        xaxis : 500,
        yaxis : 300,
        gscale : 60,
        vars : [1,1,0,0],
        min : [-1,-5,-10,-1],
        value : [0,0,0,0],
        max : [1,5,10,1],
        vscale : [0,0,0,0],
        answer : [.25,-4,3,0]
      },
      11 : {
        type : "explicit",
        hide : 1,
        points : [0,4],
        tangent : 1,
        funcstr : "y=a(x^2-b)",
        func : (x,a,b,c,d) => {
          return a*(x*x-b);
        },
        funcTangent : (x,a,b,c,d)=>{
          return -5;
        },
        xaxis : 400,
        yaxis : 400,
        gscale : 60,
        vars : [1,1,0,0],
        min : [-1,-5,-10,-1],
        value : [0,0,0,0],
        max : [1,10,10,1],
        vscale : [0,0,0,0],
        answer : [.5,10,3,0]
      },
      12 : {
        type : "explicit",
        hide : 1,
        points : [-3,1,5],
        tangent : 0,
        funcstr : "y=ax^2+bx+c",
        func : (x,a,b,c,d) => {
          return a*x*x+b*x+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return -5;
        },
        xaxis : 400,
        yaxis : 400,
        gscale : 60,
        vars : [1,1,1,0],
        min : [-1,-1,-5,-1],
        value : [0,0,0,0],
        max : [1,1,5,1],
        vscale : [0,0,0,0],
        answer : [.25,-.5,-3.75,0]
      }
    };
    let problems2 = {
      13 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        funcstr : "y=asin(x)+b",
        func : (x,a,b,c,d) => {
          return a*Math.sin(x)+b;
        },
        funcTangent : (x,a,b,c,d)=>{
          return -5;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,0,0],
        min : [-5,-5,-5,-1],
        value : [0,0,0,0],
        max : [5,5,5,1],
        vscale : [0,0,0,0],
        answer : [3,-2,-3.75,0]
      },
      14 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        funcstr : "y=acos(bx)+c",
        func : (x,a,b,c,d) => {
          return a*Math.cos(b*x)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return -5;
        },
        xaxis : 450,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-5,0,-5,-1],
        value : [0,0,0,0],
        max : [5,5,5,1],
        vscale : [0,0,0,0],
        answer : [2,5,1,0]
      },
      15 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        funcstr : "y=atan(bx)+c",
        func : (x,a,b,c,d) => {
          return a*Math.tan(b*x)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return -5;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-2,0,-5,-1],
        value : [0,0,0,0],
        max : [2,3,5,1],
        vscale : [0,0,0,0],
        answer : [-1,.5,3,0]
      },
      16 : {
        type : "explicit",
        hide : 1,
        points : [0],
        tangent : 1,
        funcstr : "y=asin(x-b)",
        func : (x,a,b,c,d) => {
          return a*Math.sin(x-b);
        },
        funcTangent : (x,a,b,c,d)=>{
          return -3;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,0,0],
        min : [0,-2,-5,-1],
        value : [0,1,0,0],
        max : [5,2,5,1],
        vscale : [0,0,0,0],
        answer : [3,0,3,0]
      },
      17 : {
        type : "explicit",
        hide : 1,
        points : [0],
        tangent : 1,
        tangent2 : 1,
        funcstr : "y=asin(x-b)+c",
        func : (x,a,b,c,d) => {
          return a*Math.sin(x-b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return -1;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -7;
        },
        xaxis : 100,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [0,0,-5,-1],
        value : [0,0,0,0],
        max : [5,5,5,1],
        vscale : [0,0,0,0],
        answer : [3,4,-4,0]
      },
      18 : {
        type : "explicit",
        hide : 1,
        points : [5],
        tangent : 1,
        tangent2 : 1,
        funcstr : "y=axsin(2x-b)",
        func : (x,a,b,c,d) => {
          return a*x*Math.sin(2*x-b);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x/2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -x/2;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,0,0],
        min : [0,-2,-5,-1],
        value : [0,0,0,0],
        max : [2,2,5,1],
        vscale : [0,0,0,0],
        answer : [.5,2,-4,0]
      },
      19 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=2sinax+sinbx",
        func : (x,a,b,c,d) => {
          return 2*Math.sin(a*x)+Math.sin(b*x);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x/2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -x/2;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 80,
        vars : [1,1,0,0],
        min : [0,0,-5,-1],
        value : [0,0,0,0],
        max : [5,10,5,1],
        vscale : [0,0,0,0],
        answer : [2,10,-4,0]
      },
      20 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=asinbx+cx",
        func : (x,a,b,c,d) => {
          return a*Math.sin(b*x)+c*x;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x/2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -x/2;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [0,-10,-3,-1],
        value : [0,0,0,0],
        max : [5,10,3,1],
        vscale : [0,0,0,0],
        answer : [4,-5,.75,0]
      },
      21 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=asinbx+ctanx",
        func : (x,a,b,c,d) => {
          return a*Math.sin(b*x)+Math.tan(c*x);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x/2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -x/2;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [0,-10,-3,-1],
        value : [0,0,0,0],
        max : [5,10,3,1],
        vscale : [0,0,0,0],
        answer : [2,7,1,0]
      },
      22 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=acos(bx-c)+d",
        func : (x,a,b,c,d) => {
          return a*Math.cos(b*x-c)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x/2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -x/2;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-5,0,-1,-5],
        value : [0,2.5,1,0],
        max : [5,5,1,5],
        vscale : [0,0,0,0],
        answer : [-3,3,1,3]
      },
      23 : {
        type : "explicit",
        hide : 1,
        points : [],
        tangent : 1,
        tangent2 : 1,
        funcstr : "y=(ax-b)cos3x+c",
        func : (x,a,b,c,d) => {
          return (a*x-b)*Math.cos(3*x)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 300,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-3,-5,-3,-5],
        value : [0,0,0,0],
        max : [3,5,3,5],
        vscale : [0,0,0,0],
        answer : [1,5,2,3]
      },
      24 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=asinbxsincx",
        func : (x,a,b,c,d) => {
          return a*Math.sin(b*x)*Math.sin(c*x);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 80,
        vars : [1,1,1,0],
        min : [0,0,0,-5],
        value : [0,0,0,0],
        max : [5,5,10,5],
        vscale : [0,0,0,0],
        answer : [3,3,8,3]
      }
    };
    let problems3 = {
      25 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a|x-b|+c",
        func : (x,a,b,c,d) => {
          return a*Math.abs(x-b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-5,-5,-5,-5],
        value : [0,0,0,0],
        max : [5,5,5,5],
        vscale : [0,0,0,0],
        answer : [2,3,-3,3]
      },
      26 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a#||x-b|-c#|-d",
        func : (x,a,b,c,d) => {
          return a*Math.abs(Math.abs(x-b)-c)-d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 300,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-5,-5,-5,-5],
        value : [0,0,0,0],
        max : [5,5,5,5],
        vscale : [0,0,0,0],
        answer : [2,3,2,3]
      },
      27 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a#||x-b|-c#|+x-d",
        func : (x,a,b,c,d) => {
          return a*Math.abs(Math.abs(x-b)-c)+x-d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 300,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-2,-5,-5,-5],
        value : [0,0,0,0],
        max : [2,5,5,5],
        vscale : [0,0,0,0],
        answer : [1,4,1,5]
      },
      28 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=|asinbx+c|",
        func : (x,a,b,c,d) => {
          return Math.abs(a*Math.sin(b*x)+c);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-5,0,-5,-5],
        value : [0,3,0,0],
        max : [5,6,5,5],
        vscale : [0,0,0,0],
        answer : [4,2,1,5]
      },
      29 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=asin#||bx-c|-d#|",
        func : (x,a,b,c,d) => {
          return a*Math.sin(Math.abs(Math.abs(b*x-c)-d));
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 400,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-5,-3,0,-10],
        value : [0,0,3,0],
        max : [5,3,6,10],
        vscale : [0,0,0,0],
        answer : [4,2,2,7]
      },
      30 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a|x^2+bx|+cx",
        func : (x,a,b,c,d) => {
          return a*Math.abs(x*x+b*x)+c*x;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 600,//370
        yaxis : 560,//460
        gscale : 80,
        vars : [1,1,1,0],
        min : [-3,-5,-2,-10],
        value : [0,0,0,0],
        max : [3,5,2,10],
        vscale : [0,0,0,0],
        answer : [1,3,-1,7]
      },
      31 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=|x-a|-|x-b|+c",
        func : (x,a,b,c,d) => {
          return Math.abs(x-a)-Math.abs(x-b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 470,//370
        yaxis : 460,//460
        gscale : 80,
        vars : [1,1,1,0],
        min : [-3,-3,-3,-10],
        value : [0,0,0,0],
        max : [3,3,3,10],
        vscale : [0,0,0,0],
        answer : [-1,2,1,7]
      },
      32 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=|x-a|-|x-b|+cx+d",
        func : (x,a,b,c,d) => {
          return Math.abs(x-a)-Math.abs(x-b)+c*x+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 560,//460
        gscale : 80,
        vars : [1,1,1,1],
        min : [-3,-3,-3,-3],
        value : [0,0,0,0],
        max : [3,3,3,3],
        vscale : [0,0,0,0],
        answer : [-2,0,-1,-2]
      },
      33 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=|x^2-a|-|x^2-b|+cx+d",
        func : (x,a,b,c,d) => {
          return Math.abs(x*x-a)-Math.abs(x*x-b)+c*x+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 560,//460
        gscale : 80,
        vars : [1,1,1,1],
        min : [-3,-3,-3,-3],
        value : [0,0,0,0],
        max : [3,3,3,3],
        vscale : [0,0,0,0],
        answer : [1,3,1,-1]
      },
      34 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=|x^2-a|-|x-b|+cx^2+d",
        func : (x,a,b,c,d) => {
          return Math.abs(x*x-a)-Math.abs(x-b)+c*x*x+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-3,-3,-2,-3],
        value : [0,0,0,0],
        max : [3,3,2,3],
        vscale : [0,0,0,0],
        answer : [2,3,-1,2]
      },
      35 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=(x-a)|x-b|+cx+d",
        func : (x,a,b,c,d) => {
          return (x-a)*Math.abs(x-b)+c*x+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-3,-3,-3,-3],
        value : [0,0,0,0],
        max : [3,3,3,3],
        vscale : [0,0,0,0],
        answer : [-1,1,-2,-1]
      },
      36 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a|sin3x+b|-csinx+d",
        func : (x,a,b,c,d) => {
          return a*Math.abs(Math.sin(3*x)+b)-c*Math.sin(x)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 50,
        vars : [1,1,1,1],
        min : [-5,-1,-5,-5],
        value : [0,0,0,0],
        max : [5,1,5,5],
        vscale : [0,0,0,0],
        answer : [4,-.6,3,-5]
      }
    };
    let problems4 = {
      37 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=ae^b^x",
        func : (x,a,b,c,d) => {
          return a*Math.exp(b*x);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 600,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,0,0],
        min : [-5,-5,0,-5],
        value : [0,0,0,0],
        max : [5,5,10,5],
        vscale : [0,0,0,0],
        answer : [2,2,8,3]
      },
      38 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=ae^b^x+c",
        func : (x,a,b,c,d) => {
          return a*Math.exp(b*x)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 170,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-5,-3,-5,-5],
        value : [0,0,0,0],
        max : [5,3,5,5],
        vscale : [0,0,0,0],
        answer : [-1,1,-3,3]
      },
      39 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=aln(x-b)+c",
        func : (x,a,b,c,d) => {
          let r = a*Math.log(x-b)+c;
          if(Number.isNaN(r))return -Math.sign(a)*Infinity;
          return r;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-5,-3,-3,-5],
        value : [0,0,0,0],
        max : [5,3,3,5],
        vscale : [0,0,0,0],
        answer : [1,-2,1,3]
      },
      40 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=ae^x+be^-^x+c",
        func : (x,a,b,c,d) => {
          return a*Math.exp(x)+b*Math.exp(-x)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-1,-1,-3,-5],
        value : [0,0,0,0],
        max : [1,1,3,5],
        vscale : [0,0,0,0],
        answer : [.2,-.4,1,3]
      },
      41 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=e^a^x^-^bsincx",
        func : (x,a,b,c,d) => {
          return Math.exp(a*x-b)*Math.sin(c*x);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-1,-5,-5,-5],
        value : [0,0,0,0],
        max : [1,5,5,5],
        vscale : [0,0,0,0],
        answer : [.2,-1,-5,3]
      },
      42 : {
        type : "explicit",
        hide : 1,
        points : [3],
        tangent : 1,
        tangent2 : 0,
        funcstr : "y=e^x^-^a+b",
        func : (x,a,b,c,d) => {
          return Math.exp(x-a)+b;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-6;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 270,//370
        yaxis : 360,//460
        gscale : 60,
        vars : [1,1,0,0],
        min : [-5,-5,-5,-5],
        value : [0,0,0,0],
        max : [5,5,5,5],
        vscale : [0,0,0,0],
        answer : [3,-4,-5,3]
      },
      43 : {
        type : "explicit",
        hide : 1,
        points : [],
        tangent : 1,
        tangent2 : 1,
        funcstr : "y=e^a^x^-^bsin5x+c",
        func : (x,a,b,c,d) => {
          return Math.exp(a*x-b)*Math.sin(5*x)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return Math.exp(a*x-b)+c;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -Math.exp(a*x-b)+c;
        },
        xaxis : 570,//370
        yaxis : 660,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-1,-5,-5,-5],
        value : [0,0,0,0],
        max : [1,5,5,5],
        vscale : [0,0,0,0],
        answer : [.2,-2,3,3]
      },
      44 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=(ae^x^+be^-^x)sincx+d",
        func : (x,a,b,c,d) => {
          return (a*Math.exp(x)+b*Math.exp(-x))*Math.sin(c*x)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return (a*Math.exp(x)+b*Math.exp(-x))+d;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -(a*Math.exp(x)+b*Math.exp(-x))+d;
        },
        xaxis : 570,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-1,-1,0,-5],
        value : [0,0,2,0],
        max : [1,1,4,5],
        vscale : [0,0,0,0],
        answer : [.2,.1,3,3]
      },
      45 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=aln(bx^2+c)",
        func : (x,a,b,c,d) => {
          let r = a*Math.log(b*x*x+c);
          if(Number.isNaN(r))return -Math.sign(a)*Infinity;
          return r;
        },
        funcTangent : (x,a,b,c,d)=>{
          return (a*Math.exp(x)+b*Math.exp(-x))+d;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -(a*Math.exp(x)+b*Math.exp(-x))+d;
        },
        xaxis : 470,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-5,-5,-5,-5],
        value : [0,0,0,0],
        max : [5,5,5,5],
        vscale : [0,0,0,0],
        answer : [1,4,5,3]
      },
      46 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=e^a^x+bcoscx+d",
        func : (x,a,b,c,d) => {
          return Math.exp(a*x)+b*Math.cos(c*x)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return Math.exp(a*x)+d+b;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return Math.exp(a*x)+d-b;
        },
        xaxis : 170,//370
        yaxis : 360,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-1,-5,0,-10],
        value : [0,0,2,0],
        max : [1,5,4,10],
        vscale : [0,0,0,0],
        answer : [.3,3,3,-6]
      },
      47 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=e^3^s^i^n^a^x^+^b+c",
        func : (x,a,b,c,d) => {
          return Math.exp(3*Math.sin(a*x)+b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return Math.exp(a*x)+d+b;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return Math.exp(a*x)+d-b;
        },
        xaxis : 520,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-3,-3,-5,-5],
        value : [0,0,0,0],
        max : [3,3,5,5],
        vscale : [0,0,0,0],
        answer : [3,-1,-3,-3]
      },
      48 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=|e^a^x+b|+c",
        func : (x,a,b,c,d) => {
          return Math.abs(Math.exp(a*x)+b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return Math.exp(a*x)+d+b;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return Math.exp(a*x)+d-b;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,0],
        min : [-3,-5,-5,-5],
        value : [0,0,0,0],
        max : [3,5,5,5],
        vscale : [0,0,0,0],
        answer : [1,-4,-2,-3]
      }
    };
    let problems5 = {
      49 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=ax^3+bx",
        func : (x,a,b,c,d) => {
          return a*x*x*x+b*x;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,0,0],
        min : [-3,-5,-5,-5],
        value : [0,0,0,0],
        max : [3,5,5,5],
        vscale : [0,0,0,0],
        answer : [1,-4,8,3]
      },
      50 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=(x-a)(x-b)(x-c)",
        func : (x,a,b,c,d) => {
          return (x-a)*(x-b)*(x-c);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 50,
        vars : [1,1,1,0],
        min : [0,-4,-2,-5],
        value : [2,-2,0,0],
        max : [4,0,2,5],
        vscale : [0,0,0,0],
        answer : [3,-1,2,3]
      },
      51 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=#((x-a)^2-b#)^2-c",
        func : (x,a,b,c,d) => {
          return ((x-a)**2-b)**2-c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 660,//460
        gscale : 50,
        vars : [1,1,1,0],
        min : [-5,-5,-5,-5],
        value : [0,0,0,0],
        max : [5,5,5,5],
        vscale : [0,0,0,0],
        answer : [-3,3,4,3]
      },
      52 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=x(x-a)(x-b)+c",
        func : (x,a,b,c,d) => {
          return x*(x-a)*(x-b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 560,//460
        gscale : 50,
        vars : [1,1,1,0],
        min : [-5,-3,-5,-5],
        value : [0,0,0,0],
        max : [5,3,5,5],
        vscale : [0,0,0,0],
        answer : [-4,-2,2,3]
      },
      53 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a|x-b||x-c|(x-d)",
        func : (x,a,b,c,d) => {
          return a*Math.abs(x-b)*Math.abs(x-c)*(x-d);
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 300,//370
        yaxis : 600,//460
        gscale : 40,
        vars : [1,1,1,1],
        min : [-1,-5,-3,-3],
        value : [0,0,0,0],
        max : [1,5,3,3],
        vscale : [0,0,0,0],
        answer : [.2,-5,1,-1]
      },
      54 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=|ax^3-bx-c|-d",
        func : (x,a,b,c,d) => {
          return Math.abs(a*x**3-b*x-c)-d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return x-3;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 400,//370
        yaxis : 460,//460
        gscale : 80,
        vars : [1,1,1,1],
        min : [-5,-6,-5,-5],
        value : [0,-2,0,0],
        max : [5,2,5,5],
        vscale : [0,0,0,0],
        answer : [-2,-4,4,3]
      },
      55 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=#|ax+(x-b)^2|x-c|#|+d",
        func : (x,a,b,c,d) => {
          return Math.abs(a*x+(x-b)**2*Math.abs(x-c))+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return a*x;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return 7-x;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,1,1],
        min : [-5,0,-6,-5],
        value : [0,0,0,0],
        max : [5,6,0,5],
        vscale : [0,0,0,0],
        answer : [-2,2,-1,-1]
      },
      56 : {
        type : "explicit",
        hide : 1,
        points : [],
        tangent : 1,
        tangent2 : 1,
        funcstr : "y=(x^2-a)(x^2-b)",
        func : (x,a,b,c,d) => {
          return (x*x-a)*(x*x-b);
        },
        funcTangent : (x,a,b,c,d)=>{
          return 4;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -9/4;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 80,
        vars : [1,1,0,0],
        min : [-5,-2,-6,-5],
        value : [0,0,0,0],
        max : [5,2,0,5],
        vscale : [0,0,0,0],
        answer : [4,1,-1,-1]
      },
      57 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a(x-b)(x-c)|x-d|",
        func : (x,a,b,c,d) => {
          return a*(x-b)*(x-c)*Math.abs(x-d);
        },
        funcTangent : (x,a,b,c,d)=>{
          return 4;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -9/4;
        },
        xaxis : 300,//370
        yaxis : 460,//460
        gscale : 80,
        vars : [1,1,1,1],
        min : [-3,-3,-3,-3],
        value : [0,0,0,0],
        max : [3,3,3,3],
        vscale : [0,0,0,0],
        answer : [-1,1,1,-2]
      },
      58 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=a+#|(x^2+bx+c)^2-d#|",
        func : (x,a,b,c,d) => {
          return a+Math.abs((x*x+b*x+c)**2-d);
        },
        funcTangent : (x,a,b,c,d)=>{
          return 4;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -9/4;
        },
        xaxis : 300,//370
        yaxis : 460,//460
        gscale : 80,
        vars : [1,1,1,1],
        min : [-3,-3,-3,-2],
        value : [0,0,0,0],
        max : [3,3,3,2],
        vscale : [0,0,0,0],
        answer : [-2,-2,-1,1]
      },
      59 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=x(x-a)(x-b)(x-c)(x-d)",
        func : (x,a,b,c,d) => {
          return x*(x-a)*(x-b)*(x-c)*(x-d);
        },
        funcTangent : (x,a,b,c,d)=>{
          return 4;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -9/4;
        },
        xaxis : 500,//370
        yaxis : 460,//460
        gscale : 100,
        vars : [1,1,1,1],
        min : [-3,-4,2,1],
        value : [0,-1,3,3],
        max : [3,2,4,5],
        vscale : [0,0,0,0],
        answer : [0,0,2,2]
      },
      60 : {
        type : "explicit",
        hide : 1,
        points : [-1,1],
        tangent : 1,
        tangent2 : 1,
        funcstr : "y=ax^3-3ax+b",
        func : (x,a,b,c,d) => {
          return a*x**3-3*a*x+b;
        },
        funcTangent : (x,a,b,c,d)=>{
          return 2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -6;
        },
        xaxis : 300,//370
        yaxis : 460,//460
        gscale : 60,
        vars : [1,1,0,0],
        min : [-3,-5,-5,1],
        value : [0,-1,3,3],
        max : [3,5,5,5],
        vscale : [0,0,0,0],
        answer : [2,-2,-2,2]
      }
    };
    let problems6 = {
      61 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{a}{x-b}+c",
        func : (x,a,b,c,d) => {
          return a/(x-b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return 2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -6;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 51,//  綺麗な値にしない．
        vars : [1,1,1,0],
        min : [-5,-5,-5,1],
        value : [0,0,0,3],
        max : [5,5,5,5],
        vscale : [0,0,0,0],
        answer : [-3,2,-2,2]
      },
      62 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{ax}{x^2+bx+c}",
        func : (x,a,b,c,d) => {
          return (a*x)/(x*x+b*x+c);
        },
        funcTangent : (x,a,b,c,d)=>{
          return 2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -6;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 51,//  綺麗な値にしない．
        vars : [1,1,1,0],
        min : [-5,-3,-3,1],
        value : [0,0,0,3],
        max : [5,3,3,5],
        vscale : [0,0,0,0],
        answer : [5,0,1,2]
      },
      63 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{a}{x-b}+cx+d",
        func : (x,a,b,c,d) => {
          return (a)/(x-b)+c*x+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return 2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -6;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 51,//  綺麗な値にしない．
        vars : [1,1,1,1],
        min : [-3,-3,-3,-3],
        value : [0,0,0,0],
        max : [3,3,3,3],
        vscale : [0,0,0,0],
        answer : [1,1,1,-2]
      },
      64 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=$|F{a}{|x-b|}-c$|+d",
        func : (x,a,b,c,d) => {
          return Math.abs((a)/Math.abs(x-b)-c)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return 2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -6;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 71,//  綺麗な値にしない．
        vars : [1,1,1,1],
        min : [0,-5,-5,-5],
        value : [4,0,0,0],
        max : [8,5,5,5],
        vscale : [0,0,0,0],
        answer : [2,3,4,-2]
      },
      65 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{1}{(x-a)(x-b)}+c",
        func : (x,a,b,c,d) => {
          return 1/(x-a)/(x-b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return 2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -6;
        },
        xaxis : 370,//370
        yaxis : 240.3,//460
        gscale : 70.1,//  綺麗な値にしない．
        vars : [1,1,1,0],
        min : [-5,-4,-5,-5],
        value : [0,1,0,0],
        max : [5,6,5,5],
        vscale : [0,0,0,0],
        answer : [-1,6,-2,-2]
      },
      66 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{asinbx}{x-c}+d",
        func : (x,a,b,c,d) => {
          return (a*Math.sin(b*x))/(x-c)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return 2;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -6;
        },
        xaxis : 550,//370
        yaxis : 460,//460
        gscale : 50.1,//  綺麗な値にしない．
        vars : [1,1,1,1],
        min : [-5,0,-5,-5],
        value : [0,3,0,0],
        max : [5,6,5,5],
        vscale : [0,0,0,0],
        answer : [-3,4,2,3]
      },
      67 : {
        type : "explicit",
        hide : 1,
        points : [-1.62],
        tangent : 1,
        tangent2 : 1,
        funcstr : "y=F{asin3x}{x-b}+c",
        func : (x,a,b,c,d) => {
          return (a*Math.sin(3*x))/(x-b)+c;
        },
        funcTangent : (x,a,b,c,d)=>{
          return a/(x-b)+c;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -a/(x-b)+c;
        },
        xaxis : 250,//370
        yaxis : 660,//460
        gscale : 50.1,//  綺麗な値にしない．
        vars : [1,1,1,0],
        min : [-5,-5,-5,-5],
        value : [0,0,0,0],
        max : [5,5,5,5],
        vscale : [0,0,0,0],
        answer : [3,-3,-5,3]
      },
      68 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{sin(x-a)}{cos(bx-c)}+d",
        func : (x,a,b,c,d) => {
          return Math.sin(x-a)/Math.cos(b*x-c)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return a/(x-b)+c;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -a/(x-b)+c;
        },
        xaxis : 370,//370
        yaxis : 660,//460
        gscale : 80.1,//  綺麗な値にしない．
        vars : [1,1,1,1],
        min : [-1,0,-1,-5],
        value : [0,2,0,0],
        max : [1,4,1,5],
        vscale : [0,0,0,0],
        answer : [-.5,3,-1,-2]
      },
      69 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{a}{x-b}+cx+d|x|",
        func : (x,a,b,c,d) => {
          return a/(x-b)+c*x+d*Math.abs(x);
        },
        funcTangent : (x,a,b,c,d)=>{
          return a/(x-b)+c;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -a/(x-b)+c;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 50.1,//  綺麗な値にしない．
        vars : [1,1,1,1],
        min : [-3,-5,-3,-3],
        value : [0,0,0,0],
        max : [3,5,3,3],
        vscale : [0,0,0,0],
        answer : [-1,3,2,-3]
      },
      70 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{a}{|x+b|+c}+d",
        func : (x,a,b,c,d) => {
          return a/(Math.abs(x+b)+c)+d;
        },
        funcTangent : (x,a,b,c,d)=>{
          return a/(x-b)+c;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -a/(x-b)+c;
        },
        xaxis : 370,//370
        yaxis : 460,//460
        gscale : 50.1,//  綺麗な値にしない．
        vars : [1,1,1,1],
        min : [-3,-5,-3,-3],
        value : [0,0,0,0],
        max : [3,5,3,3],
        vscale : [0,0,0,0],
        answer : [-2,-3,-1,1]
      },
      71 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=F{a}{#||x+b|+c#|+d}",
        func : (x,a,b,c,d) => {
          return a/(Math.abs(Math.abs(x+b)+c)+d);
        },
        funcTangent : (x,a,b,c,d)=>{
          return a/(x-b)+c;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -a/(x-b)+c;
        },
        xaxis : 470,//370
        yaxis : 460,//460
        gscale : 50.1,//  綺麗な値にしない．
        vars : [1,1,1,1],
        min : [-3,-5,-3,-3],
        value : [0,0,0,0],
        max : [3,5,3,3],
        vscale : [0,0,0,0],
        answer : [-1,2,-3,-2]
      },
      72 : {
        type : "explicit",
        hide : 0,
        points : [],
        tangent : 0,
        tangent2 : 0,
        funcstr : "y=asinF{b}{x^2+c}",
        func : (x,a,b,c,d) => {
          return a*Math.sin(b/(x*x+c));
        },
        funcTangent : (x,a,b,c,d)=>{
          return a/(x-b)+c;
        },
        funcTangent2 : (x,a,b,c,d)=>{
          return -a/(x-b)+c;
        },
        xaxis : 470,//370
        yaxis : 460,//460
        gscale : 50.1,//  綺麗な値にしない．
        vars : [1,1,1,0],
        min : [-5,-3,-1,-2],
        value : [0,0,0,0],
        max : [5,3,1,2],
        vscale : [0,0,0,0],
        answer : [-3,3,.5,1]
      }
    };

    let problems = {
      ...problems0,
      ...problems1,
      ...problems2,
      ...problems3,
      ...problems4,
      ...problems5,
      ...problems6,
      /*...problems7,
      ...problems8,
      ...problems9,
      ...problems10,
      ...problems11,
      ...problems12,*/
    }
