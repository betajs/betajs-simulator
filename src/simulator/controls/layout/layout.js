
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

