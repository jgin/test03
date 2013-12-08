/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeCriteriaValue.ListRimeCriteriaValue', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listRimeCriteriaValue',
   
   options: {},
   
   entityName: '',
   
   listTitle: 'RIME Criteria Values List',
   messages: {
       headers: {
           idRimeCriteria: 'ID',
           rimeCriteriaName: 'RIME Criteria',
           idRimeCriteriaValue: 'Value ID',
           effectiveStartDate: 'Effective Start Date',
           minimumScore: 'Minimum Score',
           maximumScore: 'Maximum Score',
           maximumTimeAttention: 'Maximum Time Attention'
       }
   },
   
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
                    idRimeCriteria: {
                        header: me.messages.headers.idRimeCriteria
                    },
                    'rimeCriteria.rimeCriteriaName': {
                        header: me.messages.headers.rimeCriteriaName
                    },
                    idRimeCriteriaValue: {
                        header: me.messages.headers.idRimeCriteriaValue
                    },
                    effectiveStartDate: {
                        header: me.messages.headers.effectiveStartDate
                    },
                    minimumScore: {
                        header: me.messages.headers.minimumScore
                    },
                    maximumScore: {
                        header: me.messages.headers.maximumScore
                    },
                    maximumTimeAttention: {
                        header: me.messages.headers.maximumTimeAttention
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
   }
   
});