
const Sop = (spec1, spec3) => {
  var tans = spec1 / spec3;
  console.log(tans);
  return tans
}

const Son = (spec2, spec4) => {
  var tans = spec2/spec4;
  console.log(tans);
  return tans
}

const Sfp = (spec1, spec3, spec15) => {
  var tans = spec1/(spec15-spec3);
  console.log(tans);
  return tans
}

const Sfn = (spec1, spec4, spec16) => {
  var tans = spec1/(spec16-spec3);
  console.log(tans);
  return tans
}

const Dp = (x1, x2) => {
  var len = x2 - x1;
  console.log(len);
  return len
}

const Dn = (x3, x2) => {
  var len = x3 - x2;
  console.log(len);
  return len
}
