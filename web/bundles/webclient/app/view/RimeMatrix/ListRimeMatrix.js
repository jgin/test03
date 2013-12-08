/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.RimeMatrix.ListRimeMatrix', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listRimeMatrix',
   
   options: {},
   
   entityName: '',
   
   listTitle: 'RIME Matrices List',
   messages: {
       headers: {
           idRimeMatrix: 'ID',
           rimeCriteriaName: 'RIME Criteria',
           rimeCriteriaLevel: 'Criteria Level',
           rimeIndex: 'Index',
           effectiveStartDate: 'Effective Start Date',
           workCategoryName: 'Work Category',
           workCategoryDetailName: 'Work Type',
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
                    idRimeMatrix: {header:me.messages.headers.idRimeMatrix},
                    'rimeMatrix.effectiveStartDate': {header: me.messages.headers.effectiveStartDate, flex: 1},
                    rimeIndex: {header: me.messages.headers.rimeIndex},
                    'rimeCriteria.rimeCriteriaName': {header: me.messages.headers.rimeCriteriaName, flex: 2},
                    'rimeCriteria.rimeCriteriaLevel': {header: me.messages.headers.rimeCriteriaLevel},
                    'workCategoryDetail.workCategory.workCategoryName': {header: me.messages.headers.workCategoryName, flex: 2},
                    'workCategoryDetail.workCategoryDetailName': {header: me.messages.headers.workCategoryDetailName, flex: 2},
                    maximumTimeAttention: {header: me.messages.headers.maximumTimeAttention}
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)
        };
        me.callParent(arguments);
   }
   
});


