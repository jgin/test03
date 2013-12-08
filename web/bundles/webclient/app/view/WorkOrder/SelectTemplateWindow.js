/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrder.SelectTemplateWindow', {
   extend: 'Ext.window.Window',
   
   alias: 'widget.selectTemplateWindow',
   
   require: [
       'Ext.window.Window'
   ],
   
   windowMessages: {
       okText: 'Ok',
       closeText: 'Close'
   },
   
   messages: {
       labels: {
           useTemplate: 'Use template?',
           workTemplate: 'Template'
       },
       workTemplateEmptyText: 'Type a work template name...'
   },
   
   title: 'Generate Work Order',
   
   forPrintingList: true,
   
   layout: {
       type: 'fit'
   },
   modal: true,
   width: 500,
   data: {},
   
   initComponent: function(){
        var me = this;
        
        var defaultFormOptions = {
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                labelWidth: 120
            },
            items: [
//                {
//                    xtype: 'checkbox',
//                    fieldLabel: me.messages.labels.useTemplate,
//                    labelSeparator: '',
//                    name: 'useTemplate',
//                    id: 'useTemplate',
//                    inputValue: true
//                },
                {
                        xtype: 'sensitivecombo',
                        hideTrigger: false,
                        name: 'idWorkTemplate',
                        id: 'idWorkTemplate',
                        fieldLabel: me.messages.labels.workTemplate,
                        store: Ext.create('sisprod.store.AllWorkTemplateByWorkCategoryDetailStore',{
                            listeners: {
                                beforeload: function(store, operation, options){
                                    if(Ext.isDefined(operation.params) && operation.params!==null)
                                    operation.params.idWorkCategoryDetail = me.idWorkCategoryDetail;
                                    else operation.params = {query: '', idWorkCategoryDetail: me.idWorkCategoryDetail};
//                                    if(Ext.isDefined(operation.params) && operation.params!==null)
//                                    operation.params.idWorkCategoryDetail = me.data['workCategoryDetail']['idWorkCategoryDetail'];
//                                    else operation.params = {query: '', idWorkCategoryDetail: me.data['workCategoryDetail']['idWorkCategoryDetail']};
                                }
                            }
                        }),
                        emptyText: me.messages.workTemplateEmptyText,
                        forceSelection : true,
                        allowBlank: false,
//                        disabled: true,
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">','{workTemplateName}','</tpl>'),
                        valueField: 'idWorkTemplate',
                        listConfig: {
                            getInnerTpl: function() {
                                return "{workTemplateName}";
                            }
                        }
                }
            ],
            bodyPadding: 5,
            fieldDefaults: {
                labelWidth: 70,
                width: 260
            },
            buttons: [
                {
                    text: me.windowMessages.okText,
                    action: 'loadTemplate'
                },
                {
                    text: me.windowMessages.closeText,
                    handler: function() {
                        var window = me;
                        window.close();
                    }
                }
            ]
        };
        var options = Ext.applyIf(defaultFormOptions, me.formOptions);
        var form = Ext.create('Ext.form.Panel', options);
        me.items = new Array();
        me.items.push(form);
        
        me.callParent(arguments);
   }
});
