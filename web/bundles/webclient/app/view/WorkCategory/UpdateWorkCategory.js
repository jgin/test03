/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkCategory.UpdateWorkCategory', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateWorkCategory',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    
    title: 'Edit Work Category',
    messages: {
        workCategoryNameLabel: 'Name'
    },
    modal: true,
    width: 400,
    layout: 'fit',
    
    initComponent: function(){
        var me = this;

        var formItems = [
            {
                xtype: 'hiddenfield',
                name: 'idWorkCategory'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'workCategoryName',
                fieldLabel: me.messages.workCategoryNameLabel,
                anchor: '100%',
                allowBlank: false,
                maxLength: 255,
                fieldStyle: {textTransform: 'uppercase'}
            }
        ];
        formItems.push(Ext.create('sisprod.view.WorkCategory.WorkCategoryDetailsGrid', {id: 'updateWorkCategoryDetailsGrid'}));

        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };

        me.callParent(arguments);
    }
});