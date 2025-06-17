if (typeof global === 'undefined') {
    console.log('Global object is now set to window');
    window.global = window;
}
else {
    console.log('Global object already exists');
}