(function addLifetimeBoxes() {
    let pre = getFirstPre();
    if (!pre) {
        return console.error('failed to find pre element');
    }
    pre.style.position = 'relative';
    pre.appendChild(
        createBLifetimeBox()
    );
    pre.appendChild(
        createBLabel()
    );
    pre.appendChild(
        createALifetimeBox()
    );
    pre.appendChild(
        createALabel()
    );
})();

/**
 * @returns {HTMLDivElement}
 */
function createBLifetimeBox() {
    let div = document.createElement('div');
    div.style.borderRight 
        = div.style.borderTop
        = div.style.borderBottom 
        = '2px solid blue';
    div.style.position = 'absolute';
    div.style.top = '25px';
    div.style.left = '40px';
    div.style.height = '54px';
    div.style.width = '300px';
    return div;
}

/**
 * @returns {HTMLDivElement}
 */
function createALifetimeBox() {
    let div = document.createElement('div');
    div.style.borderRight 
        = div.style.borderTop
        = div.style.borderBottom 
        = '2px solid red';
    div.style.borderBottomColor = 'rgba(255,0,0,0.5)'
    div.style.position = 'absolute';
    div.style.top = '44px';
    div.style.left = '40px';
    div.style.height = '35px';
    div.style.width = '262px';
    return div;

}

/**
 * @returns {HTMLSpanElement}
 */
function createALabel() {
    let span = document.createElement('span');
    span.appendChild(
        document.createTextNode("'a")
    );
    span.style.color = 'red';
    span.style.position = 'absolute';
    span.style.top = '35px';
    span.style.left = '300px';
    return span;
}

/**
 * @returns {HTMLSpanElement}
 */
function createBLabel() {
    let span = document.createElement('span');
    span.appendChild(
        document.createTextNode("'b")
    );
    span.style.color = 'blue';
    span.style.position = 'absolute';
    span.style.top = '15px';
    span.style.left = '340px';
    return span;
}
/**
 * @returns {HTMLPreElement}
 */
function getFirstPre() {
    let title = document.getElementById('data-lives-a-finite-life');
    if (title.nodeName.toLowerCase() === 'a') {
        title = title.parentElement;
    }
    return title.nextElementSibling;
}