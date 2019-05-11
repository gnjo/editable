# editable
contenteditable wrapper
```js
//pug
 script(src="https://gnjo.github.io/editable/editable.js")
```
```js
//usage
//editable(classQuery,caller,debounceTime)

editable('.ed',(e)=>{
 console.log(e.target.textContent)
},300)
```
