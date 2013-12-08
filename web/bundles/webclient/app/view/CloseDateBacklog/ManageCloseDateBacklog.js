
Ext.define('sisprod.view.CloseDateBacklog.ManageCloseDateBacklog', {
    extend: 'sisprod.view.base.TabPanelItem',
    closable: true,
    height: 250,
    layout:{
        type: 'vbox',
        align: 'center'
    },
    
    messages: {
        alertMessage: 'Message',
        saveButtonText: 'Save',
        closingDatesSavedSuccessfuly: 'Closing Dates For Current Year have been saved!',
        closingDates: 'Closing Dates'
    },
    
    autoScroll: true,
    padding: '20 0 0 0',
    initComponent: function(){
       var me = this;
       
       me.items = new Array();
       var currentDate = new Date();
       var currentYear = currentDate.getFullYear();  
       //
       var closeDateBacklogStore = Ext.create('Ext.data.Store',{
            storeId: 'closeDateBacklogStore',
            model: 'sisprod.model.CloseDateBacklogModel',
            proxy: {
                type: 'memory',
                reader: {type: 'json'}
            }
       });
       
       Ext.BaseAjax.request({
            url: 'rest/closeDateBacklog/listAllByYear.htm',
            async: false,
            params: {year: currentYear},
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                Ext.Array.each(responseData, function(value, index, itself){
                    var model = new Ext.create('sisprod.model.CloseDateBacklogModel', value);
                    closeDateBacklogStore.add(model);
                });
            }
        });
       
        var form = Ext.create('Ext.form.Panel', {
            title: me.messages.closingDates,
            frame: true,
            layout: {
                type: 'table',
                columns: 6
            },
            items: me.getFullYearPickers(currentYear, closeDateBacklogStore),
            buttons:[
                {
                    text: me.messages.saveButtonText,
                    iconCls: 'save',
                    handler: function(){
                        me.getSelectedDates();
                    }
                }
            ]
        });
        me.items.push(form);
        me.callParent(arguments);
    },
            
    getFullYearPickers: function(year, closeDateBacklogStore){
        var now = new Date(Ext.Date.now());
        if(Ext.isDefined(year) && year === null) year = now.getFullYear();
        //
        var pickerArray = new Array();
        for(var month = 0; month < 12; month++){
            //
            var initialDate, endDate;
            var pickerValue = new Date(year, month, 1);
            //
            if(Ext.isDefined(closeDateBacklogStore) && closeDateBacklogStore !== null){
                var record = closeDateBacklogStore.findRecord('closeDateMonth', month);
                if(Ext.isDefined(record) && record !== null){
                    pickerValue = Ext.Date.parse(record.data['closeDate'], "Y-m-d");
                }
            }
            initialDate = Ext.Date.getFirstDateOfMonth(pickerValue);
            endDate = Ext.Date.getLastDateOfMonth(pickerValue);
            //
            var picker = {
                xtype: 'basedatepicker',
                name: 'closingDate',
                allowBlank: false,
                showToday: false,
                format: 'd-m-Y',
                minDate: initialDate,
                maxDate: endDate,
                value: pickerValue
            };
            pickerArray.push(picker);
        }
        return pickerArray;
    },
            
    getSelectedDates: function(){
        var me = this;
        var inputs = me.query('[name=closingDate]');
        var modelArray = new Array();
        Ext.Array.each(inputs, function(input, index, itself){
            var value = input.getValue();
            var model = Ext.create('sisprod.model.CloseDateBacklogModel',{
               closeDateYear: value.getFullYear(),
               closeDateMonth: value.getMonth(),
               closeDate: Ext.Date.format(value, 'd-m-Y')
            });
            modelArray.push(model);
        });
        var paramArray = new Array();
        for(var i=0;i<modelArray.length;i++){
            paramArray.push(modelArray[i].data);
        }
        var encodedModelArray = Ext.encode(paramArray);
        Ext.BaseAjax.request({
            url: 'rest/closeDateBacklog/register.htm',
            params: {
                closeDateList: encodedModelArray
            },
            success: function(response){
                var responseData = Ext.decode(response.responseText);
                if(Ext.isDefined(responseData.success) && responseData.success === true){
                    Ext.MessageBox.show({
                        title: me.messages.alertMessage,
                        msg: me.messages.closingDatesSavedSuccessfuly,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                }
                else{
                    Ext.MessageBox.show({
                        title: me.messages.alertMessage,
                        msg: responseData.message,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            }
        });
    }
});