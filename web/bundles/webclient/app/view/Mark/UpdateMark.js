/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Mark.UpdateMark', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateMark',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    
    autoMappingOptions: {
        autoMapping: false
    },
    messages:{
            markNameLabel:'Mark'
    },
    title: 'Update Mark',
    width: 400,
    initComponent:function(){
        var me =this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idMark'
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'markName',
                fieldLabel:me.messages.markNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 255
            }
        ]
        };
        me.callParent(arguments);
    }
});