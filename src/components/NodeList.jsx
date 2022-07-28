import React, { useEffect } from "react";
import Scene from "./3d-components/scene.jsx";
import * as THREE from "three";
const initialList = {};
const alphabets = "abcdefghijklmnopqrstuvwxyz";
let current = 0;
let editing = null;

const NodeList = () => {
  const [value, setValue] = React.useState("");
  const [list, setList] = React.useState(initialList);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => console.log(list), [list]);

  const handleSubmit = (event) => {
    if (!editing) {
      if (value) {
        setValue(event.target.value);
        setList({ ...list, [alphabets[current]]: value.split(",") });
      }
      current++;
    } else {
      setList({ ...list, [editing]: value.split(",") });
      editing = null;
    }
    setValue("");
    event.preventDefault();
  };

  const handleRemoveItem = (item) => {
    const newList = { ...list };
    delete newList[item];
    setList(newList);
  };

  const editItem = (item) => {
    editing = item;
    setValue(list[item].join(","));
  };

  //Catmull-Rom spline Creation
  const CurveCreate = () => {
    console.log(list);
    const conv = (arr) => arr.map((v) => JSON.parse("[" + v + "]"));

    const arrOfNum = conv(list);
    console.log(arrOfNum);

    // var curveParam = []
    // for (var i = 0; i <= arrOfNum.length; i++) {
    //     curveParam.push(i/arrOfNum.length)
    // }

    // console.log(curveParam)
    // var p = 2; //degree of curve
    // //https://pages.mtu.edu/~shene/COURSES/cs3621/NOTES/INT-APP/PARA-knot-generation.html
    // var knotVector = []
    // var m = p + arrOfNum.length;
    // //for array of length 2, = n + 1 =2, n = 1
    // //when p = 1, m = 3
    // //need m + 1 knots
    // for(var i = 0; i <=m; i++) {
    //     if (i <=p) {
    //         knotVector.push(0);
    //     } else if (i >= m-p ) {
    //         knotVector.push(1);
    //     } else {
    //         var calcKnot = i/(arrOfNum.length - p);
    //         knotVector.push(calcKnot);
    //     }
    // }

    // console.log('knot Vector')
    // console.log(knotVector)

    // let array = Array(rows).fill().map(() => Array(columns).fill(0));
    // console.log('here')
    // var createdSpline = BSpline(arrOfNum, 2, true)

    // console.log(createdSpline)
    var vector3s = [];
    for (var i = 0; i < arrOfNum.length; i++) {
      vector3s.push(
        new THREE.Vector3(arrOfNum[i][0], arrOfNum[i][1], arrOfNum[i][2])
      );
    }
    const curve = new THREE.CatmullRomCurve3(vector3s);
    var points = curve.getPoints(50);

    //console.log(points[1].y)

    var finalCurve = [];
    for (var i = 0; i < points.length; i++) {
      finalCurve.push([points[i].x, points[i].y, points[i].z]);
    }

    console.log(finalCurve);
  };
  var BSpline = function (points, degree, copy) {
    var points2 = [];
    if (copy) {
      for (var i = 0; i < points.length; i++) {
        points2.push(points[i]);
      }
    } else {
      console.log("bingo");

      points2 = points;
    }

    var dimension = points2[0].length;

    if (degree == 2) {
      var baseFunc = BSpline.prototype.basisDeg2(points2);
      var baseFuncRangeInt = 2;
    } else if (degree == 3) {
      this.baseFunc = this.basisDeg3;
      this.baseFuncRangeInt = 2;
    } else if (degree == 4) {
      this.baseFunc = this.basisDeg4;
      this.baseFuncRangeInt = 3;
    } else if (degree == 5) {
      this.baseFunc = this.basisDeg5;
      this.baseFuncRangeInt = 3;
    }
  };

  BSpline.prototype.seqAt = function (dim) {
    var points = this.points;
    var margin = this.degree + 1;
    return function (n) {
      if (n < margin) {
        return points[0][dim];
      } else if (points.length + margin <= n) {
        return points[points.length - 1][dim];
      } else {
        return points[n - margin][dim];
      }
    };
  };

  BSpline.prototype.basisDeg2 = function (x) {
    console.log("right here");
    if (-0.5 <= x && x < 0.5) {
      return 0.75 - x * x;
    } else if (0.5 <= x && x <= 1.5) {
      return 1.125 + (-1.5 + x / 2.0) * x;
    } else if (-1.5 <= x && x < -0.5) {
      return 1.125 + (1.5 + x / 2.0) * x;
    } else {
      return 0;
    }
  };

  BSpline.prototype.basisDeg3 = function (x) {
    if (-1 <= x && x < 0) {
      return 2.0 / 3.0 + (-1.0 - x / 2.0) * x * x;
    } else if (1 <= x && x <= 2) {
      return 4.0 / 3.0 + x * (-2.0 + (1.0 - x / 6.0) * x);
    } else if (-2 <= x && x < -1) {
      return 4.0 / 3.0 + x * (2.0 + (1.0 + x / 6.0) * x);
    } else if (0 <= x && x < 1) {
      return 2.0 / 3.0 + (-1.0 + x / 2.0) * x * x;
    } else {
      return 0;
    }
  };

  BSpline.prototype.basisDeg4 = function (x) {
    if (-1.5 <= x && x < -0.5) {
      return (
        55.0 / 96.0 +
        x * (-(5.0 / 24.0) + x * (-(5.0 / 4.0) + (-(5.0 / 6.0) - x / 6.0) * x))
      );
    } else if (0.5 <= x && x < 1.5) {
      return (
        55.0 / 96.0 +
        x * (5.0 / 24.0 + x * (-(5.0 / 4.0) + (5.0 / 6.0 - x / 6.0) * x))
      );
    } else if (1.5 <= x && x <= 2.5) {
      return (
        625.0 / 384.0 +
        x *
          (-(125.0 / 48.0) + x * (25.0 / 16.0 + (-(5.0 / 12.0) + x / 24.0) * x))
      );
    } else if (-2.5 <= x && x <= -1.5) {
      return (
        625.0 / 384.0 +
        x * (125.0 / 48.0 + x * (25.0 / 16.0 + (5.0 / 12.0 + x / 24.0) * x))
      );
    } else if (-1.5 <= x && x < 1.5) {
      return 115.0 / 192.0 + x * x * (-(5.0 / 8.0) + (x * x) / 4.0);
    } else {
      return 0;
    }
  };

  BSpline.prototype.basisDeg5 = function (x) {
    if (-2 <= x && x < -1) {
      return (
        17.0 / 40.0 +
        x *
          (-(5.0 / 8.0) +
            x *
              (-(7.0 / 4.0) +
                x * (-(5.0 / 4.0) + (-(3.0 / 8.0) - x / 24.0) * x)))
      );
    } else if (0 <= x && x < 1) {
      return (
        11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 - x / 12.0) * x * x)
      );
    } else if (2 <= x && x <= 3) {
      return (
        81.0 / 40.0 +
        x *
          (-(27.0 / 8.0) +
            x * (9.0 / 4.0 + x * (-(3.0 / 4.0) + (1.0 / 8.0 - x / 120.0) * x)))
      );
    } else if (-3 <= x && x < -2) {
      return (
        81.0 / 40.0 +
        x *
          (27.0 / 8.0 +
            x * (9.0 / 4.0 + x * (3.0 / 4.0 + (1.0 / 8.0 + x / 120.0) * x)))
      );
    } else if (1 <= x && x < 2) {
      return (
        17.0 / 40.0 +
        x *
          (5.0 / 8.0 +
            x *
              (-(7.0 / 4.0) + x * (5.0 / 4.0 + (-(3.0 / 8.0) + x / 24.0) * x)))
      );
    } else if (-1 <= x && x < 0) {
      return (
        11.0 / 20.0 + x * x * (-(1.0 / 2.0) + (1.0 / 4.0 + x / 12.0) * x * x)
      );
    } else {
      return 0;
    }
  };

  BSpline.prototype.getInterpol = function (seq, t) {
    var f = this.baseFunc;
    var rangeInt = this.baseFuncRangeInt;
    var tInt = Math.floor(t);
    var result = 0;
    for (var i = tInt - rangeInt; i <= tInt + rangeInt; i++) {
      result += seq(i) * f(t - i);
    }
    return result;
  };

  BSpline.prototype.calcAt = function (t) {
    t = t * ((this.degree + 1) * 2 + this.points.length); //t must be in [0,1]
    if (this.dimension == 2) {
      return [
        this.getInterpol(this.seqAt(0), t),
        this.getInterpol(this.seqAt(1), t),
      ];
    } else if (this.dimension == 3) {
      return [
        this.getInterpol(this.seqAt(0), t),
        this.getInterpol(this.seqAt(1), t),
        this.getInterpol(this.seqAt(2), t),
      ];
    } else {
      var res = [];
      for (var i = 0; i < this.dimension; i++) {
        res.push(this.getInterpol(this.seqAt(i), t));
      }
      return res;
    }
  };

  const listStyle = {
    listStyleType: "none",
    background: "rgba(255, 0, 0, 0.1)",
    padding: "20px",
    width: "100px",
  };

  return (
    <div>
      <h1>Node List</h1>
      <ul>
        {Object.keys(list).map((item, index) => (
          <li style={listStyle} onClick={() => handleRemoveItem(item)} key={index}>
            {list[item].join(",")}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">Add Item</button>
        <button onClick={CurveCreate}>Submit Nodes</button>
      </form>
      <Scene className="Canvas" list={list} />
    </div>
  );
};

export default NodeList;
