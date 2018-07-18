<?php 
  // ------------------ index.php ---------------------
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <!-- Include the JS files -->
    <script src = "jquery.min.js"></script>
    <script src = "JSFunCompletor.js" /></script>
  </head>
  <body>
    Test page for JSFunCompletor.<br>
    Name: <input type = "text" id = "inpName" value = "toto"><br>
    <input id = "btnEval" type = "button" value = "Evaluate">
    <div>
      <div style = "display: inline-block;">
        Template:<br>
        <textarea id = "txtTemplate" style = "height:200px;">
Dear ((NAME)),
Your name is ((NAME))
Write your name ((THREE)) times:
((THREE_NAME))
((IF_TOTO))
Welcome back ((NAME)).
((IF_TOTO))
((IF_TOTO))It's always a pleasure.((IF_TOTO))
        </textarea>
      </div>
      <div style = "display: inline-block;">
        Result:<br>
        <textarea id = "txtRes" style = "height:200px;"></textarea>
      </div>
    </div>
  </body>
  <script>
    function GetName() {
      return $("#inpName").val(); 
    }
    $(document).ready(function() {
      try {
        // Create the JSFunCompletor
        var funCompletor = new JSFunCompletor();
        // Add rules
        funCompletor.AddRule("((NAME))", GetName);
        funCompletor.AddRule("((THREE))", function() {
          return "3";
        });
        funCompletor.AddRule("((THREE_NAME))", function() {
          var res = "";
          nb = parseInt(funCompletor.Eval("((THREE))"));
          for (i = 0; i < nb; i += 1)
            res += funCompletor.Eval("((NAME))") + " ";
          return res;
        });
        funCompletor.AddRule("((IF_TOTO))", function() {
          if ($("#inpName").val() == "toto")
            return true;
          else
            return false;
        });
        // Set the handler for the Evaluate button
        $("#btnEval").on("click", function() {
          // Update the result with the evaluation of the template
          $("#txtRes").val(funCompletor.Eval($("#txtTemplate").val()));
        });
      } catch (err) {
        console.log("document.ready " + err.stack);
      }
    });
  </script> 
</html>
