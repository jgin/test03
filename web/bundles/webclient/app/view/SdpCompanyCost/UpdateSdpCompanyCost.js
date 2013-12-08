/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpCompanyCost.UpdateSdpCompanyCost', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.updateSdpCompanyCost',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    autoMappingOptions: {
        autoMapping: false
    },
    idSdp:null,
    storeRef:null,
    controller: null,
    messages: {
        sdpCompanyLabel:'Sdp Company',
        amountLabel:'Amount',
        moneyLabel:'Money',
        totalHourLabel:'Total Hour',
        startupDateLabel:'statup Date',
        finishDateLabel:'finish Date',
        fileLabel:'Valorization'
    },
    
    title: 'Update Sdp Company Cost',
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
               name:'idSdp',
               value:me.idSdp
            },
            {
               xtype:'hiddenfield',
               name:'idSdpCompanyCost'
            },
            {
                xtype: 'combobox',
                anchor: '100%',
                fieldLabel: me.messages.sdpCompanyLabel,
                store:Ext.create('sisprod.store.SdpCompanyAll').load(),
                displayField:'companyName',
                valueField: 'idSdpCompany',
                id:'idSdpCompanyCost',
                name:'sdpCompany.idSdpCompany',
                forceSelection: true,
                allowBlank: false,
                editable: false
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'amount',
                fieldLabel: me.messages.amountLabel,                
                anchor: '100%',
                allowBlank: true,
                allowDecimals: true,
                allowNegative: false,
                decimalSeparator:'.',
                minValue:0
            },
            {
                xtype: 'combobox',
                anchor: '100%',             
                fieldLabel : me.messages.moneyLabel,
                labelWidth:150,
                id: 'cboMoney',
                store : Ext.create('sisprod.store.MoneyAll').load(),
                displayField : 'moneyName',
                valueField : 'idMoney',
                name:'money.idMoney',
                forceSelection : true,
                editable : false
            },
            {
                xtype: 'numberfield',
                grow: true,
                name: 'totalHour',
                fieldLabel: me.messages.totalHourLabel,
                anchor: '100%',
                allowBlank: true,
                allowDecimals: true,
                allowNegative: false,
                decimalSeparator:'.',
                minValue:0
            },
            {
                xtype: 'datefield',
                name: 'startupDate',
                id: 'startupDateSdpCost',
                fieldLabel: me.messages.startupDateLabel,
                allowBlank: false,
                vtype: 'daterange',
                endDateField: 'finishDateSdpCost'
            },
            {
                xtype: 'datefield',
                name: 'finishDate',
                id: 'finishDateSdpCost',
                allowBlank: false,
                fieldLabel: me.messages.finishDateLabel,
                vtype: 'daterange',
                startDateField: 'startupDateSdpCost'
            },
            {
                xtype: 'filefield',
                id: 'fileSdpCost',
                name: 'file',
                fieldLabel:me.messages.fileLabel,
//                allowBlank: false,
                anchor: '99.5%',
                maxLength: 250
            }
        ]
    },
    me.callParent(arguments);    
    }
});
