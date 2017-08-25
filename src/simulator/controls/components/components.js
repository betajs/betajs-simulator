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
            var hashValue = document.location.hash.substring(1);
            var candidate = this.get("components").first();
            this.get("components").iterate(function(current) {
                if (current.get("value") === hashValue)
                    candidate = current;
            });
            this.set("current_component", candidate);
        },

        events: {
            "change:current_component": function(value) {
                document.location.hash = value.get("value");
            }
        }

    }).register();

});