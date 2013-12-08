

Ext.define('sisprod.view.WorkTemplate.UpdateWorkTemplate', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateWorkTemplate',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    messages:{
        workTemplateNameLabel:"Name",
        workCategoryLabel:"Work Category",
        workCategoryDetailLabel:"Work Type",
        manHoursLabel:"Man Hours",
        workTypeEmptyText:'Type a Work Type',
        machineHoursLabel:"Machine Hours",
        alertMessage:'Message',
        selectWorkCategory:'Select work category first'
    },
    title: 'Update Work Template',
    modal: true,
    width: 700,
    initComponent:function(){
        var me =this;
        var item = [
                {
                    xtype:'hidden',
                    id:'idWorkTemplate',
                    name:'idWorkTemplate'
                },
                {
                xtype: 'textfield',
                grow: true,
                name: 'workTemplateName',
                fieldLabel:me.messages.workTemplateNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                labelWidth: 100,
                anchor: '60%',
                allowBlank: false,
                maxLength: 150
                },
                {
                xtype: 'combobox',
                name: 'idWorkCategory',
                id: 'idWorkCategory',
                anchor: '80%',
                flex: 1,
                labelWidth: 100,
                store: Ext.create('sisprod.store.WorkCategoryAll'),
                fieldLabel:me.messages.workCategoryLabel,
                displayField: 'workCategoryName',
                valueField: 'idWorkCategory',
                forceSelection: true,
                allowBlank: false
                },
                {
                xtype: 'sensitivecombocontainer',
                anchor: '100%',
                showAddButton: false,
                sensitiveComboBoxOptions:{
                    hideTrigger: false,
                    name: 'idWorkCategoryDetail',
                    id: 'idWorkCategoryDetail',
                    fieldLabel: me.messages.workCategoryDetailLabel,
                    labelWidth: 100,
//                    store: Ext.create('sisprod.store.WorkCategoryDetailByCategory'),
                    store: Ext.create('sisprod.store.WorkCategoryDetailByCategory',{
                        listeners: {
                            beforeload: function(store, operation, options){
                                var idWorkCategory = me.down('#idWorkCategory').getValue();
                                if(Ext.isDefined(idWorkCategory) && idWorkCategory!==null){
                                    if(Ext.isDefined(operation.params) && operation.params!==null)
                                        operation.params.idWorkCategory = idWorkCategory;
                                    else operation.params = {query: '', idWorkCategory: idWorkCategory};
                                }
                                else{
                                    Ext.Msg.alert(me.messages.alertMessage,me.messages.selectWorkCategory);
                                    return false;
                                }
                            }
                        }
                    }),
                    emptyText: me.messages.workTypeEmptyText,
                    forceSelection : true,
                    allowBlank: false,
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">','{workCategoryDetailName}','</tpl>'),
                    valueField: 'idWorkCategoryDetail',
                    listConfig: {
                        getInnerTpl: function() {
                            return "{workCategoryDetailName}";
                        }
                    }
                }
            },
            {
                xtype:'fieldcontainer',
                columnWidth: 0.5,
                defaults: {anchor: '100%'},
                layout: 'hbox',
//                padding:10,
                anchor:'60%',
                style:{
                    padding:10
                },
                items:[
                    {
                        xtype: 'numberfield',
                        grow: true,
                        id: 'manHours',
                        name: 'manHours',
                        fieldLabel: me.messages.manHoursLabel,
                        labelWidth:100,
                        readOnly:true,
                        allowDecimals: true,
                        decimalSeparator:'.',
                        value:0,
                        minValue:0,
                        flex:1
                    },
                    {
                        xtype: 'numberfield',
                        grow: true,
                        id: 'machineHours',
                        name: 'machineHours',
                        labelWidth:100,
                        fieldLabel: me.messages.machineHoursLabel,
                        readOnly:true,
                        allowDecimals: true,
                        decimalSeparator:'.',
                        value:0,
                        margin:'0 0 0 5',
                        minValue:0,
                        flex:1
                    }
                ]
            }];
        var tabItems = new Array();
        tabItems.push(Ext.create('sisprod.view.WorkTemplate.ActivityOtGrid', {id:'activityOtGrid'}));
//        tabItems.push(Ext.create('sisprod.view.WorkTemplate.EquipmentGrid', {id:'equipmentGrid'}));
        tabItems.push(Ext.create('sisprod.view.WorkTemplate.PPEquipmentGrid', {id:'ppEquipmentGrid'}));
        tabItems.push(Ext.create('sisprod.view.WorkTemplate.ProductGrid', {id:'productGrid'}));
        var tab = Ext.create('Ext.tab.Panel', {
            items: tabItems
        });
        item.push(tab);        
        me.formOptions= {
            bodyPadding: 2,
            items:item
        };
        me.callParent(arguments);
    }
});