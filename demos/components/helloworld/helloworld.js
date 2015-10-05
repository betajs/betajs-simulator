
BetaJS.Dynamics.Dynamic.extend("BetaJS.Dynamics.Components.Helloworld", {

    template: BetaJS.Dynamics.Dynamic.Components.Templates.helloworld,

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
