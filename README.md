# editable
contenteditable wrapper
```js
//pug
 script(src="https://gnjo.github.io/editable/editable.js")
```
usage
```js
//editable(classQuery,caller,debounceTime)
//or
//editable(classQuery,bool) //data-length mapping

editable('.ed',(e)=>{
 console.log(e.target.textContent)
},300)

//multiple .ed and .ed2
editable('.ed,.ed2',(e)=>{
 console.log(e.target.textContent)
},300)

```
usefull css
```css
.ed{
 white-space:pre-wrap;
 word-break:break-all;
} 
```
