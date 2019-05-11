# editable
demo https://codepen.io/gnjo/pen/MdyddX

contenteditable wrapper
```js
//pug
 script(src="https://gnjo.github.io/editable/editable.js")
```
usage
```js
//editable(classQuery,caller,debounceTime)
//or
//editable(classQuery,bool) //data-length mapping for meta programming

editable('.ed',(e)=>{
 console.log(e.target.textContent)
},300)
```
```js
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
inner process
```
1. fire the element click
2. check class for target
3. if target, added the contenteditable="plaintext-only" and handle keyup and blur
 - if keyup, to caller
4. if blur, delete event and attribute "contenteditable"
```
careful
```
"plaintext-only" option chrome only, as of 2019
```
# codeable
CodeMirror wrapping

```js
//completed detail
codeableOption=opt;
codeable(uniqQuery,caller) or codeable(uniqQuery,true) 

e.target.dataset.codeableMode
e.target.dataset.codeableText
//data-codeable-mode
//data-codeable-text

//query target living only, need the document.body children
codeableOption=opt;
let ca=codeable('.ed',(e,cm)=>{//e.target.dataset.text//e.target})

codeable('.ed',true); //meta programming observe the target.dataset.text

ca.el
ca.cm
ca.text
ca.remove(false)//if false, ca.cm. true is all. ca.cm, ca.el 
let text=ca.remove() //if remove, return text
```


