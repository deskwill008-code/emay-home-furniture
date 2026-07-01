function o(e){return new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}function r(e,t,n){const a=encodeURIComponent(`Hello,

I'm interested in your ${e} (Model: ${t}).

Please send me your quotation and catalog.

Thank you.`);return`https://wa.me/${n.replace(/\D/g,"")}?text=${a}`}export{r as b,o as f};
