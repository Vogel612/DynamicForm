// FIXME jsdoc
function DynamicForm(parent, formOptions) {
  // require input data from formOptions
  if (formOptions === undefined || formOptions.inputs === undefined) {
    console.warn("Cannot create a DynamicForm without formOptions");
    return false;
  }
  if (parent === undefined) {
    console.warn("Cannot create a DynamicForm without a structure to bind to");
    return false;
  }

  // FIXME: add a way to use nested divs
  var tbody = parent.childElements('tbody')[0];
  var inputOpts = formOptions.inputs;

  // FIXME base64 encoded image, please
  var add_icon = 'resource/add.png';
  var remove_icon = 'resource/remove.png';

  var self = {
      add: function() {
        var newRow = tbody.insertRow(-1);
        addInputs(newRow);
        organizeForm();
      },
      remove: function(node) {
        if (tbody.children.length == 1) {
          return false;
        }
        tbody.removeChild(node);
        organizeForm();
        return true;
      }
    };

  // run that for each field actually..
  var addInputs = function(tableRow) {
    // iterate over configurated inputs
    for (var config in inputOpts) {
      var cell = tableRow.insertCell(-1);
      // FIXME: correct the behaviour..
      var input = document.createElement("INPUT");
      input.type = config.type;
      input.className = config.classname;
      input.name = config.nametemplate;

      cell.appendChild(input);
    }
  };

  var organizeForm = function() {
    var rows = tbody.children;
    for (var r = 0; r < rows.length; r++) {

      var remove = new Image();
      remove.src = remove_icon;
      remove.onclick = function() {
        self.remove(this.parentElement.parentElement); // remove row on click!
      }

      // last row!
      if (r == rows.length - 1) {
        var add = new Image();
        add.src = plusicon;
        add.onclick = function() {
          self.add();
        }
        cell.appendChild(add);
      }
      // FIXME correct this behaviour
      var txt = rows[r].children[1].children[0];
      txt.name = inputOpts.nametemplate.replace(/%INDEX%/, r);
    }
  };
  organizeForm();
  return self;
}
