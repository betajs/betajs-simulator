
BetaJS.Dynamics.Dynamic.extend("BetaJS.Simulator.Components.Webtest", {

    template: BetaJS.Simulator.Dynamics.Templates.webtest,

    initial: {

        attrs: {
            model: {
                title :'WebTest - Layout'
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
