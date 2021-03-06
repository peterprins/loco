/*!
  * loco - v1.1
  * https://github.com/peterprins/loco
  *
  * Copyright 2015 Peter Prins
  * Released under the MIT license
  * http://mit-license.org/
  *
  * Date: 2015-04-24
  */

////////////////////
// $_GET
var $_GET = function( var_str ){
    var vars_obj = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m,key,val){
        try{
            vars_obj[ key ] = decodeURIComponent(val.split("+").join(" "));
        }catch(e){
            vars_obj[ key ] = val;
        }
    });  
    return vars_obj[ var_str ];
}

////////////////////
// $_MOBILE
var $_MOBILE = (function(){
    var uAgent = navigator.userAgent;
    if(uAgent.match(/iPhone/i)){
        return 'iphone';
    }else if(uAgent.match(/iPod/i)){
        return 'ipod';
    }else if(uAgent.match(/iPad/i)){
        return 'ipad';
    }else if(uAgent.match(/Android/i)){
        return 'android';
    }else{
        return false;
    }
})();

////////////////////
// ready
var $ready = function(callback_fn){
    document.addEventListener( 'DOMContentLoaded', function(){

        // debug ready
        //console.log( 'get ready!' );
        //console.log( 'callback: ' , callback_fn );

        callback_fn();

    }, false);
}

