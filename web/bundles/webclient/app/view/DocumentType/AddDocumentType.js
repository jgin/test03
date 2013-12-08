/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.DocumentType.AddDocumentType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addDocumentType',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages: {
        documentTypeNameLabel: 'Document Type',
        documentTypeAcronymLabel: 'Acronym'
    },
    
    title: 'Add Document Type',
    modal: true,
    width: 400,
//    height: 150,
    initComponent: function(){
        var me = this;
        me.formOptions = {
        bodyPadding: 2,
        fieldDefaults: {
            labelWidth: 120
        },
        items: [
            {
                xtype: 'textfield',
                grow: true,
                name: 'documentTypeName',
                fieldLabel: me.messages.documentTypeNameLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 100
            },
            {
                xtype: 'textfield',
                grow: true,
                name: 'documentTypeAcronym',
                fieldLabel: me.messages.documentTypeAcronymLabel,
                fieldStyle: {
                    textTransform: 'uppercase'
                },
                anchor: '100%',
                allowBlank: false,
                maxLength: 20
            }
        ]
    },
    me.callParent(arguments);    
    }
});