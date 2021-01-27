export const arrtominutes = (arr) => {
    var minutesarr = [];
    var tmp = 0;
    var tmp2 = [];
    for (let i=0; i<arr.length; i++) {
        if (arr[i] != tmp) {
            tmp = - - !tmp;
            tmp2.push((i*5).toString());
        }
    }
    if (arr[arr.length-1] == 1) tmp2.push((24*60/5).toString())
    for (let i=0; i<tmp2.length; i+=2) {
        minutesarr.push([tmp2[i], tmp2[i+1]]);
    }
    return minutesarr;
}

export const minsToTime = (min) => {
    let mins = - -min;
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
  }