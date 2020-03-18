function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // write your solution here
  let s = expr.trim();
  if (!checkIfContainsBracket(s)) {
    return simpleCalc(s);
  } else {
    checkBracketsPaired(s);
    return simpleCalc(getInnerBracketsResult(s));
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

    function calcSubstr(sumPart) {
      let splited = sumPart.split('-');
      let substr = calcMultiply(splited[0]);
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

    let innerBrackets = brackets.substr(firstBr, endBr);
    let result;
    if (checkIfContainsBracket(innerBrackets)) {
      getInnerBracketsResult(innerBrackets);
    } else {
      result = simpleCalc(innerBrackets);
    }
    return brackets.replace(innerBrackets, result);
  }
}

module.exports = {
  expressionCalculator
}