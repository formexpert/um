
var catalogfill = function(config) {
    config = config || {};
    catalogfill.superclass.constructor.call(this,config);
};
Ext.extend(catalogfill,Ext.Component,{
    page:{},window:{},grid:{},tree:{},panel:{},combo:{},tab:{},config: {}
});
Ext.reg('catalogfill',catalogfill);

catalogfill = new catalogfill();

Ext.Ajax.timeout = 240000;//4 min.
