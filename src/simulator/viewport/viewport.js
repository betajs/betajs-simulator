Scoped.define("module:Viewport", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        initial: {
            bind: {
                current_component: "<>+[tagname='ba-components']:current_component",
                current_system: "<>+[tagname='ba-layout']:current_system",
                current_device: "<>+[tagname='ba-layout']:current_device"
            }
        },

        events: {
            "change:current_component": function() {
                if (this.get("current_component") && this.get("current_component").get("system")) {
                    var systems = this.scope("<>+[tagname='ba-layout']").get("systems");
                    this.set("current_system", systems.query({
                        value: this.get("current_component").get("system")
                    }).next());
                }
            }
        }

    }).register();

});