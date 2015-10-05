
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