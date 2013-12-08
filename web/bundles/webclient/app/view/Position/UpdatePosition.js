/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Position.UpdatePosition', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updatePosition',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    title: 'Edit Risk Level',
    messages: {
        labels:{
            externalId: 'External id',
            positionName: 'Name'
        }
    },
    modal: true,
    width: 400,
    
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
                    xtype: 'hiddenfield',
                    name: 'idPosition'
                },
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