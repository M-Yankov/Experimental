## How to make buttons to change background color ##

#### Prepare Your code 
In your HTML document must have a buttons with good named id-s.
On each button you can attach a custom attribute like `<button data-color="hexValue">Click<button>`.
By default custom attributes can have whatever name you want including latin letters and dashes and it will be valid
Most **important** in this case is to set correct values of this attributes;

#### Implementation 
In the demo that you will see on attributes are set hex values of colors;
Again using jQuery to simplify the code attached event of type `click` on all buttons by selecting the body;
Then get the custom attribute value and set it to body with css. 

That's it!

 * jQuery
    [Demo](http://dojo.telerik.com/EGObU)
    
 * native JavaScript
    [Demo](http://dojo.telerik.com/iqEwU)
    In this case event is attached to the body, then you must check for the type of clicked element raised by the event.
    If it's a `button` we switch background color

#### Consequences
If you inspect the code from examples above, you can see the CSS rule is inline - not good practice;
`<body style="background-color: #ff0000">...</body>`, so to resolve this problem add a separate classes for each color in style;

[Demo](http://dojo.telerik.com/uxOka)
##### Disadvantage
If you want to append other class to `body` must use `body.className += ' anotherClass'`- the space before *anotherClass* is very important;
Then clicking again button for swap color will erase appended classes;
*fixing* - use jQuery or just inline style as above;

If you have any question, you can use our [forums](#) to discus topics;
Good luck!