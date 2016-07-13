/*!
betajs-simulator - v0.0.2 - 2016-07-12
Copyright (c) Oliver Friedmann,Victor Lingenthal
MIT Software License.
*/
(function () {

var Scoped = this.subScope();

Scoped.binding("module", "global:BetaJS.Simulator.Dynamics");
Scoped.binding("dynamics", "global:BetaJS.Dynamics");
Scoped.binding("base", "global:BetaJS");
Scoped.binding("browser", "global:BetaJS.Browser");

Scoped.binding("jquery", "global:jQuery");

Scoped.define("module:", function () {
	return {
		guid: "5d9ab671-06b1-49d4-a0ea-9ff09f55a8b7",
		version: '11.1468362931894'
	};
});

BetaJS.Simulator.Dynamics = {};

BetaJS.Simulator.Dynamics.Templates = BetaJS.Simulator.Dynamics.Templates || {};
BetaJS.Simulator.Dynamics.Templates.components = '<ba-titledlist         ba-collapsible="{{false}}"         ba-model="{{{value : \'Components\'}}}"         ba-selected_item="{{=current_component}}"         ba-listcollection="{{components}}"></ba-titledlist> ';

BetaJS.Simulator.Dynamics.Templates.controls = ' <h4>Controls </h4>  <controls>      <ba-layout></ba-layout>      <ba-components></ba-components>  </controls>';

BetaJS.Simulator.Dynamics.Templates.layout = '<ba-titledlist         ba-collapsible="{{false}}"         ba-model="{{{value : \'System\'}}}"         ba-listcollection="{{systems}}"         ba-selected_item="{{=current_system}}">  </ba-titledlist>   <ba-titledlist         ba-collapsible="{{false}}"         ba-model="{{{value : \'Device\'}}}"         ba-listcollection="{{mobile}}"         ba-selected_item="{{=current_device}}">           </ba-titledlist>';

BetaJS.Simulator.Dynamics.Templates.simulator = ' <ba-controls></ba-controls>  <ba-viewport></ba-viewport> ';

BetaJS.Simulator.Dynamics.Templates.viewport = '  <appframe         class="             {{current_system.value}}             {{current_device.value}}         ">      <ba-{{current_component.value}} ba-attrs="{{current_component.attrs}}"></ba-{{current_component.value}}>  </appframe> ';

BetaJS.Simulator.Dynamics.Templates.helloworld = ' <helloworld         ba-click="click(model)">     {{model.title}} </helloworld>';

BetaJS.Simulator.Dynamics.Templates.webtest = ' <webtest         ba-click="click(model)">     {{model.title}} </webtest>';

BetaJS.Simulator.Dynamics.Templates.index = '<!DOCTYPE html> <html> <head lang="en">     <meta charset="UTF-8">      <!--<script src="../vendors/jquery-1.9.closure-extern.js"></script>-->     <script src="../vendors/jquery-2.1.4.js"></script>      <script src="../vendors/scoped.js"></script>     <script src="../vendors/beta.js"></script>     <script src="components.js"></script>     <script src="../vendors/betajs-browser-noscoped.js"></script>     <script src="../vendors/betajs-ui.js"></script>     <script src="../vendors/betajs-dynamics-noscoped.js"></script>      <script src="../vendors/betajs-dynamics-components-noscoped.js"></script>     <link rel="stylesheet" href="../vendors/betajs-dynamics-components.css" />      <script src="../dist/betajs-simulator.js"></script>     <link rel="stylesheet" href="../dist/betajs-simulator.css" />      <script src="//localhost:1337/livereload.js"></script>      <title>Simulator</title>  </head> <body>      <ba-simulator></ba-simulator>  </body> </html>';


BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Components.Helloworld", {

    template: BetaJS.Simulator.Dynamics.Templates.helloworld,

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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Components.Webtest", {

    template: BetaJS.Simulator.Dynamics.Templates.webtest,

    initial: {

        attrs: {
            model: {
                title :'WebTest - Layout'
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


BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Dynamics.Components", {

    template: BetaJS.Simulator.Dynamics.Templates.components,

    attrs : {
        components : components
    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Dynamics.Controls", {

    template: BetaJS.Simulator.Dynamics.Templates.controls

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Dynamics.Layout", {

    template: BetaJS.Simulator.Dynamics.Templates.layout,
    
    collections : {
        systems : [
            {value: 'mobile'},
            {value: 'web'}
        ],
        mobile : [
            {value: 'iphone4'},
            {value: 'iphone5'}
        ],
        web:[
            {value: 'notebook'}
        ]
    }

}).register();



BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Dynamics.Simulator", {

    template: BetaJS.Simulator.Dynamics.Templates.simulator,

    initial: {

        create : function () {
            console.log('Simulator Loaded');
        }

    }

}).register();


BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Dynamics.Viewport", {

    template: BetaJS.Simulator.Dynamics.Templates.viewport,

    initial : {
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
