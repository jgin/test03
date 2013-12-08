
Ext.define('sisprod.view.WellFeatureFluidLevel.AddWellFeatureFluidLevel', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
//    height: 250,

    alias: 'widget.addWellFeatureFluidLevel',
    
    layout:{
        type: 'vbox',
        align: 'center'
    },
    
    messages: {
        title: 'Well Feature List',
        alertMessage: 'Message',
        saveButtonText: 'Save',
        headers: {
            wellFeatureName: 'Well Feature',
            wellFeatureType: 'Feature Type',
            measureUnit: 'Measure Unit'
        }
    },
    
    autoScroll: true,
    padding: '20 0 0 0',
    initComponent: function(){
       var me = this;
        
       me.items = new Array();
       
       var form = Ext.create('Ext.form.Panel', {
            title: me.messages.title,
            frame: true,
            layout: 'fit',
            items: [
                me.getGridPanel()
            ],
            buttons:[
                {
                    text: me.messages.saveButtonText,
                    iconCls: 'save',
                    action: 'save'
                },
                {
                    text: me.messages.refreshButtonText,
                    iconCls: 'refresh',
                    action: 'refresh'
                }
            ]
        });
        me.items.push(form);
        me.callParent(arguments);
    },
            
    getGridPanel: function(){
        var me = this;
        var gridPanel = Ext.create('Ext.grid.Panel',{
            title: me.messages.title,
            id: 'wellFeatureFluidLevelGrid',
            store: Ext.create('sisprod.store.WellFeatureFluidLevelStore').load({
                callback: function(record, options){
                    var controller = me.controller;
                    if(Ext.isDefined(controller) && controller !== null){
                        controller.afterLoadStore.apply(controller, [me]);
                    }
                }
            }),
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            height: 250,
            width: 500,
            columns: [
                {
                    dataIndex: 'idWellFeature',
                    hidden: true
                },
                {
                    text: me.messages.headers.wellFeatureName,
                    dataIndex: 'wellFeatureName',
                    flex: 4
                },
                {
                    text: me.messages.headers.wellFeatureType,
                    dataIndex: 'wellFeatureType',
                    flex: 2
                },
                {
                    text: me.messages.headers.measureUnit,
                    dataIndex: 'measureUnit',
                    flex: 2
                },
                {
                    dataIndex: 'checked',
                    hidden: true
                }
            ]
        });
        return gridPanel;
    }
});