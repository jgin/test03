/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkCategoryDetail.UpdateWorkCategoryDetail', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateWorkCategoryDetail',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Editar Detalle de Categoría Trabajo',
    modal: true,
    width: 400,
//    height: 150,

    formOptions: {
        bodyPadding: 2,
        defaults:{
            labelWidth: 140
        },
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idWorkCategoryDetail'
            },
            {
                xtype: 'combobox',
                grow: true,
                name: 'idWorkCategory',
                store: Ext.create('sisprod.store.WorkCategoryAll'),
                fieldLabel: 'Categoria de Trabajo',
                displayField: 'workCategoryName',
                valueField: 'idWorkCategory',
                emptyText: 'Seleccione',
                forceSelection: true,
                anchor: '100%',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'workCategoryDetailName',
                fieldLabel: 'Descripción',
                anchor: '100%',
                allowBlank: false
            }
        ]
    }    
});