/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.Customer.AddCustomer', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addCustomer',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    messages:{
            isCompanyLabel:'Is Company',
            companyNameLabel:'Company',
            bloodGroupLabel:'Blood Group',
            documentTypeLabel:'Document Type',
            documentNumberLabel:'Document Number',
            maternalSurnameLabel:'Maternal Surname',
            paternalSurnameLabel:'Paternal Surname',
            personNameLabel:'Name',
            activityTypeLabel:'Activity Type',
            addressLabel:'Adress',
            emailLabel:'E-mail',
            imageLabel:'Picture',
            phoneLabel:'Phone',
            digitalSignatureLabel:'Digital Signature'
    },
    title: 'Add Cliente',
//    frame: true,
//    showWarningBeforeCancel: true,
    width: 400,
//    height:150,
    layout: 'fit',
    border: false,
//    bodyPadding: 5,
    fieldDefaults: {
        labelWidth: 120,
        labelStyle: 'font-weight:bold'
    },
    defaults: {
        anchor: '100%'
    },
    initComponent:function(){
        var me =this;
        me.formOptions= {
//        bodyPadding: 5,
        fieldDefaults: {
        labelWidth: 120
    },
    defaults: {
        anchor: '100%'
//        margins: '0 0 10 0'
    },
    defaultType:'textfield',
    items: [
        {           
            xtype: 'fieldset',
            id: 'rucData',
            defaultType:'textfield',
            border: 0,
            items:[
                    {
                    xtype:'fieldcontainer',
                    layout:'hbox',
                    items:[
                        {
                            xtype: 'hiddenfield',
                            name: 'entityId',
                            id: 'entityId'
                        },
                        {
                            xtype:'numberfield',
                            id: 'entityRuc',
                            name: 'entityRuc',
                            fieldLabel: 'RUC',
                            minLength:11,
                            maxLength:11,
                            anchor: '40%',
                            allowBlank: false,
                            hideTrigger : true
                        },        
                        {
                            xtype:'button',
                            id: 'searchEntity',
                            name: 'searchEntity',
                            iconCls:'search',
                            anchor: '20%',
                            allowBlank: false,
                            hideTrigger : true,
                            margins:'0 0 0 5'
                        }  
                    ]
                    },
                    {
                        xtype: 'checkboxfield',
                        name: 'isCompany',
                        id: 'isCompany',
                        fieldLabel: me.messages.isCompanyLabel,
                        inputValue:true,
                        anchor: '100%',
                        hidden:true
                    }
            ]
        },    
        {   xtype: 'fieldset',
            hidden: true,
            id: 'companyData',
            defaultType:'textfield',
            hidden:true,
            border: 0,
            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'idCompany',
                    id: 'idCompany'
                },
                {
                    id: 'companyName',
                    name: 'companyName',
                    fieldLabel: me.messages.companyNameLabel,
                    anchor: '100%',
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    //labelWidth: 110,        
//                    allowBlank: false,
                    margins: '0 0 0 8'
                }
            ]
            
        },
        {
            xtype:'fieldset',
            id:'personData',
            defaultType:'textfield',
            border:0,
            hidden:true,
            items:[
                {
                    xtype: 'hiddenfield',
                    name: 'idPerson',
                    id: 'idPerson'
                },
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    fieldLabel: me.messages.bloodGroupLabel,
                    store:Ext.create('sisprod.store.BloodGroupAll').load(),
                    displayField:'bloodGroupName',
                    valueField: 'idBloodGroup',
                    name:'cboBloodGroup',
                    id:'cboBloodGroup',
                    editable:false,
                    allowBlank: false
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {   
                            xtype: 'combobox',
                            fieldLabel: me.messages.documentTypeLabel,
                            store:Ext.create('sisprod.store.DocumentTypeAll').load(),
                            displayField:'documentTypeAcronym',
                            valueField: 'idDocumentType',
                            id:'cboDocumentType',
                            name:'cboDocumentType',
                            allowBlank: false,
                            editable:false
                        },            
                        {
                            id: 'documentNumber',
                            name: 'documentNumber',
                            fieldLabel: me.messages.documentNumberLabel,
                            allowBlank: false,
                            margins: '0 0 0 8'
                        } 
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    fieldDefaults: {
                        labelAlign: 'left'
                    },
                    items: [
                        {
                            id: 'paternalSurname',
                            name: 'paternalSurname',
                            fieldLabel: me.messages.paternalSurnameLabel,
                            anchor: '50%',
                            allowBlank: false,
                            maxLength: 50,
                            fieldStyle: {
                                textTransform: 'uppercase'
                            }
                        },
                        {
                            id: 'maternalSurname',
                            name: 'maternalSurname',
                            fieldStyle: {
                                textTransform: 'uppercase'
                            },
                            fieldLabel: me.messages.maternalSurnameLabel,
                            anchor: '50%',
                            maxLength: 50,
                            allowBlank: false,
                            margins: '0 0 0 8'
                        } 
                    ]
                },
                {
                    grow: true,
                    id: 'personName',
                    name: 'personName',
                    fieldLabel:me.messages.personNameLabel,
                    fieldStyle: {
                        textTransform: 'uppercase'
                    },
                    anchor: '99.5%',
                    allowBlank: false,
                    maxLength: 50
                },
                {
                    xtype: 'filefield',
                    id: 'digitalSignatureFile',
                    name: 'digitalSignatureFile',
                    fieldLabel:me.messages.digitalSignatureLabel,
                    anchor: '99.5%',
                    maxLength: 250,
                    hidden:true
                },
                {
                    xtype: 'hiddenfield',
                    id: 'digitalSignature',
                    name: 'digitalSignature',
                    anchor: '99.5%',
                    maxLength: 250
                }

            ]
        },
        {
            xtype:'fieldset',
            id:'entityData',
            defaultType:'textfield',
            hidden:true,
            border:0,
            items:[
                {
                    xtype: 'combobox',
                    anchor: '100%',
                    fieldLabel: me.messages.activityTypeLabel,
                    store:Ext.create('sisprod.store.ActivityTypeAll').load(),
                    displayField:'activityTypeName',
                    valueField: 'idActivityType',
                    name:'cboActivityType',
                    id:'cboActivityType',
                    editable:false
                },
                {
                    grow: true,
                    id: 'address',
                    name: 'address',
                    fieldLabel:me.messages.addressLabel,
                    anchor: '100%',
                    fieldStyle: {
                            textTransform: 'uppercase'
                    },
                    maxLength: 255
                },
                {
                    grow: true,
                    id: 'email',
                    name: 'email',
                    fieldLabel:me.messages.emailLabel,
                    anchor: '100%',
                    maxLength: 200
                },            
//                {
//                    xtype: 'filefield',
//                    id: 'image',
//                    name: 'image',
//                    fieldLabel:me.messages.imageLabel,
//                    anchor: '100%',
//                    maxLength: 200
//                },
                {
                    grow: true,
                    id: 'phone',
                    name: 'phone',
                    fieldLabel:me.messages.phoneLabel,
                    anchor: '50%',
                    maxLength: 150
                }
            ]
        }
            
    ]    
    }
    me.callParent(arguments);
  }
});