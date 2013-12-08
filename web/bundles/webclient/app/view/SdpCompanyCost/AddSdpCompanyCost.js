/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.SdpCompanyCost.AddSdpCompanyCost', {
    extend: 'sisprod.view.base.BaseDataWindow',
    
    alias: 'widget.addSdpCompanyCost',
    
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    idSdp:null,
    storeRef:null,
    messages: {
        sdpCompanyLabel:'Sdp Company',
        amountLabel:'Amount',
        moneyLabel:'Money',
        totalHourLabel:'Total Hour',
        statupDateLabel:'statup Date',
        finishDateLabel:'finish Date',
        fileLabel:'Valorization'
    },
    
    title: 'Add Sdp Company Cost',
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
                xtype: 'combobox',
                anchor: '100%',
                fieldLabel: me.messages.sdpCompanyLabel,
                store:Ext.create('sisprod.store.SdpCompanyAll').load(),
                displayField:'companyName',
                valueField: 'idSdpCompany',
                id:'idSdpCompany',
                name:'sdpCompany.idSdpCompany',
                width:120,
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
//            {
//                xtype: 'datefield',
//                name: 'executionStartDate',
//                id: 'executionStartDate',
//                flex: 1,
//                fieldLabel: me.messages.labels.executionStartDate,
//                labelWidth: 30,
//                labelSeparator: '',
//                allowBlank: false,
//                vtype: 'daterange',
//                endDateField: 'executionEndDate'
//            },
//            {
//                xtype: 'datefield',
//                name: 'executionEndDate',
//                id: 'executionEndDate',
//                flex: 1,
//                labelWidth: 30,
//                labelSeparator: '',
//                allowBlank: false,
//                fieldLabel: me.messages.labels.executionEndDate,
//                margin: '0 0 0 10',
//                vtype: 'daterange',
//                startDateField: 'executionStartDate'
//            },
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
