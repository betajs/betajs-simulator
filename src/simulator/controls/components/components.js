Scoped.define("module:Components", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

        collections: {
            "components": []
        },

        create: function() {
            this.set("current_component", this.get("components").first());
        }

    }).register();

});