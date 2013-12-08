/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Turn.ListTurn',{
    extend: 'sisprod.view.base.TabPanelGridItem',
    
    alias: 'widget.listTurn',
    
    require: [
        'sisprod.view.base.TabPanelGridItem'
    ],
    messages: {
        idTurnHeader:'Turn ID',
        startTimeHeader: 'Start Time',
        endTimeHeader: 'End Time',
        turnOrderHeader: 'Turn Order',
        turnNameHeader: 'Turn',
        acronymTurnHeader: 'Acronym Turn'
    },
    
    options: {},
    
    entity: '',
    
    title: '',
    
    listTitle: 'Turns List',
    
    gridOptions: {
        region: 'center' 
    },
    
    initComponent: function(){
        var me = this;
        var storeName = sisprod.getApplication().getStoreName(me.entityName);
        var modelName = sisprod.getApplication().getModelName(me.entityName);        
        
        me.gridOptions = {
            title: me.listTitle,
            entityName: me.entityName,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idTurn: {header:me.messages.idTurnHeader},
                    startTime: {header:me.messages.startTimeHeader},
                    endTime: {header:me.messages.endTimeHeader},
                    turnOrder: {header:me.messages.turnOrderHeader},
                    turnName: {header:me.messages.turnNameHeader},
                    acronymTurn: {header:me.messages.acronymTurnHeader}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        
        me.callParent(arguments);
    }    
});