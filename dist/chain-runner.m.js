function t(t){return t.props}export default function(t,n){void 0===n&&(n=[]);var r=new WeakMap;return function t(e,o){if("function"==typeof e)return e.bind({props:o});if("object"==typeof(u=e)&&null!==u){var f=r.get(e);return f||(f=new Proxy(e,{get:function(r,e,f){for(var u=0,c=[e].concat(n);u<c.length;u+=1){var i=c[u],a=Reflect.get(r,i,f);if(void 0!==a)return t(a,o.concat([i]))}}}),r.set(e,f)),f}var u;return e}(t,[])}export{t as getChainProps};