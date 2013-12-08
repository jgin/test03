Ext.define('sisprod.view.base.ExportDataWindow', {
   extend: 'Ext.window.Window',
   
   alias: 'widget.exportDataWindow',
   
   require: [
       'Ext.window.Window',
       'Ext.form.Panel',
       'Ext.form.Basic',
       'Ext.form.action.Submit',
       'Ext.form.action.StandardSubmit'
   ],
   
   windowMessages: {
       okText: 'Ok',
       closeText: 'Close',
       reportTitleLabel: 'Title',
       formatLabel: 'Format',
       formatEmptyText: 'Select...',
       pagesLabel: 'Pages',
       toLabel: 'To',
       pageFromValidator: 'Start page must be less than end page'
   },
   
   title: 'Print',
   
   forPrintingList: true,
   
//   formData: {
//       url: '',
//       defaultFormat: 'html',
//       selectableFormat: true,
//       fields: '',
//       filters: '[]',
//       sorters: '[]',
//       pageSize: 25
//   },
   
   formOptions: {
       autoHeight: true,
       items: [],
       buttons: []
   },
   
   modal: true,
   
   initComponent: function(){
        var me = this;
        var defaultFormData = {
            url: '',
            defaultFormat: sisprod.BasePrintWindow.HTML,
            selectableFormat: true,
            hiddenTitle: false,
            fields: '',
            filters: '[]',
            sorters: '[]',
            pageSize: 25
        };
        Ext.apply(defaultFormData, me.formData);
        me.formData = defaultFormData;
        var defaultFormOptions = {
            autoHeight: true,
            url: me.formData.url,
            standardSubmit: true,
            width: 330,
            layout: 'anchor',
//            method: 'GET',
            defaults: {
                anchor: '100%'
            },
            items: [],
            bodyPadding: 5,
            fieldDefaults: {
                labelWidth: 70,
                width: 260
            },
            buttons: [
                {
                    text: me.windowMessages.okText,
//                    action: 'print',
                    iconCls: 'print',
                    listeners: {
                        click: function(button, event, options){
                            var controller = me.controller;
                            if(Ext.isDefined(controller) && controller !== null){
                                if(Ext.isDefined(controller.onPrint) && controller.onPrint !== null){
                                    controller.onPrint.apply(controller, [button, event, options]);
                                }
                            }
                        }
                    }
                },
                {
                    text: me.windowMessages.closeText,
                    iconCls: 'cancel',
                    handler: function() {
                        var window = me;
                        window.close();
                    }
                }
            ]
        };
        if(me.forPrintingList){
            defaultFormOptions.items.push({
                xtype: 'fieldcontainer',
                layout: 'hbox',
                fieldLabel: me.windowMessages.pagesLabel,
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'pageFrom',
                        flex: 1,
                        minValue: 1,
                        validator: function(value){
                            var pageToInput = this.up('form').query('[name=pageTo]')[0];
                            if(Ext.isDefined(pageToInput) && pageToInput !== null){
                                if(value>pageToInput.getValue()){
                                    return me.windowMessages.pageFromValidator;
                                }
                            }
                            return true;
                        }
                    },{
                        xtype: 'label',
                        text: me.windowMessages.toLabel,
                        flex: .5,
                        padding: '3 0 0 10'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'pageTo',
                        flex: 1,
                        minValue: 1,
                        listeners: {
                            change: function(input, newValue, oldValue, options){
                                var pageFromInput = this.up('form').query('[name=pageFrom]')[0];
                                if(Ext.isDefined(pageFromInput) && pageFromInput !== null){
                                    var value = pageFromInput.getValue();
                                    if(!Ext.isDefined(value) || value===null) pageFromInput.setValue(1);
                                }
                            }
                        }
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'pageSize',
                        value: me.formData.pageSize
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'fields',
                        value: me.formData.fields
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'filters',
                        value: me.formData.filters
                    },
                    {
                        xtype: 'hiddenfield',
                        name: 'sort',
                        value: me.formData.sorters
                    }
                ]
            });
        }
        var options = Ext.applyIf(defaultFormOptions, me.formOptions);
        var form = Ext.create('Ext.form.Panel', options);
        me.items = new Array();
        me.items.push(form);
        
        me.callParent(arguments);
   }
});
