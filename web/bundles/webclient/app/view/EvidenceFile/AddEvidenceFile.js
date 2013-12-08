/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.EvidenceFile.AddEvidenceFile', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addEvidenceFile',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    idWorkOrder:null,
    storeRef:null,
    messages: {
        evidenceTypeLabel: 'Evidence Type',
        fileLabel:'File'
    },
    
    title: 'Add Evidence',
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
               name:'idWorkOrder',
               value:me.idWorkOrder
            },
            {
                xtype: 'combobox',
                anchor: '100%',
                fieldLabel: me.messages.evidenceTypeLabel,
                store:Ext.create('sisprod.store.EvidenceDocumentTypeAll').load(),
                displayField:'evidenceDocumentTypeName',
                valueField: 'idEvidenceDocumentType',
                id:'idEvidenceDocumentType',
                name:'idEvidenceDocumentType',
                width:120,
                forceSelection: true,
                allowBlank: false,
                editable: false
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