////////////////////
// loco
var $loco = function($selectors) {

    //console.log( 'get loco!' );

    // methods
    var methods = {

        // onEvent
        onEvent: function(js_in,callback_fn) {
            // js_in: classes_str
            var data_str = { "event_str" : js_in,
                             "callback_fn" : callback_fn }
            this.js_out = this.upEl($selectors, data_str, 'onEvent') ? true : false;
            return this;
        },

        // show
        show: function() {
            // js_in: classes_str
            this.removeStyle('display:none;');
            return this;
        },

        // hide
        hide: function() {
            // js_in: classes_str
            this.addStyle('display:none;');
            return this;
        },

        // remove
        remove: function(js_in) {
            // js_in: classes_str
            this.js_out = this.upEl($selectors, js_in, 'remove') ? true : false;
            return this;
        },

        // setAttr
        setAttr: function(js_in) {
            // js_in: classes_str
            this.js_out = this.upEl($selectors, js_in, 'sAttr') ? true : false;
            return this;
        },

        // removeAttr
        removeAttr: function(js_in) {
            // js_in: classes_str
            this.js_out = this.upEl($selectors, js_in, 'rAttr') ? true : false;
            return this;
        },

        // lowerCase
        lowerCase: function(js_in) {
            // js_in: classes_str
            this.js_out = this.upEl($selectors, js_in, 'lCase') ? true : false;
            return this;
        },

        // upperCase
        upperCase: function(js_in) {
            // js_in: classes_str
            this.js_out =
                this.upEl($selectors, js_in, 'uCase') ? true : false;
            return this;
        },

        // camelCase
        camelCase: function(js_in) {
            // js_in: classes_str
            this.js_out =
                this.upEl($selectors, js_in, 'cCase') ? true : false;
            return this;
        },

        // trimHTML
        trimHTML: function(js_in) {
            // js_in: classes_str
            this.js_out =
                this.upEl($selectors, js_in, 'tHTML') ? true : false;
            return this;
        },

        // addClass
        addClass: function(js_in) {
            // js_in: classes_str
            this.js_out =
                this.upEl($selectors, js_in, 'aClass') ? true : false;
            return this;
        },

        // removeClass
        removeClass: function(js_in) {
            // js_in: classes_str
            this.js_out =
                this.upEl($selectors, js_in, 'rClass') ? true : false;
            return this;
        },

        // addHTML
        addHTML: function(js_in) {
            // js_in: html_str
            this.js_out =
                this.upEl($selectors, js_in, 'adHTML') ? true : false;
            return this;
        },

        // appendHTML
        appendHTML: function(js_in) {
            // js_in: html_str
            this.js_out =
                this.upEl($selectors, js_in, 'apHTML') ? true : false;
            return this;
        },

        // replaceHTML
        replaceHTML: function(js_in) {
            // js_in: html_str
            this.js_out =
                this.upEl($selectors, js_in, 'rHTML') ? true : false;
            return this;
        },

        // addStyle
        addStyle: function(js_in) {
            // js_in: css_str
            this.js_out =
                this.upEl($selectors, js_in, 'aStyle') ? true : false;
            return this;
        },

        // removeStyle
        removeStyle: function(js_in) {
            // js_in: css_str
            this.js_out =
                this.upEl($selectors, js_in, 'rStyle') ? true : false;
            return this;
        },
      
        // JSON2UL
        JSON2UL: function(js_in) {
            // js_in: css_str
            this.js_out =
                this.upEl($selectors, js_in, 'JSON2UL') ? true : false;
            return this;
        },

        // isInObject
        isInObject: function(c_obj, d_obj) {
            for ( var c_key in c_obj ) {
                for ( var d_key in d_obj ) {
                    if ( c_obj[ c_key ] == d_obj[ d_key ] ) {
                        if ( typeof results != 'object' ) {
                            var results = [];
                        }
                        results.push( c_key );
                    }
                }
            }
            if (typeof results !== 'object') return false;
            return results;
        },

        // upEl
        upEl: function(selectors, data_str, type_str) {
          
            // check typeof
            if (typeof selectors == 'string') {
                var elements = document.querySelectorAll(selectors);
            } else {
                var elements = [];
                elements.push(selectors);
            }

            // iterate the elements
            for (var element in elements) {

                var el = elements[element];

                // check typeof
                if(typeof el == 'object'){

                    // give it a try
                    try {

                        // check typeof
                        if (type_str == 'rClass' || type_str == 'aClass') {
                            var c_obj = el.className.split(' ');
                            var d_obj = data_str.split(' ');
                            var results = this.isInObject( c_obj, d_obj );
                        }

                        // debug type
                        console.log( 'updateEl: ' + type_str );

                        // switch type
                        switch (type_str) {
                            case 'onEvent':
                                var events_obj = data_str[ 'event_str' ].split(' ');
                                for( event_key in events_obj ){

                                    events_obj[ event_key ] = events_obj[ event_key ].trim();
                                    el.addEventListener( events_obj[ event_key ], data_str['callback_fn'] );
                    
                                    // debug event
                                    //console.log( events_obj[ event_key ] + ' event added to ', el );

                                }
                                break;
                            case 'remove':
                                el.parentNode.removeChild(el);
                                break;
                            case 'rClass':
                                if (typeof results == 'object') {
                                    for (result in results) {
                                        c_obj.splice(results[result], 1);
                                    }
                                    var classes = c_obj.toString().replace(/\,/g, ' ');
                                    var classes = classes.trim();
                                    el.className = classes;
                                }
                                break;
                            case 'aClass':
                                if (typeof results != 'object') {
                                  el.className = el.className ?
                                    el.className += ' ' + data_str : data_str;
                                }
                                break;
                            case 'JSON2UL':
                                // todo: could do more
                                var json_obj = JSON.parse(el.innerHTML);
                                var ul_list = '<ul>\n';
                                for( li in json_obj ){
                                    ul_list += '\t<li>' + json_obj[li] + '</li>\n';
                                }
                                ul_list += '</ul>\n';
                                el.innerHTML = ul_list;
                                break;
                            case 'uCase':
                                el.innerHTML =
                                    el.innerHTML.toUpperCase();
                                break;
                            case 'lCase':
                                el.innerHTML =
                                    el.innerHTML.toLowerCase();
                                break;
                            case 'cCase':
                                el.innerHTML = el.innerHTML.toLowerCase();
                                el.innerHTML = el.innerHTML.replace(/\b(\w)/ig,
                                    function($1) {
                                        return $1.toUpperCase()
                                    });
                            case 'tHTML':
                                el.innerHTML =
                                    el.innerHTML.trim();
                                break;
                            case 'rHTML':
                                var replace = data_str.split(":");
                                el.innerHTML =
                                    el.innerHTML.replace(replace[0], replace[1]);
                                break;
                            case 'apHTML':
                                el.innerHTML += (typeof data_str == 'object') ? JSON.stringify( data_str ) : data_str;
                                break;
                            case 'adHTML':
                                el.innerHTML = (typeof data_str == 'object') ? JSON.stringify( data_str ) : data_str;
                                break;
                            case 'rAttr':
                                var attribute = true;
                                var remove_attr = true;
                            case 'sAttr':
                                var attribute = true;
                                var remove_attribute = remove_attribute ? true : false;
                            case 'rStyle':
                                var remove_style = true;
                            case 'aStyle':
                                if (typeof results != 'object') {
                                    if (typeof data_str == 'object') {
                                        for (var prop in data_str) {

                                            if(attribute){
                                                var attr_val = remove_attr ? '' : data_str[prop];
                                                el.setAttribute(attr_prop,attr_val);
                                            }else{
                                                el.style[prop] = remove_style ? '' : data_str[prop];
                                            }

                                        }
                                    } else {

                                        var styles = data_str.split(";");

                                        for (var css_style in styles) {
                                            var css_element = styles[css_style].split(":");

                                            for (var css_prop in css_element) {
                                                var prop = css_element[0].trim();
                                                var val = css_element[1].trim();

                                                if(attribute){
                                                    var attr_val = remove_attr ? '' : val;
                                                    el.setAttribute(prop,attr_val);
                                                }else{
                                                    el.style[prop] = remove_style ? '' : val;
                                                }

                                            }
                                        }
                                    }
                                }
                                break;
                        }
                    } catch (e) {
                        // error
                    }
                }
            }

            // return
            return true;

        }

    }
    
    // return
    return methods;
    
}

