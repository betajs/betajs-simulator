
BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Dynamics.Layout", {

    template: BetaJS.Simulator.Dynamics.Templates.layout,
    
    collections : {
        systems : [
            {value: 'mobile'},
            {value: 'web'}
        ],
        mobile : [
            {value: 'iphone4'},
            {value: 'iphone5'}
        ],
        web:[
            {value: 'notebook'}
        ]
    }

}).register();

