/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RiskLevel.ListRiskLevel', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listRiskLevel',
   
   options: {},
   
   entityName: '',
   
   messages: {
       headers: {
           idRiskLevel: 'ID',
           riskLevelName: 'Name',
           riskLevelAcronym: 'Acronym',
           minimumValue: 'Min. Value',
           maximumValue: 'Max. Value'
       }
   },
   
   listTitle: 'Risk Levels',
   
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
                    idRiskLevel:{
                        header: me.messages.headers.idRiskLevel
                    },
                    riskLevelName: {
                        header: me.messages.headers.riskLevelName
                    },
                    riskLevelAcronym: {
                        header: me.messages.headers.riskLevelAcronym
                    },
                    minimumValue: {
                        header: me.messages.headers.minimumValue
                    },
                    maximumValue: {
                        header: me.messages.headers.maximumValue
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
       };
       
       me.callParent(arguments);
   }
   
});