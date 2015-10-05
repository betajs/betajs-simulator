/*!
betajs-simulator - v0.0.1 - 2015-10-05
Copyright (c) Oliver Friedmann,Victor Lingenthal
MIT Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("module", "global:BetaJS.Dynamics.Components");
Scoped.binding("dynamics", "global:BetaJS.Dynamics");
Scoped.binding("base", "global:BetaJS");
Scoped.binding("browser", "global:BetaJS.Browser");

Scoped.binding("jquery", "global:jQuery");

Scoped.define("module:", function () {
	return {
		guid: "5d9ab671-06b1-49d4-a0ea-9ff09f55a8b7",
		version: '1.1444060342081'
	};
});

BetaJS.Dynamics.Dynamic.Components = {};

window.iterateModel = function (scope) {
    //console.log("Model : " + scope._tagName);
    if (scope.get('model')) {
        //console.log(scope.get('model'));
        var data = "data" in scope.get("model") ? scope.get("model").data() : scope.get("model");
        //console.log(data);
    }
    if (data) {
        BetaJS.Objs.iter(data, function (modelValue, attrKey) {
            var attrValue = this.isArgumentAttr(attrKey) ? scope.get(attrKey) : modelValue;
            scope.set(attrKey, attrValue);
            //this.get("model").set(attrKey, attrValue);
            //this.properties().bind(attrKey, this.get("model"));
        }, scope);
    }
};
BetaJS.Dynamics.Dynamic.Components.Templates = BetaJS.Dynamics.Dynamic.Components.Templates || {};
BetaJS.Dynamics.Dynamic.Components.Templates['components'] = '<ba-titledlist         ba-title="Components"         ba-selected_item="{{=current_component}}"         ba-listcollection="{{components}}"></ba-titledlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['controls'] = ' <h4>Controls </h4>  <controls>      <ba-layout></ba-layout>      <ba-components></ba-components>  </controls>';

BetaJS.Dynamics.Dynamic.Components.Templates['layout'] = '<ba-titledlist         ba-title="System"         ba-listcollection="{{systems}}"         ba-selected_item="{{=current_system}}">  </ba-titledlist>   <ba-titledlist         ba-title="Device"         ba-listcollection="{{mobile}}"         ba-selected_item="{{=current_device}}">           </ba-titledlist> ';

BetaJS.Dynamics.Dynamic.Components.Templates['simulator'] = ' <ba-controls></ba-controls>  <ba-viewport></ba-viewport> ';

BetaJS.Dynamics.Dynamic.Components.Templates['viewport'] = '  <appframe         class="             {{current_system.title}}             {{current_device.title}}         ">      <ba-{{current_component.title}}></ba-{{current_component.title}}>  </appframe> ';

BetaJS.Dynamics.Dynamic.Components.Templates['helloworld'] = ' <helloworld         ba-click="click(model)">     {{model.title}} </helloworld>';

BetaJS.Dynamics.Dynamic.Components.Templates['index'] = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../vendors/jquery-2.1.4.js"></script>      <script src="../vendors/scoped.js"></script>     <script src="../vendors/beta.js"></script>     <script src="../vendors/beta-browser-noscoped.js"></script>     <script src="../vendors/betajs-ui.js"></script>     <script src="../vendors/betajs-dynamics-noscoped.js"></script>      <script src="../vendors/betajs-dynamics-components-noscoped.js"></script>     <link rel="stylesheet" href="../vendors/betajs-dynamics-components.css" />      <script src="components.js"></script>     <script src="../dist/betajs-simulator.js"></script>     <link rel="stylesheet" href="../dist/betajs-simulator.css" />      <script src="//localhost:1337/livereload.js"></script>      <title>Simulator</title>  </head> <body>      <ba-simulator></ba-simulator>  </body> </html>';


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Helloworld", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.helloworld,

    initial: {

        attrs: {
            model: {
                title :'Hello World'
            }
        },

        functions : {
            click : function () {
                var itemtitle = this.get('model').title;
                console.log("You Clicked item : " + itemtitle)
            }
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Components", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.components,

    initial: {

        attrs : {
            components : components
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Controls", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.controls,

    initial: {

        create : function () {
            console.log('Controls Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Layout", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.layout,
    
    initial : {

        collections : {
            systems : [
                {title: 'mobile'},
                {title: 'web'}
            ],
            mobile : [
                {title: 'iphone4'},
                {title: 'iphone5'}
            ],
            web:[
                {title: 'notebook'}
            ]
        }

    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Simulator", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.simulator,

    initial: {

        create : function () {
            console.log('Simulator Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Viewport", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.viewport,

    initial: {

        bind : {
            current_component: "<>+[tagname='ba-components']:current_component",
            current_system: "<>+[tagname='ba-layout']:current_system",
            current_device: "<>+[tagname='ba-layout']:current_device"
        }

    }

}).register();
}).call(Scoped);

$(document).ready(function () {
    BetaJS.Dynamics.Dynamic.activate({element: document.body});
});

//var router = new BetaJS.Router.Router();
//
//window.appstate = new BetaJS.Properties.Properties({
//    component_type: components[0]
//});
//
//router.bind("components", "/components/(component:.+)", function (args) {
//    window.appstate.set("component_type", args.component);
//});
//
//router.navigate(document.location.hash.substring(1));