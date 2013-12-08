/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Position.AddPosition', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addPosition',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Add Position',
    messages: {
        labels:{
            externalId: 'External Id',
            positionName: 'Name'            
        }
    },
    
    modal: true,
    width: 400,
    singleAddition: false,
//    height: 150,    
    initComponent: function(){
        var me = this;
        
        me.formOptions = {
            bodyPadding: 2,
            defaults:{
                labelWidth: 100,
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'textfield',
                    grow: true,
                    name: 'positionName',
                    maxLength: 100,
                    fieldLabel: me.messages.labels.positionName,
                    allowBlank: false
                }
            ]
        };
        
        me.callParent(arguments);
    }
});