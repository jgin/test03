Ext.define('sisprod.view.base.Header', {
    extend: 'Ext.Container',
    xtype: 'appHeader',
    widget: 'widget.appHeader',
    id: 'app-header',
    height: 55,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    
    messages: {
        closeSessionText:'Close Session',
        closeSessionConfirmMessage: 'You\'re about to exit this application. Are you sure you want to continue?',
        productionPeriod: 'Report Date'
    },
    
    formats: {
        sourceDateFormat: 'Y-m-d',
        targetDateFormat: 'd-m-Y'
    },
    
    initComponent: function() {
        
        var me = this;
        
        var productionDate = new Date();
        var strProductionDate = Ext.util.Cookies.get('envProductionPeriodDate');
        if(Ext.isDefined(strProductionDate) && strProductionDate !== null){
            productionDate  = Ext.util.Format.date(Ext.Date.parse(strProductionDate,
                me.formats.sourceDateFormat), me.formats.targetDateFormat);
            if(Ext.isDefined(productionDate) && productionDate !== null){
            }
        }       
        
        me.items = [
        {
            xtype: 'component',
            id: 'app-header-title',
            html: sisprod.getApplication().getApplicationTitle(),
            flex: 5
        },
        {
            xtype: 'component',
            html : Ext.String.format('<img src="{0}"/>', sisprod.getApplication().getImagePath('petroleo-06.gif')),
            flex: 2
        },
        {
            xtype: 'fieldcontainer',
            layout : 'hbox',
            items: [
//                {
//                    xtype: 'combobox',
//                    name: 'envLot',
//                    id: 'envLot',
//                    store: Ext.create('sisprod.store.LotStore'),
//                    fieldLabel: 'Lote',
//                    labelWidth: 30,
//                    displayField: 'lotName',
//                    valueField: 'idLot',
//                    emptyText: 'Seleccione',
//                    allowBlank: false,
//                    forceSelection: true,
//                    editable: false,
//                    margin: '0 10 0 0'
//                },
                {
                    xtype: 'datefield',
                    name: 'envProductionPeriodDate',
                    id: 'envProductionPeriodDate',
                    value : productionDate,
                    fieldLabel: me.messages.productionPeriod,
                    labelWidth: 100,
                    allowBlank: false,
                    hidden: true,
                    listeners: {
                        change: function(input, newValue, oldValue, eventOptions){
                            sisprod.getApplication().onChangeEnvProductionPeriodDate(input, newValue, oldValue, eventOptions);
                        }
                    }
                }
            ],
            flex: 5
        },
        {
            xtype: 'button',
            text: me.messages.closeSessionText,
            id: 'app-close-session',
            flex: 1,
            handler: function(){
            	Ext.Msg.show({
                    title: me.messages.closeSessionText,
                    msg: me.messages.closeSessionConfirmMessage,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function(button){
                        if(button==="yes"){
                            sisprod.getApplication().stopAutoUpdateListTaskRunner();
                            location.href = "j_spring_security_logout";
                        }
                    }
                });
            }
        }];

        /*if (!Ext.getCmp('options-toolbar')) {
            this.items.push({
                xtype: 'themeSwitcher'
            });
        }*/

        me.callParent(arguments);
    }
});