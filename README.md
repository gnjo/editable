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

editableEx
```js
editableEx =true; //default false
editable(...)
//add dataset
//text lines head headline timestamp crcold crcnew 

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

editable and number
```
let opt={}
opt.numStart=0
opt.numFlg=0//1 is true
opt.numWidth='2.5rem' //
opt.numColor='#456'
opt.numDraw=()=>{return/**/}
opt.ex=0 //1 is true
opt.dt=70 //debounce time

editable('',(ev)=>{},opt)
```






