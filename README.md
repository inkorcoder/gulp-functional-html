# Modular

This module allows you to use some great stuff from JS-frameworks templating in your HTML. The synthax is looks like an Angular templates synthax.

## Basic

Attribute | Arguments | Example | Explaining
--------- | --------- | ------- | ----------
`while` | `from`, `to` | ```<li while="i = 0; < 10">...</li>``` ```<li while="i = 0; < 10">List item №{{i + 1}}</li>``` | `li` will be printed 10 times. <br> You can use double curly braces here for displaying available variables and doing some stuff with it. <br> Available variables: 
<br> `i` - index variable, which was created after parsing. You can rename it to any other name. For example: `i` => `indx`. Now, index variable will be `indx`
<br> `start` - start point <Number>
<br> `end` - start point <Number>
<br> `state` - operator. Can be `>`, `<`, `>=`, `<=`