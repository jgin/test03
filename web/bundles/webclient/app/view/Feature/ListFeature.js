/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.Feature.ListFeature', {
    extend: 'sisprod.view.base.TabPanelGridItem',
    alias: 'widget.listFeature',
    options: {},
    entityName: '',
    title: '',
    listTitle: 'Feature List',
    gridOptions: {
        region: 'center'
    },
    messages:{
        idFeatureHeader:'Feature ID',
        featureNameHeader:'Feature',
        idFeatureTypeHeader:'Feature Type ID',
        featureTypeNameHeader: 'Feature Type',
        idMeasureUnitHeader: 'Measure Unit ID',        
        measureUnitNameHeader:'Measure Unit'  
    },
    requires: [
       'sisprod.view.base.TabPanelGridItem'
    ],
    
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
                    idFeature: {header:me.messages.idFeatureHeader},
                    featureName: {header:me.messages.featureNameHeader},
                    'featureType.idFeatureType': {header:me.messages.idFeatureTypeHeader,hideable:false},
                    'featureType.featureTypeName': {header:me.messages.featureTypeNameHeader},
                    'measureUnit.idMeasureUnit': {header:me.messages.idMeasureUnitHeader,hideable:false},        
                    'measureUnit.measureUnitName': {header:me.messages.measureUnitNameHeader}        
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
    }
});

