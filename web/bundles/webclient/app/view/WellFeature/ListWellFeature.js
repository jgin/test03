/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.WellFeature.ListWellFeature', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listWellFeature',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Well Feature List',
    gridOptions: {
        region: 'center'
    },
    
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
    messages: {
        msgId: 'Id',
        msgIdFeatureType: 'Id Feature Type',
        msgIdMeasureUnit: 'Id Measure Unit',
        msgWellFeature: 'Well Feature',
        msgFeatureType: 'Feature Type',
        msgMeasureUnit: 'Measure Unit',
        msgUpdateInWellTest: 'Update in well test',
        msgUpdateInWellService: 'Update in well service'
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
                    idWellFeature: {
                        header: me.messages.msgId
                    },
                    idFeatureType: {
                        header: me.messages.msgIdFeatureType
                    },
                    idMeasureUnit: {
                        header: me.messages.msgIdMeasureUnit
                    },        
                    wellFeatureName: {
                        header: me.messages.msgWellFeature
                    },
                    featureTypeName: {
                        header: me.messages.msgFeatureType
                    },
                    measureUnitName: {
                        header: me.messages.msgMeasureUnit
                    },
                    updateInWellTest: {
                        header: me.messages.msgUpdateInWellTest
                    },
                    updateInWellService: {
                        header: me.messages.msgUpdateInWellService
                    }        
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

