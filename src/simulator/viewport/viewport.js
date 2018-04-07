Scoped.define("module:Viewport", [
    "dynamics:Dynamic",
    "base:Promise",
    "browser:Loader",
    "base:Time",
    "browser:Dom"
], function(Dynamic, Promise, Loader, Time, Dom, scoped) {
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

        create: function() {
            this._updateCurrentComponent();

            var test = null;
        },

        events: {
            "change:current_component": function() {
                this._updateCurrentComponent();
            }
        },

        customContainer: function() {
            return this.activeElement().querySelector("custom-container");
        },

        _updateCurrentComponent: function() {
            var comp = this.get("current_component");
            if (!comp)
                return;
            if (comp.get("system")) {
                var systems = this.scope("<>+[tagname='ba-layout']").get("systems");
                this.set("current_system", systems.query({
                    value: comp.get("system")
                }).next());
            }
            this.customContainer().innerHTML = "";
            var promise = Promise.create();
            promise.success(function() {
                if (comp.get("customhtml")) {
                    this.customContainer().parentElement.children[0].innerHTML = "";
                    this.customContainer().innerHTML = comp.get("customhtml");
                }
                if (comp.get("customstyle"))
                    this.customContainer().appendChild(Loader.inlineStyles(comp.get("customstyle")));
                if (comp.get("customscript"))
                    comp.get("customscript")();
            }, this);
            if (comp.get("externalfile")) {
                comp.set("customstyle", comp.get("customstyle") || "");
                this.customContainer().parentElement.children[0].innerHTML = "";
                var src = comp.get("externalfile");
                src += (src.indexOf("?") >= 0 ? "&" : "?") + "rev=" + Time.now();
                Loader.loadHtml(src, function(content) {
                    var parsed = Dom.elementsByTemplate(content);
                    var code = "";
                    parsed.forEach(function(elem) {
                        if (elem.id == "test")
                            comp.set("customhtml", "<div id='test'>" + elem.innerHTML + "</div>");
                        if (elem.tagName == "SCRIPT")
                            comp.set("customscript", new Function(elem.innerHTML));
                        if (elem.tagName == "STYLE")
                            comp.set("customstyle", comp.get("customstyle") + elem.innerHTML);
                    });
                    comp.set("externalfile", "");
                    promise.asyncSuccess(true);
                });
            } else
                promise.asyncSuccess(true);
        }

    }).register();

});