/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkCategoryDetail.ListWorkCategoryDetail', {
   extend: 'sisprod.view.base.TabPanelGridItem',
   
   require: [
       'sisprod.view.base.TabPanelGridItem'
   ],
   
   alias: 'widget.listWorkCategoryDetail',
   
   options: {},
   
   entityName: '',
   
   title: '',
   
   listTitle: 'Listado de Detalles de Categoría de Trabajo',
   
   gridOptions: {
        region: 'center'
    },
   
   initComponent: function(){
       var me = this;

       var storeName = sisprod.getApplication().getStoreName(me.entityName);
       var modelName = sisprod.getApplication().getModelName(me.entityName);
        me.gridOptions = {
            title: me.listTitle,
            autoGenerationOptions:{
                model: modelName,
                autoGenerateColumns: true,
                columnOptions: {
                    idWorkCategory: {
                        header: 'Identificador de Categoria'
                    },
                    idWorkCategoryDetail: {
                        header: 'Identificador'
                    },
                    workCategoryName: {
                        header: 'Categoría de Trabajo'
                    },
                    workCategoryDetailName: {
                        header: 'Descripción'
                    }
                }
            },
            region: 'center',
            store: me.controller.getStore(storeName)/*,
            features: [
                Ext.create('Ext.grid.feature.Grouping',{
                    groupHeaderTpl: '{[values.rows[0].data.workCategoryName]}'
                })
            ]*/
        };
        me.callParent(arguments);
   }
   
});