# Modular

This module allows you to use some great stuff from JS-frameworks templating in your HTML. The synthax is looks like an Angular templates synthax.

## Progress

##### Basic

- [+] while
- [+] if
- [+] for in
- [+] Lorem generator
- [ ] hash generator

##### Components

- [ ] component

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

`li` will be printed 10 times. <br> You can use double curly braces here for displaying available variables and doing some stuff with it. <br> Available variables: <br> `i` - index variable, which was created after parsing. You can rename it to any other name. For example: `i` => `indx`. Now, index variable will be `indx`<br> `start` - start point <Number><br> `end` - end point <Number><br> `state` - operator. Can be `>`, `<`, `>=`, `<=`

### if
Attribute | Arguments | Example
--------- | --------- | -------
`if` | `expression` | ```<li if="i === 0">...</li>```

`li` will be printed only if the result of expression will be `true`. Otherwise, this block will be removed completely. <br> You can use any default Javascript code here, `Math.random() > 0.5` for example. In this case this block will be printed only if `Math.random()` will be greater than 0.5

### for in, for of
Attribute | Arguments | Example
--------- | --------- | -------
`for` | `expression [of,in]` | ```<li for="user in ['Mike', 'John', 'Susey', 'Vasya']">...</li>```

`for` loop goes through array and displays elements. You can use `in` or `of` keyword. They both doing the same.

### Lorem generator
Function | Arguments | Example
-------- | --------- | -------
`$lorem()` | `length`<number>, `type`<string> | ```<li>{{$lorem(100)}}</li>```

`$lorem()` funciton is accessible in `while` and `for` loops. In the feature it will be accessible in any place in document. It takes one argument by default, which is lengh of string (count by words). Also it can takes second argument, which is the type of string. <br> Availbale types:
- `default` - Lorem ipsum dolor sit amet, consectetur adipisicing elit...
- `mountains` - Далеко-далеко за словесными горами в стране...
- `verter` - Душа моя озарена неземной радостью, как...
- `kafka` - Проснувшись однажды утром после беспокойного сна...

Maximum length of string is `500` words.