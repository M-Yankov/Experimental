var storage = (function () {
    "use strict";
    function loadPairs() {
        if (localStorage.length === 0) {
            document.getElementById('container').innerHTML = '<p class="storage-item"> LocalStorage is empty!</p>';
            return;
        }

        var div = document.getElementById('container'),
            p = document.createElement('p'),
            fragment = document.createDocumentFragment(),
            i,
            len,
            key,
            value;

        p.className += ' storage-item';
        for (i = 0, len = localStorage.length; i < len; i += 1) {
            key = localStorage.key(i);
            value = localStorage.getItem(key);
            p.innerHTML = '<strong class="storage-key">' + key + '</strong> : <em class="storage-value">"' + value + '"</em>';
            fragment.appendChild(p.cloneNode(true));
        }

        div.innerHTML = '';
        div.appendChild(fragment);
    }

    return {
        loadPairs : loadPairs
    };

}());