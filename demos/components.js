
window.components = new BetaJS.Collections.Collection({objects: [
    {value  : 'webtest'},
    {value  : 'helloworld'}
]});

window.componentsBytitle = function (value) {
    var comp = window.components;
    for (var i = 0; i < comp.count(); ++i)
        if (comp.getByIndex(i).get("value") == value)
            return comp.getByIndex(i);
    return null;
};