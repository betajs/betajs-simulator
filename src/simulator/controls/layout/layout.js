Scoped.define("module:Layout", [
    "dynamics:Dynamic"
], function(Dynamic, scoped) {
    return Dynamic.extend({
        scoped: scoped
    }, {

        template: "<%= template(filepathnoext + '.html') %>",

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