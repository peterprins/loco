# Loco
**fast, small, asynchronous**

[###Loco Documentation Wiki###](https://github.com/peterprins/loco/wiki)

### Description

Loco is a fast, small, asynchronous Javascript Library. Loco works with all modern browsers and has a familiar syntax. You can do a lot with Loco.

Loco currently features 17 methods, a $ready function, a $_MOBILE global, a $_GET('my-var') variables function and includes [liteAjax](https://github.com/peterprins/liteAjax) to handle Ajax calls. This release of Loco is **ONLY 5KB** minified with [liteAjax](https://github.com/peterprins/liteAjax) included now that's Loco! 

### The Loco Syntax

You can chain 17 Loco methods together anyway you want to. 

```JavaScript
$loco('#my-element')
.JSON2UL()
.updateHTML('my html content')
.appendHTML(' is loco!')
.replaceHTML('html: loco')
.trimHTML()
.addClass('myclass myotherclass')
.removeClass('myclass')
.addStyle('background-color: red; text-align: center;')
.removeStyle('text-align: center;')
.upperCase()
.lowerCase()
.camelCase();
.show()
.hide()
.remove()
.setAttr('my-custom: my-data')
.removeAttr('my-custom: my-data')
```

And you can attach any event(s) to any element(s) with the onEvent() method.

```JavaScript
$loco('#my-element').onEvent('click mouseover',mycallback);
```

### A Loco Example

```JavaScript
// if ready
if($ready(function(){

	// set font
	$loco('#my-loco').addStyle('font-family: sans-serif;');

	// get loco on click and mouseover
	$loco('#link').onEvent( 'click mouseover', function(e){
		e.preventDefault();

		// load some ajax
		$ajax('test.json', function( JSONdata ){

			// load a little json
			$loco("#test1").addHTML( JSONdata );

			// get loco!
			$loco("#test2").addHTML( JSONdata )
			.addStyle('background-color: #000000; color: #ffffff; text-align: center;')
			.addClass( 'test tester testing' )
			.camelCase()
			.JSON2UL()
			.replaceHTML( 'Are You Doing: You Feeling' )
			.removeClass('tester')
			.appendHTML('<h1>Are You Feeling Loco?</h1>')
			.replaceHTML("This Is: I'm Conducting");

			// and change the font
			$loco('#my-loco').addStyle('font-family: courier;');

		});

	});

}));
```
