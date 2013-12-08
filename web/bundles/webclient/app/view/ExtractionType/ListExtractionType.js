/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.ExtractionType.ListExtractionType', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listExtractionType',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Extraction Type List',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId: 'Id',
        msgIdWellTypeByState: 'Id Well Type By State',
        msgExtractionTypeName: 'Extraction Type',
        msgAcronym: 'Acronym',
        msgWellTypeByState: 'Well Type By State'
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
                    idExtractionType: {
                        header: me.messages.msgId
                    },
                    idWellTypeByState: {
                        header: me.messages.msgIdWellTypeByState
                    },  
                    extractionTypeName: {
                        header: me.messages.msgExtractionTypeName
                    },
                    extractionTypeAcronym: {
                        header: me.messages.msgAcronym
                    },
                    wellTypeByStateName: {
                        header: me.messages.msgWellTypeByState
                    }        
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

