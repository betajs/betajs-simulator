/*!
betajs-simulator - v0.0.5 - 2017-05-08
Copyright (c) Victor Lingenthal
Apache-2.0 Software License.
*/

(function () {
var Scoped = this.subScope();
Scoped.binding('module', 'global:BetaJS.Dynamics.Simulator');
Scoped.binding('base', 'global:BetaJS');
Scoped.binding('browser', 'global:BetaJS.Browser');
Scoped.binding('dynamics', 'global:BetaJS.Dynamics');
Scoped.define("module:", function () {
	return {
    "guid": "a150338a-6525-40e5-b811-aa2de1afce26",
    "version": "0.0.5"
};
});
Scoped.assumeVersion('base:version', '~1.0.96');
Scoped.assumeVersion('browser:version', '~1.0.65');
Scoped.assumeVersion('dynamics:version', '~0.0.83');
Scoped.define("module:Components", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<layout-list ba-repeat=\"{{component :: components}}\">\n    <div ba-click=\"current_component = component\" ba-class=\"{{{selected: current_component === component}}}\">\n        {{component.value}}\n    </div>\n</layout-list>\n",

        collections: {
            "components": []
        },

        create: function() {
            this.set("current_component", this.get("components").first());
        }

    }).register();

});
Scoped.define("module:Controls", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<h4>Controls </h4>\n\n<controls>\n\n    <ba-layout></ba-layout>\n\n    <ba-components ba-components=\"{{components}}\"></ba-components>\n\n</controls>"

    }).register();

});
Scoped.define("module:Layout", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<layout-list ba-repeat=\"{{system :: systems}}\">\n    <div ba-click=\"current_system = system\" ba-class=\"{{{selected: current_system === system}}}\">\n        {{system.value}}\n    </div>\n</layout-list>\n\n<layout-list ba-repeat=\"{{device :: mobile}}\">\n    <div ba-click=\"current_device = device\" ba-class=\"{{{selected: current_device === device}}}\">\n        {{device.value}}\n    </div>\n</layout-list>\n",

        collections: {
            systems: [{
                    value: 'mobile'
                },
                {
                    value: 'web'
                }
            ],
            mobile: [{
                    value: 'iphone4'
                },
                {
                    value: 'iphone5'
                }
            ],
            web: [{
                value: 'notebook'
            }]
        },

        create: function() {
            this.set("current_system", this.get("systems").first());
            this.set("current_device", this.get("mobile").first());
        }

    }).register();

});
Scoped.define("module:Simulator", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n<ba-controls ba-components=\"{{components}}\"></ba-controls>\n\n<ba-viewport></ba-viewport>\n"

    }).register();

});
Scoped.define("module:Viewport", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "\n\n<appframe\n        class=\"\n            {{current_system.value}}\n            {{current_device.value}}\n        \">\n\n    <ba-{{current_component.value}} ba-attrs=\"{{current_component.attrs}}\"></ba-{{current_component.value}}>\n\n</appframe>\n",

        initial: {
            bind: {
                current_component: "<>+[tagname='ba-components']:current_component",
                current_system: "<>+[tagname='ba-layout']:current_system",
                current_device: "<>+[tagname='ba-layout']:current_device"
            }
        }

    }).register();

});
}).call(Scoped);