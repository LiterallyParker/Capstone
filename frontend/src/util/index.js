export function addLeadingZeros(num, targetLength) {

  let numStr = num.toString();

  while (numStr.length < targetLength) {

    numStr = '0' + numStr;

  }

  return numStr;

}