////////////////////
// liteAjax
var $ajax = function(request_obj,callback_fn){

    // put response in arr
    var response = [];

    // ajax object
    var ajax_obj = {

        url : null,
        method : null,
        type : null,
        data : null,
        callback : null,
        response: function(){
                return response[0];
        },
        element_id : null,

        // init
        init: function(){

            //console.log('init');

            // get url
            if(typeof request_obj !== 'object' && typeof request_obj !== 'string'){

                // init props
                this.method = 'GET';
                this.type = 'application/json';

            }else{

                // get url
                if(typeof request_obj == 'object'){
                    this.url = request_obj['url'];
                }else if(typeof request_obj == 'string'){
                    this.url = request_obj;
                }
          
                // get method
                this.method = request_obj['method'] ? request_obj['method'] : 'GET';
          
                // get type
                if( this.method == 'POST' ){
                    this.type = request_obj['type'] ? request_obj['type'] : 'application/x-www-form-urlencoded;charset=UTF-8';
                    
                }else{
                    this.type = request_obj['type'] ? request_obj['type'] : 'application/json;charset=utf-8';
                }

                // get data
                this.data = request_obj['data'] ? JSON.stringify(request_obj['data']) : null;
         
            }

        },

        // update element
        updateID: function(id,data){

            //console.log('updateID');

            // check typeof
            if((typeof data == 'string' || typeof data == 'object')
                && typeof id == 'string'){

                // get element
                var element = document.getElementById(id);

                try{
                    element.innerHTML = JSON.stringify(data);
                }catch(e){
                    element.innerHTML = data;
                }

            }else{

                // check status
                if(this.status == 200){
                    var element = document.getElementById(element_id);

                    // update response
                    response[0] = this.response;
                    //console.log('response: ', response[0]);

                    // update html element
                    element.innerHTML = this.response;
                }

            }
            
        },

        // get json obj
        getJSONObj: function(){

            //console.log('getJSONObj');

            // check status
            if(this.status == 200){

                // update response
                response[0] = this.response;

                try{
                    var json_obj = JSON.parse(this.response);
                }catch(e){
                    var json_obj = this.response;
                }
            }

            // do callback fn
            callback_fn(json_obj);

        },

        // load ajax
        load: function(){

            //console.log( 'get ajax!' );

            //console.log('load');

            // init
            this.init();

            // create object
            json = new XMLHttpRequest();

            // set content type 
            json.type = this.type;

            // get callback
            if(typeof callback_fn == 'function'){

                this.callback = this.getJSONObj;

            }else if(typeof callback_fn == 'string'){

                this.element_id = callback_fn;
                element_id = callback_fn;

                this.callback = this.updateID;

            }else{

                this.callback = null;
            }

            // do we have a callback ?
            if(this.callback !== null){

                // modern browsers
                if( json.addEventListener ) {

                    // when file is loaded do callback
                    json.addEventListener( 'load', this.callback, false);

                }else if( json.readyState ){

                    // microsoft IE9 compatability
                    // if(json.readyState == 4) success
                    json.onreadystatechange = this.callback;
                }

            }

            // open file
            json.open( this.method , this.url );

            // if POST
            if( this.method == 'POST'){
                json.setRequestHeader( 'Content-type', this.type );
            }

            // send request
            json.send( this.data );

        }

    }

    // check typeof
    if(typeof request_obj == 'object' || typeof request_obj == 'string'){
        // load
        ajax_obj.load();
    }

    // return
    return ajax_obj;

}