<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if (!navigator.onLine) {
        const statusElem = document.querySelector('.page-status');
        statusElem.innerHTML = 'offline';
    }
=======
document.addEventListener('DOMContentLoaded', init, false);

function init() {
    if (!navigator.onLine) {
        const statusElem = document.querySelector('.page-status');
        statusElem.innerHTML = 'offline';
        
    }
>>>>>>> 8f22e132f8136e18a8d6b39d585704b722e304cb
}