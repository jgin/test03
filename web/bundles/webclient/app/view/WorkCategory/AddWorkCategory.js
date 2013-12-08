/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.WorkCategory.AddWorkCategory', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addWorkCategory',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Work Category',
    
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
                xtype: 'textfield',
                name: 'workCategoryName',
                fieldLabel: me.messages.workCategoryNameLabel,
                anchor: '100%',
                allowBlank: false,
                maxLength: 255,
                fieldStyle: {textTransform: 'uppercase'}
//                cls: 'textUppercase'
            }
        ];
        formItems.push(Ext.create('sisprod.view.WorkCategory.WorkCategoryDetailsGrid', {id:'addWorkCategoryDetailsGrid'}));
        
        me.formOptions = {
            bodyPadding: 2,
            items: formItems
        };
        
        me.callParent(arguments);
    }
});