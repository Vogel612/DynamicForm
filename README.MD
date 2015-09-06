For now this is relatively empty, but this is supposed to become a
small vanilla JS-Library to use for simple expansion of form-fields based on
table-like structures with dynamic adding and removing of form fields.

Usage is simple:
Bind the relevant structure to a new DynamicForm through it's (hopefully) intuitive configuration and that's it.

something dead simple as:

    var df = DynamicForm(document.getElementById('df-parent-0'), {
      defaultClass : 'df-input'
    }, {
      inputs: [
        {type : 'text', nametemplate : 'text'}
        , {type : 'checkbox', nametemplate : 'checkbox'}
      ]
    });

becomes a beautiful form like:

![in this example ](https://cloud.githubusercontent.com/assets/7288995/9706250/7212d796-54e0-11e5-99a2-b6d15483009f.png)
