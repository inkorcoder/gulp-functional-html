# Modular

This module allows you to use some great stuff from JS-frameworks templating in your HTML. The synthax is looks like an Angular templates synthax.

## Progress

##### Basic

- [x] while
- [x] if
- [x] for in
- [x] Lorem generator
- [x] hash generator
- [x] self-closing tags

##### Components

- [x] component

##### Binding

- [ ] basic
- [ ] global
- [ ] class
- [ ] attribute
- [ ] id
- [ ] style

## Basic

### while
Attribute | Arguments | Example
--------- | --------- | -------
`while` | `from`, `to` | ```<li while="i = 0; < 10">...</li>``` <br> ```<li while="i = 0; < 10">List item №{{i + 1}}</li>```

`li` will be printed 10 times. <br> You can use double curly braces here for displaying available variables and doing some stuff with it. <br> Available variables: <br> `i` - index variable, which was created after parsing. You can rename it to any other name. For example: `i` => `indx`. Now, index variable will be `indx`<br> `start` - start point &lt;Number&gt;<br> `end` - end point &lt;Number&gt;<br> `state` - operator. Can be `>`, `<`, `>=`, `<=`

### if
Attribute | Arguments | Example
--------- | --------- | -------
`if` | `expression` | ```<li if="i === 0">...</li>```

`li` will be printed only if the result of expression will be `true`. Otherwise, this block will be removed completely. <br> You can use any default Javascript code here, `Math.random() > 0.5` for example. In this case this block will be printed only if `Math.random()` will be greater than 0.5

### for in, for of
Attribute | Arguments | Example
--------- | --------- | -------
`for` | `expression [of,in]` | ```<li for="let user in ['Mike', 'John', 'Susey', 'Vasya']">...</li>```

`for` loop goes through array and displays elements. You can use `in` or `of` keyword. They both doing the same. `let` is important keyword!

### Lorem generator
Function | Arguments | Example
-------- | --------- | -------
`$lorem()` | `length`&lt;number&gt;, `type`&lt;string&gt; | ```<li>{{$lorem(100)}}</li>```

`$lorem()` funciton is accessible in `while` and `for` loops. In the feature it will be accessible in any place in document. It takes one argument by default, which is lengh of string (count by words). Also it can takes second argument, which is the type of string. <br> Availbale types:
- `default` - Lorem ipsum dolor sit amet, consectetur adipisicing elit...
- `mountains` - Далеко-далеко за словесными горами в стране...
- `verter` - Душа моя озарена неземной радостью, как...
- `kafka` - Проснувшись однажды утром после беспокойного сна...

Maximum length of string is `500` words.


### Hash generator
Keyword | Arguments | Example
------- | --------- | -------
`hash` | - | ```<li>{{$lorem(100)}}, <br>hash: {{hash}}</li>```

`hash` keyword is accessible in `while` and `for` loops. For each iteration hash will be generated automaticaly and will be the same in any place of template. <br>
Hash string length is equals to 5.


## Components

Keyword | Arguments | Example
------- | --------- | -------
`component` | `name`&lt;string&gt;, `path`&lt;string&gt; | ```<component name="user" path="components/user">```, ```<user></user>```

You can use components to build your page. First of all you need to create a separate file and declare your component by special tag in <head>:
```
<-- components/user.html -->
<div class="user">{{user}}</div>

<-- index.html -->
<meta charset="UTF-8">
<title>Document</title>

<component name="user" path="components/user">
...
```

This declarations will be removed after transpilation, so don't worry about broken syntax. <br><br>
After that you can put your component in any part of document:
```
<-- components/user.html -->
<div class="user">{{user}}</div>

<-- index.html -->
<li for="let user of ['Mike', 'John', 'Other']">
	<user></user>
</li>
```
This code will be transformed to this:
```
<li>
	<div class="user">Mike</div>
</li>
<li>
	<div class="user">John</div>
</li>
<li>
	<div class="user">Other</div>
</li>
```
Also, you can write large arrays:
```
<-- components/user.html -->
<div class="user">
	<h3>{{user.name}}</h3>
	age: {{user.age}}<br>
	last visit: {{user.time}}
</div>

<-- index.html -->
<li for="let user of [
	{name: 'Mike', age: 12, time: '11.08.2017'},
	{name: 'John', age: 18, time: '11.08.2017'},
	{name: 'Other', age: 44, time: '11.08.2017'}
]">
	<user></user>
</li>
```
This code will be transformed to this:
```
<li>
	<div class="user">
		<h3>Mike</h3>
		age: 12<br>
		last visit: 11.08.2017
	</div>
</li>
<li>
	<div class="user">
		<h3>John</h3>
		age: 18<br>
		last visit: 11.08.2017
	</div>
</li>
<li>
	<div class="user">
		<h3>Other</h3>
		age: 44<br>
		last visit: 11.08.2017
	</div>
</li>
```
The data automatically binds to variable wich you create earlier in `for="let $var of something"`. If array contains only simple types of data (number, string, boolean) then `$var` binds to that. If array contains an objects then `$var` will be binded to each object, and you need to use properties from this object: `$var.name`, `$var.age`, `$var.time`