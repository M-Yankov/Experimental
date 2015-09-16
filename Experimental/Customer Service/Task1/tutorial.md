## How to count button clicked counts ##
To make a sample button that counts a how many times it's clicked follow this steps:

 * insert in your document a element <button>, <a> or <input/> that acts like a button; 
 * give on this element a good named id;
 * make an simple javascript variable to hold value of clicked times (by default 0);
 * using jQuery:
    * add event on the element by selecting it by id attribute, when clicked to increase the variable;
    ```
    $('css-selector-element').on('click', function() {
    // do logic here
    })
    ```
    **Note!** if JS variable is not assigned with default value from type number you can receive error;
    * (optional) change the html of some element with the value of the variable;
    * [DEMO](http://dojo.telerik.com/iduWU);
 * using native JavaScript:
    * if you are not familiar with jQuery;
    * the different here is syntax - just more code;
    * [DEMO](http://dojo.telerik.com/urabu);
 * in the two demos are used Bootstrap style - just for better look and a span element to show counts;

More articles for event handlers: [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener), [jQuery](https://api.jquery.com/on/)