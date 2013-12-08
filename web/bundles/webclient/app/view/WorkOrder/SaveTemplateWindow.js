/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkOrder.SaveTemplateWindow', {
   extend: 'Ext.window.Window',
   
   alias: 'widget.saveTemplateWindow',
   
   require: [
       'Ext.window.Window'
   ],
   
   windowMessages: {
       okText: 'Ok',
       closeText: 'Close'
   },
   
   messages: {
       workTemplateText: 'Template Name',
       newWorkTemplateText:'New Work Template'
   },
   
   title: 'Save as Work Template',
   
   forPrintingList: true,
   
   layout: {
       type: 'fit'
   },
   modal: true,
   width: 500,
   idWorkCategoryDetail:null,
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
                {
                  xtype:'checkboxfield',
                  id:'newWorkTemplate',
                  name:'newWorkTemplate',
                  grow:true,
                  fieldLabel:me.messages.newWorkTemplateText,
                  checked:true,
                  anchor:'100%'
                },
                {
                    xtype: 'textfield',
                    grow: true,
                    id: 'workTemplateName',
                    name: 'workTemplateName',
                    fieldLabel:me.messages.workTemplateText,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 150
                },
                {
                    xtype: 'sensitivecombo',
                    hideTrigger: false,
                    name: 'idWorkTemplate',
                    id: 'idWorkTemplate',
                    fieldLabel: me.messages.workTemplateText,
                    hidden:true,
                    allowBlank: true,
                    store: Ext.create('sisprod.store.AllWorkTemplateByWorkCategoryDetailStore',{
                        listeners: {
                            beforeload: function(store, operation, options){
                                if(Ext.isDefined(operation.params) && operation.params!==null)
                                operation.params.idWorkCategoryDetail = me.idWorkCategoryDetail;
                                else operation.params = {query: '', idWorkCategoryDetail: me.idWorkCategoryDetail};
                         }
                        }
                    }),
                    emptyText: me.messages.workTemplateEmptyText,
                    forceSelection : true,
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
            buttons: [
                {
                    text: me.windowMessages.okText,
                    action: 'saveTemplate'
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
