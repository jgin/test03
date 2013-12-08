/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Employee.UploadDigitalSignature', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.uploadDigitalSignature',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    idEmployee:null,
    storeRef:null,
    messages: {
        fileLabel:'File'
    },
    
    title: 'Upload Digital Signature',
    modal: true,
    width: 450,
    entityName: '',
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 150
        },
        items: [
            {
               xtype:'hiddenfield',
               name:'idEmployee',
               value:me.idEmployee
            },
            {
                xtype: 'filefield',
                id: 'file',
                name: 'file',
                fieldLabel:me.messages.fileLabel,
                allowBlank: false,
                anchor: '99.5%',
                maxLength: 250
            }
        ]
    },
    me.callParent(arguments);    
    }
});
