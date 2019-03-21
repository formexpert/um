
Ext.onReady(function() {
    MODx.load({xtype: 'catalogfill-page-home'});
});

catalogfill.page.Home = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        components: [{
            xtype: 'catalogfill-panel-home'
            ,renderTo: 'catalogfill-panel-home-div'
        }]
    });
    catalogfill.page.Home.superclass.constructor.call(this,config);
};
Ext.extend(catalogfill.page.Home,MODx.Component);
Ext.reg('catalogfill-page-home',catalogfill.page.Home);

