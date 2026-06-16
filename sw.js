const CACHE_NAME =
"flowform-v1";

const urlsToCache = [

"./",

"./index.html",

"./css/style.css",
"./css/themes.css",

"./js/app.js",
"./js/ui.js",
"./js/share.js",
"./js/export.js",
"./js/renderer.js",
"./js/flowfield.js",
"./js/presets.js",

"./manifest.json",

"./assets/logo.svg",
"./assets/favicon.svg"

];

self.addEventListener(
"install",
event => {

event.waitUntil(

caches.open(
CACHE_NAME
).then(cache => {

return cache.addAll(
urlsToCache
);

})

);

});

self.addEventListener(
"fetch",
event => {

event.respondWith(

caches.match(
event.request
).then(response => {

return (
response ||
fetch(event.request)
);

})

);

});
