class Map {
  constructor(ary) {
    this.target = 0;
    this.ary = [];
    this.deep = 0;
    if (ary != null) {
      for (let i = 0; i < ary.length; i++) {
        this.ary.push(new NumberObj(i, ary[i], this));
      }
    }
  }

  get solved() {
    let _solved = true;
    this.ary.forEach((a) => {
      if (a.val != this.target) _solved = false;
    });

    return _solved;
  }

  turn(pos) {
    this.ary[pos].turn();
  }

  print() {
    let str = "";

    for (let i = 0; i < 2; i++) {
      str = str + "[Pos" + i + "]" + this.ary[i].val + "\t";
    }
    str += "\n";
    for (let j = 3; j >= 2; j--) {
      str = str + "[Pos" + j + "]" + this.ary[j].val + "\t";
    }

    console.log(str + "\nTarget : " + this.target);
  }

  copy() {
    let new_ary = [];
    let this_ary = [];
    this.ary.forEach((n) => this_ary.push(n.val));
    Object.assign(new_ary, this_ary);

    let new_map = new Map(new_ary);
    new_map.deep = this.deep;
    new_map.target = this.target;
    return new_map;
  }

  solve(sol = [], solutions) {
    if (this.solved) {
      solutions.push(sol);
    } else {
      for (let i = 0; i < 4; i++) {
        let mt = this.copy();
        mt.turn(i);
        mt.deep++;
        let next_sol = [];
        Object.assign(next_sol, sol);
        next_sol.push(i);
        if (mt.deep < 10) mt.solve(next_sol, solutions);
      }
    }
  }
}

class NumberObj {
  constructor(pos, val, map) {
    this.pos = pos;
    this.val = val;
    this.map = map;
  }

  get adjacent() {
    if (this.pos % 2 == 0) return [1, 3];
    else return [0, 2];
  }

  add() {
    this.val++;
    this.val %= 4;
  }

  turn() {
    this.add();
    this.adjacent.forEach((a) => {
      this.map.ary[a].add();
    });
  }
}

function Rotate(btn) {
  let num = btn.innerText;
  num++;
  num %= 4;
  btn.innerText = num;
}

function SolveButton() {
  let pos0 = document.querySelector("#pos0");
  let pos1 = document.querySelector("#pos1");
  let pos2 = document.querySelector("#pos2");
  let pos3 = document.querySelector("#pos3");
  let target = document.querySelector("#target");

  let num0 = Number(pos0.innerText);
  let num1 = Number(pos1.innerText);
  let num2 = Number(pos2.innerText);
  let num3 = Number(pos3.innerText);
  let targetNum = Number(target.innerText);

  let m = new Map([num0, num1, num2, num3]);
  m.target = targetNum;

  console.log("Processing...");

  let sols = [];
  m.solve([], sols);

  let minLen = 100;
  let minSol = null;
  sols.forEach((s) => {
    if (s.length < minLen) {
      minLen = s.length;
      minSol = s;
    }
  });

  if (minSol == null || minSol.length === 0) {
    document.querySelector("#solution-footer").innerText =
      "솔루션이 없거나 이미 풀어진 패턴이에요...";
  } else {
    document.querySelector("#solution-footer").innerText =
      sols.length + " 개의 솔루션을 찾았습니다. 최적의 솔루션은";
    document.querySelector("#solution").innerText = minSol;
  }
}
