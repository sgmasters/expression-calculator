function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
    let s = expr.replace(/\s/g, '');
  if (!checkIfContainsBracket(s)) {
    return simpleCalc(s);
  } else {
    checkBracketsPaired(s);
    return simpleCalc(calcComplex(s));
  }

  function simpleCalc(simpleExpression) {
    let splited = simpleExpression.split('+');
    let sum = 0;
    if (splited.length > 1) {
      for (let part of splited) {
        sum += calcSubstr(part);
      }
    } else {
      sum = calcSubstr(splited[0]);
    }
    return sum;

    function calcMultiply(substrPart) {
      let splited = substrPart.split('*');
      let mult = 1;
      if (splited.length > 1) {
        for (let part of splited) {
          mult *= calcDevide(part);
        }
      } else {
        mult = calcDevide(splited[0]);
      }
      return mult;
    }

    function calcDevide(substrPart) {
      let splited = substrPart.split('/');
      let devide = parseFloat(splited[0]);
      if (splited.length > 1) {
        for (let i = 1; i < splited.length; i++) {
          if (splited[i] == 0) {
            throw "TypeError: Division by zero.";
          }
          devide /= parseFloat(splited[i]);
        }
      }
      return devide;
    }

      function moveElem(array, index) {
          array[index] = array[index] + '-' + array[index + 1];
          return array.splice(index + 1, 1);
      }

      function checkWrongSplit(split) {
          for (let i = 0;i<split.length;i++) {
              let first = split[i].split('');
              let indexSpace = split.indexOf('');
              if (first[first.length - 1] == '/' || first[first.length - 1] == '*') {
                  moveElem(split, i);
                  i--;
              } else if (indexSpace != -1) {
                  moveElem(split, indexSpace);
                  i--;
              }
          }
      }

      function calcSubstr(sumPart) {
      let splited = sumPart.split('-');
        let substr;
        checkWrongSplit(splited);

        substr = calcMultiply(splited[0]);
      if (splited.length > 1) {
        for (let i = 1; i < splited.length; i++) {
          substr -= calcMultiply(splited[i]);
        }
      } else {
        substr = calcMultiply(splited[0]);
      }
      return substr;
    }
  }

  function checkIfContainsBracket(expression) {
    return expression.indexOf('(') != -1 || expression.indexOf(')') != -1;
  }

  function checkBracketsPaired(exp) {
    if (!(((exp.match(/[(]/g) || []).length) == ((exp.match(/[)]/g) || []).length))) {
      throw "ExpressionError: Brackets must be paired";
    }
  }

  function getInnerBracketsResult(brackets) {
    let firstBr = brackets.indexOf('(');
    let endBr = brackets.lastIndexOf(')');
    let innerBrackets = brackets.slice(firstBr+1, endBr);
    let result;
    if (checkIfContainsBracket(innerBrackets)) {
      getInnerBracketsResult(innerBrackets);
    } else {
      result = simpleCalc(innerBrackets);
    }
      return brackets.replace('(' + innerBrackets + ')', result);
  }

    function doSmall(string, opens, closes) {
        let simpleBrackets = string.substring(opens, closes + opens + 2);
        let res = string.replace(simpleBrackets, getInnerBracketsResult(simpleBrackets));
        return res;
    }

    function rowBrackets(str) {
      let open = str.indexOf('(');
      let nextOpen = str.substr(open+1).indexOf('(');
      let nextClose = str.substr(open+1).indexOf(')');
      let result;
      if (nextOpen == -1 && nextClose == -1) {
        result = '' + simpleCalc(str);
      } else if (nextClose < nextOpen || nextOpen == -1) {
        result = rowBrackets(doSmall(str, open, nextClose));
      } else if (nextOpen < nextClose) {
        let lastClose = str.lastIndexOf(')');
        let prevLastClose = str.slice(0, lastClose).lastIndexOf(')');
        let lastOpen = str.lastIndexOf('(');
        if (lastOpen < prevLastClose) {
            result = rowBrackets(doSmall(str, lastOpen, lastClose));
        } else {
            let complexBrackets = str.substring(open + 1, lastClose);
            result = str.replace('(' + complexBrackets + ')', simpleCalc(rowBrackets(complexBrackets)));
        }
      }
      return result;
  }

  function calcComplex(ss) {
      let firstClose = ss.indexOf(')');
      let lastOpen = ss.slice(0,firstClose).lastIndexOf('(');
      let block = ss.slice(lastOpen, firstClose + 1);
      let result;
      if (firstClose == -1 && lastOpen == -1) {
          result = '' + simpleCalc(ss);
      } else {
        result = calcComplex(ss.replace(block, getInnerBracketsResult(block)));
      }
      return result;
  }
}

module.exports = {
  expressionCalculator
}