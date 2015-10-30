
BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Components.Helloworld", {

    template: BetaJS.Simulator.Dynamics.Templates.helloworld,

    initial: {

        attrs: {
            model: {
                title :'Hello World'
            }
        },

        functions : {
            click : function () {
                var itemtitle = this.get('model').title;
                console.log("You Clicked item : " + itemtitle)
            }
        }

    }

}).register();
