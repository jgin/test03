Ext.define('sisprod.Application', {
    name: 'sisprod',

    extend: 'Ext.app.Application',
   
    views: [
        'sisprod.view.Menu',
        'sisprod.view.Main',
        'sisprod.view.Viewport'
    ],

    controllers: [
        'sisprod.controller.Main'
    ],

    stores: [
        // TODO: add stores here
    ],
    
    applicationMessages: {
        alertMessage: 'Message'
    },
    
    applicationTitle: 'PRODUCTION SYSTEM',
    companyName: 'GMP COMPANY',
    loadingText: 'Loading...',
    menuStore: null,
    loadingMask: null,
    updateListTaskRunner: null,
    
    formats: {
        sourceDateFormat: 'Y-m-d',
        targetDateFormat: 'd-m-Y'
    },
    
    init: function(){
        var me = this;
        me.loadingMask = new Ext.LoadMask(Ext.getBody(), {
            msg: me.loadingText
        });
        //
        me.addEvents('showMask', 'hideMask');
        me.on('showMask', me.showMask, me);
        me.on('hideMask', me.hideMask, me);
        me.on('getApplicationTitle', me.getApplicationTitle, me);
        me.on('getCompanyName', me.getCompanyName, me);
        me.on('getModelName', me.getModelName, me);
        me.on('getStoreName', me.getStoreName, me);
        me.on('getControllerName', me.getControllerName, me);
        me.on('getResourcesFolder', me.getResourcesFolder, me);
        me.on('getImagePath', me.getImagePath, me);
        me.on('formatEnglishDate', me.formatEnglishDate, me);
        me.on('formatSpanishDate', me.formatSpanishDate, me);
        me.on('parseDate', me.parseDate, me);
        me.on('verifyDailyReportTabItems', me.verifyDailyReportTabItems, me);
        me.on('startAutoUpdateListTaskRunner', me.startAutoUpdateListTaskRunner, me);
        me.on('decodeUTF8', me.decodeUTF8, me);
        //
        Ext.EventManager.on(window, 'keydown', function(e, t) {
//            if (e.getKey() === e.BACKSPACE && (!/^input$/i.test(t.tagName) || t.disabled || t.readOnly)
//                && (!/^textarea/i.test(t.tagName) || t.disabled || t.readOnly)) {
//                e.stopEvent();
//            }
            if(e.getTarget().type !== 'text' && e.getTarget().type !== 'textarea'
                && e.getTarget().type !== 'password' && e.getKey() === e.BACKSPACE){
//                e.preventDefault();
                e.stopEvent();
            }
        });
        me.startAutoUpdateListTaskRunner();
        //
    },
    
    showMask: function(){
        this.loadingMask.show();
    },
    
    hideMask: function(){
        this.loadingMask.hide();
    },
            
    getApplicationTitle: function(){
        return this.applicationTitle;
    },
    
    getCompanyName: function(){
        return this.companyName;
    },
            
    getModelName: function(entityName){
        return Ext.String.format('sisprod.model.{0}Model', entityName);
    },
    
    getControllerName: function(entityName){
        return Ext.String.format('sisprod.controller.{0}Controller', entityName);
    },
    
    getStoreName: function(entityName){
        return Ext.String.format('sisprod.store.{0}Store', entityName);
    },
    
    getResourcesFolder: function(){
        return global.resources.baseUrl+'/resources/images/';
    },
            
    getImagePath: function(fileName){
        return Ext.String.format(global.resources.baseUrl+'/resources/images/{0}', fileName);
    },
    
    onChangeEnvProductionPeriodDate: function(input, newValue, oldValue, eventOptions){
        var me = this;
        if(Ext.isDefined(newValue) && newValue !== null){
            Ext.BaseAjax.request({
//                url: 'rest/productionPeriod/findByDate.htm',
                url: 'rest/productionPeriod/changeSessionDate.htm',
                method: 'POST',
                params: { date: input.getRawValue() },
                success: function(response){
                    var responseData = Ext.decode(response.responseText);
                    if(!responseData.success) {
                        Ext.MessageBox.show({
                            title: me.applicationMessages.alertMessage,
                            msg: responseData.message,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                    me.refreshAllUsedInDailyReport();
                }
            });
        }
    },
    
    refreshAllUsedInDailyReport: function(){
        var items = Ext.getCmp('content-panel').query('tabPanelGridItem[usedInDailyReport=true]');
        Ext.Array.each(items, function(component, index, itself){
           if(Ext.isDefined(component) && component !== null){
               var gridPanel = component.getGridPanel();
               if(Ext.isDefined(gridPanel) && gridPanel !== null){
                   var store = gridPanel.getStore();
                    if(Ext.isDefined(gridPanel) && gridPanel !== null){
                        if(typeof(component.onChangeProductionPeriod) === 'function') component.onChangeProductionPeriod();
                        else store.reload();
                    }
               }
           }
        });
    },
        
    getOnlyKeysWithValue: function(object) {
        var newObject = {};
        Ext.Object.each(object, function(key, value, itself){
            if(Ext.isDefined(value) && value !== null) {
                if(!Ext.isEmpty(value)) newObject[key] = value;
            }
        });
        return newObject;
    },
            
    formatEnglishDate: function(dateParam){
        var me = this;
        var date;
        if(Ext.isString(dateParam)) date = Ext.Date.parse(dateParam, me.formats.sourceDateFormat);
        if(Ext.isDate(dateParam)) date = dateParam;
        return Ext.util.Format.date(date, me.formats.targetDateFormat);
    },
    
    formatSpanishDate: function(dateParam){
        var me = this;
        var date;
        if(Ext.isString(dateParam)) date = Ext.Date.parse(dateParam, me.formats.targetDateFormat);
        if(Ext.isDate(dateParam)) date = dateParam;
        return Ext.util.Format.date(date, me.formats.sourceDateFormat);
    },
  
    parseDate: function(strDate){
        var me = this;
        return Ext.Date.parse(strDate, me.formats.sourceDateFormat);
    },
            
    verifyDailyReportTabItems: function(){
        var items = Ext.getCmp('content-panel').query('tabPanelGridItem[usedInDailyReport=true]');
        var envProductionPeriodDate = Ext.getCmp('envProductionPeriodDate');
        if(items.length > 0) envProductionPeriodDate.show();
        else envProductionPeriodDate.hide();
    },
            
    startAutoUpdateListTaskRunner: function(){
        var me = this;
        var active = Ext.util.Cookies.get('PAndPAutoUpdatingActive');
        if(!Ext.isDefined(active) || active === null) active = false;
        var interval = parseInt(Ext.util.Cookies.get('PAndPAutoUpdatingInterval')) * 60000;
        if(!Ext.isDefined(interval) || interval === null){
            if(active) interval = 60000;
        }
        active = /^true$/i.test(active);
        //
        if(active){
            if(!Ext.isDefined(me.updateListTaskRunner) || me.updateListTaskRunner === null){
                me.updateListTaskRunner = new Ext.util.TaskRunner();
            } else me.updateListTaskRunner.stopAll();
            me.updateListTaskRunner.start({
                run: me.refreshAllUsedInPAndP,
                interval: interval
            });
        }
    },
            
    stopAutoUpdateListTaskRunner: function(){
        var me = this;
        var task = me.updateListTaskRunner;
        if(Ext.isDefined(task) && task !== null){
            task.stopAll();
        }
    },
    
    refreshAllUsedInPAndP: function(){
        var activeTabItem = Ext.getCmp('content-panel').getActiveTab();
        if(Ext.isDefined(activeTabItem) && activeTabItem !== null){
            var usedInPAndP = activeTabItem.usedInPAndP;
            if(Ext.isDefined(usedInPAndP) && usedInPAndP !== null && usedInPAndP === true){
                var gridPanel = activeTabItem.getGridPanel();
                if(Ext.isDefined(gridPanel) && gridPanel !== null){
                    var store = gridPanel.getStore();
                     if(Ext.isDefined(gridPanel) && gridPanel !== null){
                         if(!store.isLoading()) store.reload();
                     }
                }
            }
        }
//        var items = Ext.getCmp('content-panel').query('tabPanelGridItem[usedInPAndP=true]');
//        Ext.Array.each(items, function(component, index, itself){
//           if(Ext.isDefined(component) && component !== null){
//               var gridPanel = component.getGridPanel();
//               if(Ext.isDefined(gridPanel) && gridPanel !== null){
//                   var store = gridPanel.getStore();
//                    if(Ext.isDefined(gridPanel) && gridPanel !== null){
//                        if(!store.isLoading()) store.reload();
//                    }
//               }
//           }
//        });
    },
            
    decodeUTF8: function(str_data){
        var tmp_arr = [],
          i = 0,
          ac = 0,
          c1 = 0,
          c2 = 0,
          c3 = 0,
          c4 = 0;

        str_data += '';

        while (i < str_data.length) {
          c1 = str_data.charCodeAt(i);
          if (c1 <= 191) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
          } else if (c1 <= 223) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
          } else if (c1 <= 239) {
            // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
          } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            c4 = str_data.charCodeAt(i + 3);
            c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
            c1 -= 0x10000;
            tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1>>10) & 0x3FF));
            tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
            i += 4;
          }
        }

        return tmp_arr.join('');
    }
});
