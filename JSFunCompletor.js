/* ============= JSFunCompletor.js =========== */

// JSFunCompletor Class

function JSFunCompletor() {
  try {
    // Rules
    this._rules = {};
  } catch (err) {
    console.log("JSFunCompletor " + err.stack);
  }
}

// Evaluate the text in argument according to current rules

JSFunCompletor.prototype.Eval = function(txt) {
  try {
    var res = txt;
    // First process the IF_ keywords
    for (var keyword in this._rules) {
      // If this keyword is a condition
      if (keyword.indexOf("((IF_") == 0) {
        // Evaluate the condition
        var evalCond = this._rules[keyword]();
        // If the condition is not verified
        if (evalCond == false) {
          // Variable to memorize the start of the condition block
          var indexIf = -1;
          // Loop on instances of this condition
          do {
            // Increment the index to avoid infinite loop
            indexIf += 1;
            // Search the start position of the condition
            indexIf = res.indexOf(keyword, indexIf);
            // If we have found the condition
            if (indexIf != -1) {
              // Search the end position of the condition
              var indexEndIf = res.indexOf("((IF_", indexIf + 1);
              // If we have found the end of the condition
              if (indexEndIf != -1) {
                // Remove the block inside the condition
                res = res.substr(0, indexIf) +
                  res.substr(indexEndIf + keyword.length)
              }
            }
          } while (indexIf != -1);
        }
        // Remove the condition keywords
        res = res.split(keyword).join("");
      }
    }
    // Process the other keywords
    for (var keyword in this._rules) {
      if (keyword.indexOf("((IF_") != 0) {
        // Apply replacement only if the keyword is present to avoid 
        // infinite loop if some rules uses the Eval method
        if (res.indexOf(keyword) != -1) {
          var replacement = this._rules[keyword]();
          res = res.split(keyword).join(replacement);
        }
      }
    }
    return res;
  } catch (err) {
    console.log("JSFunCompletor.Evaluate " + err.stack);
  }
}

// Add a new rule, 'keyword' will be replaced by the result of 'fun'
// at time of evaluation
// If there was already a rule for 'keyword' it is replaced
JSFunCompletor.prototype.AddRule = function(keyword, fun) {
  try {
    this._rules[keyword] = fun;
  } catch (err) {
    console.log("JSFunCompletor.AddRule " + err.stack);
  }
}

// Remove the rule for 'keyword'
// If there was no rule for 'keyword', do nothing

JSFunCompletor.prototype.RemoveRule = function(keyword) {
  try {
    if (this._rules[keyword] != undefined) {
      this._rules[keyword] = undefined;
    }
  } catch (err) {
    console.log("JSFunCompletor.RemoveRule " + err.stack);
  }
}


