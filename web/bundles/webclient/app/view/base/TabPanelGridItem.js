/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.base.TabPanelGridItem', {
    extend: 'sisprod.view.base.TabPanelItem',
    xtype: 'tabPanelGridItem',
    require: [
        'sisprod.view.base.TabPanelItem'
    ],
    layout: {
        type: 'border'
    },
    
//    gridOptions: {
//        region: 'center'
//    },
    gridMessages : {
        buttonText : {
            importData: 'Importar Datos'
        }  
    },
    
    baseGridPanelId: '',
    showCheckInactive: true,
    
    initComponent: function() {
        var me = this;
        me.gridOptions.showCheckInactive = me.showCheckInactive;
        if(Ext.isDefined(me.defaultPermissions) && me.defaultPermissions !== null)
            me.gridOptions = Ext.Object.merge(me.defaultPermissions, me.gridOptions);
        //
        var gridPanel = Ext.create('sisprod.view.base.BaseGridPanel', me.gridOptions);
        me.baseGridPanelId = gridPanel.getItemId();
        me.items = [gridPanel];

        me.on("afterrender", me.onAfterRender, me);
        me.on("close", me.onClose, me);
        me.on("removed", me.onRemoved, me);
        
        me.addEvents('getGridPanel');
        
        me.on('getGridPanel', me.getGridPanel, me);
        
        me.callParent(arguments);

    },
            
    getGridPanel: function(){
        var me = this;        
        return me.queryById(me.baseGridPanelId);
    },
      
    onAfterRender: function(panel, options){
        var me = this;
        sisprod.getApplication().verifyDailyReportTabItems();
    },
            
    onClose: function(panel, options){
        var me = this;
        if(Ext.isDefined(me.gridOptions.store)) Ext.data.StoreManager.unregister(me.gridOptions.store);
            if(Ext.isDefined(me.gridOptions.autoGenerationOptions.model))
                Ext.ModelManager.unregister(Ext.ModelManager.getModel(me.gridOptions.autoGenerationOptions.model));
//            if(Ext.isDefined(me.controller)) me.controller.destroy();
    },
            
    onRemoved: function(panel, component, options){
        var me = this;
        sisprod.getApplication().verifyDailyReportTabItems();
    }
});
