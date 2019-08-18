#include "lolight-1.3.0.js"

// Taken from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#Polyfill
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(search, pos) {
        pos = !pos || pos < 0 ? 0 : +pos;
        return this.substring(pos, pos + search.length) === search;
    }
}

// Adapted after: https://stackoverflow.com/a/17195834
function progress_bar(window, max_value, message) {
    var progress_bar = window.add("progressbar", undefined, 1, max_value);
    progress_bar.preferredSize = [300, 20];

    if(message) window.add("statictext").text = message;
    
    return progress_bar;
}