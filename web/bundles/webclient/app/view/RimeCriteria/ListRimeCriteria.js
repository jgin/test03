/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeCriteria.ListRimeCriteria', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listRimeCriteria',
   
   options: {},
   
   entityName: '',
   
   listTitle: 'RIME Criterias List',
   messages: {
       headers: {
           idRimeCriteria: 'ID',
           rimeCriteriaName: 'Name',
           rimeCriteriaLevel: 'Level'
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
                    rimeCriteriaName: {
                        header: me.messages.headers.rimeCriteriaName
                    },
                    rimeCriteriaLevel: {
                        header: me.messages.headers.rimeCriteriaLevel
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
   }
   
});