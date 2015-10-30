
BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Dynamics.Layout", {

    template: BetaJS.Simulator.Dynamics.Templates.layout,
    
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

