/* 
 * To change this template, choose Users | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.EvidenceDocumentType.UpdateEvidenceDocumentType', {
    extend: 'sisprod.view.base.BaseDataWindow',
    alias: 'widget.updateEvidenceDocumentType',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
        isRequeridLabel:'Required',
        evidenceDocumentTypeNameLabel:'Name',
        evidenceDocumentTypeCodeLabel:'Code',
        directoryNameLabel:'directory'
    },
    autoMappingOptions: {
        autoMapping: false
    },
    title: 'Update Evidence Document Type',
    modal: true,
    width: 400,
    initComponent:function(){
        var me=this;
        me.formOptions= {
        bodyPadding: 2,
        items: [
            {
                xtype: 'hiddenfield',
                name: 'idEvidenceDocumentType'
            },
            {
                xtype: 'checkboxfield',
                name: 'required',
                fieldLabel: me.messages.isRequeridLabel,
                inputValue:true,
                anchor: '100%'
            },
            {
            xtype: 'textfield',
            grow: true,
            name: 'evidenceDocumentTypeName',
            fieldLabel:me.messages.evidenceDocumentTypeNameLabel,
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
            name: 'evidenceDocumentTypeCode',
            fieldLabel:me.messages.evidenceDocumentTypeCodeLabel,
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
            name: 'directoryName',
            fieldLabel:me.messages.directoryNameLabel,
            fieldStyle: {
                textTransform: 'uppercase'
            },
            anchor: '100%',
            allowBlank: false,
            maxLength: 100
            }
        ]
        }
        me.callParent(arguments);
    }
});