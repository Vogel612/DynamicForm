// FIXME jsdoc
function DynamicForm(parent, coreConfig, formOptions) {
  // require input data from formOptions
  if (formOptions === undefined || formOptions.inputs === undefined) {
    console.warn("Cannot create a DynamicForm without formOptions");
    return false;
  }
  if (parent === undefined) {
    console.warn("Cannot create a DynamicForm without a structure to bind to");
    return false;
  }

  var add_icon;
  if (coreConfig.add_icon === undefined) {
    add_icon =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACyUlEQVR42q2UTWgTQRTH/7NJiujBY0HqByJqFRVEoaAIEUEoiLXEUrGFKh5qFamg4sGb54IgiiD05EFFi7TgSa2aRk0/Y2mKlopapcQ2281Ho202s+Pb2WySBdsI3cDwJm/f/H/vY3YZyvwOdm4RletXwVvhc/hzWR2/fiyg7+wkW+78sg9tQHt9LTavrXL4v6dj6HjSvXLA3nsbxPXGOkTnHjj8yYyCt6HVGG6dcgHQcAITqccOv5YCet/53AFcC9Rjcv6R/C9oGQYQTwKhsEuAKwT4QgBTmNMyhIJ4Augf8rgEqD+OT6kuErYqMCFxDRiOuAS4dKwOn+efkjiTELOSGZVjLPofLTKvYTnIuaO1GE935dtDVZCdS3CawWK5o2D+zp3ixhk/phPfIJhCIswapBRSILiCcTVEuXulsAFFWp0CFrnA7soa8hmFyuRZDnh9Hjx8HgY7dL9anD+1FZHpEB31WEGCQacgMnLPaKgGPStUAEvMEAKclkEgI+8TJoj2CiU0+CENduButWhr2kGAPsrS5wjiMiMlL1YUtmchgbBaBlHcm/ZPVsHYQBKs5vZ20da8CyM/g1CYtyhsKFZWpcJUDbezt9uRn2DOsG6MlZwC+lTh43sC7L9lAYYJwJSKQgalwlywYltKhO1YlAgb0sGR43SFgwTY17FNHPFvRHQ6uuRN2FPpx5QRdAjHYjn5bE3Fv89kssDEaAas+uYmkU5llxTXfs/hcksAX3nQkfEMAcIv1fLXtFxA1dV1oqXhMCZ1uwJFUtTZrARk7iys7E02Ae0tJxFOdBf6a/ZbVQ0Mvoi7A7jQHMBg8ll+kB5ZiTarY+iVS4C20wH0p3qksD0ElQAjr10CtDYFMKD1wNY3h63FdUTeuAWgCsKJHsct0mZ0jAZdAlxsbkSIZiAryL+5CQJEemfdAZg2nU0WWiRtjktbDvAXpTXf5N+BV58AAAAASUVORK5CYII=';
  } else {
    add_icon = coreConfig.add_icon;
  }
  var remove_icon;
  if (coreConfig.remove_icon === undefined) {
    remove_icon =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABqElEQVR42u1TO0sDQRD+NsFGBEubxNI/YC/YWPiKqNHK3ka0s/EXWWjjT9BCfDQiEhUshCghL9AYvdvdcfZmL3cGBUFSCHewzM3OzPfNaxUG/KmMICP4BwQ0NUMojgHG/iIH6rPRVz+bus/lgGqNCcrrhN0NoF5jn1zib32wDdmfg8nInfaSSKS1AvjhJB+ywptneXDGBPMlwtYSULkSVpdJFOz8AwF3ID1Ah6e5YkdmE1Jnd10w/K85qTxjXTxDBXOLNLS9DNxe82WeA5QAdN+ATkcqC5mo1eJgtjXrDAAhDY3IuJLQV2cQVfJ+14bqzC7Q8E6ZCW6AWpUB+TQaTNAV59D1yUjm2rcmAtI+GTYEMbAjIamO9dYDE7RLKzS6Ogkc7XMftfQvAiEB1pS0w3wDbDxw7BdaT8AzfnqBeiwUqbA5DZyeywyCUIar47LJA8dD9vpPwLHO6n3zFaoyMkITe2vA8YkbfdLPwA8yBo4AbAIcenCdaov2i+B0rXHZ1VCHvEjjvJ7GrWFqs9MbbvtkbKfevfK68oei19OOLIN+yRlBRvDn7xOEbDnnrmtLswAAAABJRU5ErkJggg==';
  } else {
    remove_icon = coreConfig.remove_icon;
  }
  // FIXME: add a way to use nested divs
  var tbody = parent.getElementsByTagName('tbody')[0];
  var inputOpts = formOptions.inputs;

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
    for (var config of inputOpts) {
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
      while (rows[r].childElementCount > inputOpts.length) {
        rows[r].deleteCell(inputOpts.length);
      }
      var cell = rows[r].insertCell(-1);
      var remove = new Image();
      remove.src = remove_icon;
      remove.onclick = function() {
        self.remove(this.parentElement.parentElement); // remove row on click!
      }
      cell.appendChild(remove);
      // last row!
      if (r == rows.length - 1) {
        var add = new Image();
        add.src = add_icon;
        add.onclick = function() {
          self.add();
        }
        cell.appendChild(add);
      }
      // FIXME correct this behaviour
      // var txt = rows[r].children[1].children[0];
      // txt.name = inputOpts.nametemplate.replace(/%INDEX%/, r);
    }
  };
  organizeForm();
  return self;
}
