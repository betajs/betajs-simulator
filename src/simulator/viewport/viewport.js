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
        }

    }).register();

});