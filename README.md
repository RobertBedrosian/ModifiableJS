# ModifiableJS

This is my attempt at making a small library to allow users to make any div element in their DOM resizeable and draggable.

### Quick Look
https://jsfiddle.net/fyL3q7rs/

### End-User Requirements
The end-user should have a div with specified min-width and min-height.

### Example
```
var myDiv = document.getElementById("myDiv");
Draggable(myDiv);
Resizeable(myDiv);
```
### Documentation

Function Draggable(param) - Takes one Div Element as an argument and makes that div draggable.

Function Resizeable(param) - Takes one Div Element as an argument and makes that div Resizeable.
