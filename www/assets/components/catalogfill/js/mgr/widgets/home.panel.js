
/**
 * Компонент Импорт / экспорт
 *
 * @class catalogfill.panel.Home
 * @extends MODx.Panel
 * @param {Object} config An object of options.
 * @xtype catalogfill-panel-home
 */

catalogfill.panel.Home = function(config){
    config = config || {};
    this.ident_imp = config.ident || '_imp';//'cfp'+Ext.id();
    this.ident_exp = config.ident || '_exp';//'cfp'+Ext.id();
    Ext.apply(config,{
        id: 'catalogfill-panel-cmp'
        ,border: false
        ,baseCls: 'container modx-formpanel'
        ,parentId: 0
        ,checkDirty: false
        ,baseParams: {
            hideFiles: config.hideFiles || false
            ,wctx: MODx.ctx || 'web'
            ,currentAction: MODx.request.a || 0
            ,currentFile: MODx.request.file || ''
        }
        ,items: [{
            html: '<h2>'+_('catalogfill')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,bodyStyle: 'padding: 10px'
            ,defaults: {border: false ,autoHeight: true}
            ,border: true
            ,tabPosition: 'top'
            ,stateful: true
            ,stateId: 'catalogfill-home-tabpanel'
            ,stateEvents: ['tabchange']
            ,getState:function() {
                return {activeTab:this.items.indexOf(this.getActiveTab())};
            }
            ,items: [{
                title: _('catalogfill.import')
                ,defaults: {autoHeight: true}
                ,items: [{
                    xtype: 'form'
                    ,id: 'cf_import_form'
                    ,border: false
                    ,padding: '10px'
                    ,labelWidth: 180
                    ,buttonAlign: 'left'
                    ,items: [
                        {
                            xtype: 'modx-field-parent-ch'
                            ,id: 'cf_modx-resource-parent-cmp'+this.ident_imp
                            ,ident: this.ident_imp
                            ,fieldLabel: _('resource_parent')
                            ,description: _('catalogfill.parent_resource_help')
                            ,name: 'parent_imp_combo'
                            ,value: ''
                            ,width: 250
                            //,anchor: '100%'
                        },
                        {
                            xtype: 'hidden'
                            ,name: 'parent_imp'
                            ,value: ''
                            ,id: 'modx-resource-parent-hidden-cmp'+this.ident_imp
                        },
                        {
                            xtype: 'modx-combo'
                            ,id: 'cf_combo-config-cmp'
                            ,name: 'config_file'
                            ,editable: false
                            ,resizable: false
                            ,url: catalogfill.config.connectorUrl
                            ,baseParams: {
                                action: 'getFileList'
                                ,type: 'config'
                            }
                            ,fieldLabel: _('catalogfill.config')
                            ,value: ''
                            ,width: 250
                        },
                        {
                            xtype: 'modx-combo'
                            ,id: 'cf_combo-files-cmp'
                            ,name: 'imp_file'
                            ,editable: false
                            ,resizable: false
                            ,url: catalogfill.config.connectorUrl
                            ,baseParams: {
                                action: 'getFileList'
                                ,type: 'import'
                            }
                            ,fieldLabel: _('catalogfill.imp_file')
                            ,value: ''
                            ,width: 250
                        },
                        {
                            xtype: 'textfield'
                            ,fieldLabel: _('catalogfill.string_number')
                            ,name: 'current_string'
                            ,id: 'current_string'
                            ,value: '0'
                        },
                        {
                            xtype: 'compositefield'
                            ,fieldLabel: ''//_('catalogfill.upload_files')
                            ,height: 45
                            ,items: [{
                                    xtype: 'hidden'
                                    ,name: 'imp_hidden'
                                    ,value: ''
                                    ,id: 'cf-hidden-cmp'
                                },
                                {
                                    xtype: 'button'
                                    ,name: 'button_upload'
                                    ,fieldLabel: ''
                                    ,text: ''
                                    ,icon: catalogfill.config.assetsUrl+'img/page_white_get.png'
                                    ,tooltip: {text: _('catalogfill.upload_files')}
                                    ,width: 59
                                    ,handler: this.uploadFiles
                                    ,hidden: MODx.perm.file_upload ? false : true
                                },
                                {
                                    xtype: 'button'
                                    ,name: 'button_delfiles'
                                    ,fieldLabel: ''
                                    ,text: ''
                                    ,icon: catalogfill.config.assetsUrl+'img/page_white_delete.png'
                                    ,tooltip: {text: _('catalogfill.delete_files')}
                                    ,width: 59
                                    ,style: {position:'absolute'}
                                    ,handler: this.deleteFiles
                                },
                                {
                                    xtype: 'button'
                                    ,name: 'button_refreshfiles'
                                    ,fieldLabel: ''
                                    ,text: ''
                                    ,icon: catalogfill.config.assetsUrl+'img/update.png'
                                    ,tooltip: {text: _('catalogfill.refreshfiles')}
                                    ,width: 59
                                    ,style: {position:'absolute'}
                                    ,handler: this.refreshFilelist
                                },
                                {
                                    xtype: 'button'
                                    ,name: 'button_refreshfiles'
                                    ,fieldLabel: ''
                                    ,text: ''
                                    ,icon: catalogfill.config.assetsUrl+'img/document-pencil.png'
                                    ,tooltip: {text: _('catalogfill.editconfig')}
                                    ,width: 59
                                    ,style: {position:'absolute'}
                                    ,handler: this.editConfigFile
                                }
                            
                        //refreshFilelist
                    ]
                        },
                        {
                            xtype: 'radiogroup'
                            ,id: 'cf_import-type-cmp'
                            ,fieldLabel: _('catalogfill.imp_type')
                            ,name: 'imp_type'
                            ,autoWidth: true
                            ,columns: [100,100]
                            ,items: [{
                                checked: true
                                ,autoWidth: true
                                ,boxLabel: _('catalogfill.imp_type_refresh')
                                ,name: 'imp_type'
                                ,inputValue: 'update'
                            }, {
                                autoWidth: true
                                ,boxLabel: _('catalogfill.imp_type_add')
                                ,name: 'imp_type'
                                ,inputValue: 'add'
                            }]
                        }
                    ],
                    buttons: [
                        {
                            type: 'button'
                            ,width: 180
                            ,text: _('catalogfill.button_import')
                            ,handler: function(){ Ext.getCmp('catalogfill-panel-cmp').importProducts(); }
                        },
                        {
                            type: 'button'
                            ,width: 180
                            ,text: _('catalogfill.button_clean')
                            ,handler: this.cleanParent
                        }
                    ]
                }]
//                ,listeners: {
//                  activate : function(panel){
//                      if(Ext.get('shk-grid-orders-cmp')==null){
//                          MODx.load({
//                              xtype: 'shk-grid-orders'
//                              ,id: 'shk-grid-orders-cmp'
//                              ,renderTo: panel.id
//                          });
//                      }
//                  }
//                }
            }
            
            //Экспорт
            ,{
                title: _('catalogfill.export')
                ,defaults: {autoHeight: true}
                ,items: [{
                    xtype: 'form'
                    ,id: 'cf_export_form'
                    ,border: false
                    ,padding: '10px'
                    ,labelWidth: 180
                    ,buttonAlign: 'left'
                    ,items: [
                        {
                            xtype: 'modx-field-parent-ch'
                            ,ident: this.ident_exp
                            ,fieldLabel: _('resource_parent')
                            ,description: _('catalogfill.parent_resource_help')
                            ,name: 'parent_exp_combo'
                            ,id: 'modx-resource-parent-cmp'+this.ident_exp
                            ,value: ''
                            ,width: 250
                        },
                        {
                            xtype: 'modx-combo'
                            ,id: 'cf_combo-config-exp-cmp'
                            ,name: 'config_file'
                            ,editable: false
                            ,resizable: false
                            ,url: catalogfill.config.connectorUrl
                            ,baseParams: {
                                action: 'getFileList'
                                ,type: 'config'
                            }
                            ,fieldLabel: _('catalogfill.config')
                            ,value: ''
                            ,width: 250
                        },
                        {
                            xtype: 'hidden'
                            ,name: 'parent_exp'
                            ,value: ''
                            ,id: 'modx-resource-parent-hidden-cmp'+this.ident_exp
                        },
                        {
                            xtype: 'radiogroup'
                            ,fieldLabel: _('catalogfill.file_type')
                            ,name: 'exp_type'
                            ,autoWidth: true
                            ,columns: [70,70,70]
                            ,items: [{
                                checked: true
                                ,autoWidth: true
                                ,boxLabel: 'CSV'
                                ,name: 'exp_type'
                                ,inputValue: 'csv'
                            }, {
                                autoWidth: true
                                ,boxLabel: 'XLS'
                                ,name: 'exp_type'
                                ,inputValue: 'xls'
                            }, {
                                autoWidth: true
                                ,boxLabel: 'XLSX'
                                ,name: 'exp_type'
                                ,inputValue: 'xlsx'
                            }]
                        },
                        {
                            html:'<br /><div id="exportFile"></div>'
                            ,border: false
                        }],
                    buttons: [
                        {
                            type: 'button'
                            ,width: 180
                            ,text: _('catalogfill.button_export')
                            ,handler: this.exportProducts
                        }
                    ]
                }]
                ,listeners: {
                  activate : function(panel){
                      
                      
                    
                  }
                
                }
            }]
        }]
        ,listeners: {
            
            afterrender: this.loadStat
            
        }
    });
    catalogfill.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(catalogfill.panel.Home,MODx.Panel,{
    
    uploadFiles: function(btn,e) {
        if (!this.uploader) {
            this.uploader = new MODx.util.MultiUploadDialog.Dialog({
                url: MODx.config.connector_url
                ,base_params: {
                    action: 'browser/file/upload'
                    ,path: catalogfill.config.impFilesPath
                    ,wctx: MODx.ctx || ''
                    ,source: ''
                }
                ,cls: 'ext-ux-uploaddialog-dialog modx-upload-window'
            });
            this.uploader.on('show',function(){},this);
            this.uploader.on('uploadsuccess',function(){
                Ext.getCmp('cf_combo-files-cmp').getStore().reload();
            },this);
            this.uploader.on('uploaderror',function(){},this);
            this.uploader.on('uploadfailed',function(){},this);
        }
        this.uploader.base_params.source = catalogfill.config.impFilesPath;
        this.uploader.show(btn);
    }
    /*
    ,_uploadFiles: function(btn,e) {
        if (!this.uploader) {
            this.uploader = new Ext.ux.UploadDialog.Dialog({
                url: MODx.config.connectors_url+'browser/file.php'
                ,base_params: {
                    action: 'upload'
                    ,path: catalogfill.config.impFilesPath
                    ,wctx: MODx.ctx || ''
                    ,source: ''
                }
                ,reset_on_hide: true
                ,width: 550
                ,cls: 'ext-ux-uploaddialog-dialog modx-upload-window'
                ,listeners: {
                    show: function(){}
                    ,uploadsuccess: function(){
                        Ext.getCmp('cf_combo-files-cmp').getStore().reload();
                    }
                    ,uploaderror: function(){}
                    ,uploadfailed: function(){}
                }
            });
        }
        this.uploader.show(btn);
    }
    */
    //Импорт
    ,importProducts: function(skip,total,is_first){
        var root = this;
        if(typeof(skip)=='undefined') var skip = 0;
        if(typeof(total)=='undefined') var total = 0;
        if(typeof(is_first)=='undefined') var is_first = 1;
        var imp_form = Ext.getCmp('cf_import_form');
        var formValues = imp_form.getForm().getValues();
        formValues.skip = skip;
        formValues.is_first = is_first;
        
        var process = skip > 0 && skip < total ? Math.round((1 - ((total - skip) / total)) * 100) : 0;
        var process_str = process>0 && process<100 ? ' ('+process+'%)' : '';
        imp_form.getEl().mask(_('loading')+process_str, 'x-mask-loading');
        
        Ext.Ajax.request({
            url: catalogfill.config.connectorUrl
            ,params: {action: "import", data: Ext.encode(formValues)}
            ,method: 'POST'
            ,success: function(response, options){
                
                Ext.getCmp('cf_import_form').getEl().unmask();
                
                var result = Ext.util.JSON.decode(response.responseText);
                
                if(typeof(result) == 'object'){
                    
                    if(result.success==false){
                        Ext.Msg.alert(_('catalogfill.message'), result.message);
                        return;
                    }
                    
                    if(result.object.pos < result.object.lines_count){
                        
                        Ext.getCmp('current_string').setValue(result.object.pos);
                        
                        Ext.getCmp('catalogfill-panel-cmp').importProducts(result.object.pos, result.object.lines_count, 0);
                        
                    }else{
                        
                        imp_form.getForm().reset();
                        Ext.getCmp('modx-resource-tree').refresh();
                        MODx.clearCache();
                        
                    }
                    
                }
                
                Ext.getCmp('catalogfill-panel-cmp').loadStat();
                
            }
            ,failure: function(response, options){
                
                Ext.getCmp('cf_import_form').getEl().unmask();
                Ext.Msg.alert(_('catalogfill.message'), 'Error '+response.status);
                
            }
            
        });
        
    }
    
    //Экспорт
    ,exportProducts: function(btn,e){
        
        Ext.getCmp('cf_export_form').getEl().mask(_('loading'),'x-mask-loading');
        
        var formValues = Ext.getCmp('cf_export_form').getForm().getValues();
        
        Ext.Ajax.request({
            url: catalogfill.config.connectorUrl
            ,params: {action: "export", data: Ext.encode(formValues)}
            ,method: 'POST'
            ,success: function(response, options){
                Ext.getCmp('cf_export_form').getEl().unmask();
                var result = Ext.util.JSON.decode(response.responseText);
                if(result.success==false){
                    Ext.Msg.alert(_('catalogfill.message'), result.message);
                }else{
                    if(result.object.filename!='') Ext.get('exportFile').update('<a class="download-icn" href="'+result.object.filepath+'">'+result.object.filename+'</a>');
                }
            }
        });
        
    }
    
    //Очистка категории
    ,cleanParent: function(btn,e){
        var imp_form = Ext.getCmp('cf_import_form');
        var formValues = imp_form.getForm().getValues();
        formValues.imp_type = 'clean_parent';
        
        Ext.Msg.confirm(_('catalogfill.confirm'), _('catalogfill.confirm_clean'), function(e) {
            if (e == 'yes') {
                imp_form.getEl().mask(_('loading'),'x-mask-loading');
                Ext.Ajax.request({
                    url: catalogfill.config.connectorUrl
                    ,params: {action: "import", data: Ext.encode(formValues)}
                    ,method: 'POST'
                    ,success: function(response, options){
                        imp_form.getEl().unmask();
                        var result = Ext.util.JSON.decode(response.responseText);
                        if(result.success==false){
                            Ext.Msg.alert(_('catalogfill.message'), result.message);
                            return;
                        }

                        //imp_form.getForm().reset();
                        Ext.getCmp('modx-resource-tree').refresh();
                        
                        Ext.getCmp('catalogfill-panel-cmp').loadStat();
                        
                    }
                });
            }
        },this);
        
    }
    
    //Обновление списка файлов
    ,refreshFilelist: function(btn,e){
        
        Ext.getCmp('cf_import_form').getEl().mask(_('loading'),'x-mask-loading');
        Ext.getCmp('cf_combo-config-cmp').getStore().reload();
        Ext.getCmp('cf_combo-files-cmp').getStore().reload();
        setTimeout(function(){
            Ext.getCmp('cf_import_form').getEl().unmask();
        },500);
        
    }
    
    //Переход к редактированию конфигурационного файла
    ,editConfigFile: function(btn,e){

        var core_path_arr, cf_core_url, namespace_path_arr;
        if( MODx.config.core_path ){
            core_path_arr = MODx.config.core_path.split('/');
            cf_core_url = core_path_arr[(core_path_arr.length-2)] + '/components/catalogfill/';
        } else {
            namespace_path_arr = MODx.config.namespace_path.split('/');
            cf_core_url = (namespace_path_arr.slice(-4)).join('/');
        }
        
        var config_name = Ext.getCmp('cf_combo-config-cmp').getValue();
        if(config_name == ''){
            Ext.Msg.alert(_('catalogfill.message'), _('catalogfill.mess_no_conf'));
            return;
        }

        window.open( MODx.config.manager_url+'?a=system/file/edit&file=' + cf_core_url + 'config/'+config_name+'.php&source=1', '_blank' );
    }
    
    //Удаление файлов
    ,deleteFiles: function(btn,e){
        var imp_form = Ext.getCmp('cf_import_form');
        var formValues = imp_form.getForm().getValues();
        formValues.imp_type = 'delete_files';
        
        Ext.Msg.confirm(_('catalogfill.confirm'), _('catalogfill.confirm_delete_files'), function(e) {
            if (e == 'yes') {
                imp_form.getEl().mask(_('loading'),'x-mask-loading');
                Ext.Ajax.request({
                    url: catalogfill.config.connectorUrl
                    ,params: {action: "import", data: Ext.encode(formValues)}
                    ,method: 'POST'
                    ,success: function(response, options){
                        imp_form.getEl().unmask();
                        var result = Ext.util.JSON.decode(response.responseText);
                        if(result.success==false){
                            Ext.Msg.alert(_('catalogfill.message'), result.message);
                            return;
                        }

                        Ext.getCmp('cf_combo-files-cmp').getStore().reload();
                        
                    }
                });
            }
        },this);
        
    }
    
    
    //Загружает статистику ресорсов и доп.полей
    ,loadStat: function(){
        
        Ext.Ajax.request({
            url: catalogfill.config.connectorUrl
            ,params: {action: "getstat", parent: this.parentId}
            ,method: 'POST'
            ,success: function(response, options){
                var results = Ext.util.JSON.decode(response.responseText).results;
                Ext.get('modAB').update('<div clas="cf_stat">'+_('catalogfill.stat_resources')+': <b>'+(results.resources > results.resources_pub ? results.resources_pub+'/' : '')+results.resources+'</b><br />'+_('catalogfill.stat_tvs')+': <b>'+results.tvs+'</b></div>');
            }
        });
        
    }
    
    ,clearDirty : function(nodeToRecurse){ return true; }
    
    
});
Ext.reg('catalogfill-panel-home',catalogfill.panel.Home);



/**
 * ChangeParentField
 */
MODx.ChangeParentField = function(config) {
    config = config || {};
    this.ident = config.ident || 'qcr'+Ext.id();
    Ext.applyIf(config,{
        triggerAction: 'all'
        ,editable: false
        ,readOnly: false
        ,formpanel: 'modx-panel-resource'
    });    
    MODx.ChangeParentField.superclass.constructor.call(this,config);
    this.config = config;
    this.on('click',this.onTriggerClick,this);
    this.addEvents({ end: true });
    this.on('end',this.end,this);
};
Ext.extend(MODx.ChangeParentField,Ext.form.TriggerField,{
    oldValue: false
    ,oldDisplayValue: false
    ,end: function(p) {
        var t = Ext.getCmp('modx-resource-tree');
        if (!t) return;
        p.d = p.d || p.v;
        
        t.removeListener('click',this.handleChangeParent,this);
        t.on('click',t._handleClick,t);
        t.disableHref = false;
        
        Ext.getCmp('modx-resource-parent-hidden-cmp'+this.ident).setValue(p.v);
        
        this.setValue(p.d);
        this.oldValue = false;
        
        //Ext.getCmp(this.config.formpanel).fireEvent('fieldChange');
    }
    
    ,onTriggerClick: function() {
        if (this.disabled) { return false; }
        if (this.oldValue) {
            this.fireEvent('end',{
                v: this.oldValue
                ,d: this.oldDisplayValue
            });
            return false;
        }
        var t = Ext.getCmp('modx-resource-tree');
        if (!t) {
            var tp = Ext.getCmp('modx-leftbar-tabpanel');
            if (tp) {
                tp.on('tabchange',function(tbp,tab) {
                    if (tab.id == 'modx-resource-tree-ct') {
                        this.disableTreeClick();
                    }
                },this);
                tp.activate('modx-resource-tree-ct');
            }
            return false;
        }
        this.disableTreeClick();
    }

    ,disableTreeClick: function() {
        MODx.debug('Disabling tree click');
        t = Ext.getCmp('modx-resource-tree');
        if (!t) {
            return false;
        }
        this.oldDisplayValue = this.getValue();
        this.oldValue = Ext.getCmp('modx-resource-parent-hidden-cmp'+this.ident).getValue();

        this.setValue(_('resource_parent_select_node'));

        t.expand();
        t.removeListener('click',t._handleClick);
        t.on('click',this.handleChangeParent,this);
        t.disableHref = true;

        return true;
    }
    
    ,handleChangeParent: function(node,e) {
        var t = Ext.getCmp('modx-resource-tree');
        if (!t) { return false; }
        t.disableHref = true;

        var id = node.id.split('_'); id = id[1];
        if (id == MODx.request.id) {
            MODx.msg.alert('',_('resource_err_own_parent'));            
            return false;
        }

        var ctxf = Ext.getCmp('modx-resource-context-key');
        if (ctxf) {
            var ctxv = ctxf.getValue();
            if (node.attributes && node.attributes.ctx != ctxv) {
                ctxf.setValue(node.attributes.ctx);
            }
        }
        this.fireEvent('end',{
            v: node.attributes.type != 'modContext' ? id : node.attributes.pk
            ,d: Ext.util.Format.stripTags(node.text)
        });
        e.preventDefault();
        e.stopEvent();
        
        Ext.getCmp('catalogfill-panel-cmp').parentId = id;
        
        return true;
    }
    
});
Ext.reg('modx-field-parent-ch',MODx.ChangeParentField);

