/* 
 * Funcionalidad extra
 */
function synchronousRequest(url, method){
    var request = ((window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
    request.open("GET", url, false);
    request.send(null);
    return request;
}

function showAlertMessage(message){
    Ext.MessageBox.show({
        title: "Mensaje",
        msg: message,
        buttons: Ext.MessageBox.OK,
        icon: Ext.Msg.INFO
    });
}

function getDaysInMonthOfYear(month, year){
    var auxDate = new Date(year || new Date().getFullYear(), month, 0);
    return auxDate.getDate();
}

function getStartDateInMonth(month, year){
    var date = new Date(year || new Date().getFullYear(), month - 1, 1);
    return Ext.util.Format.date(date, 'd-m-Y');
}

function getEndDateInMonth(month, year){
    var date = new Date(year || new Date().getFullYear(), month, 0);
    return Ext.util.Format.date(date, 'd-m-Y');
}


function getStringDate(day, month, year){
    var numberDays = getDaysInMonthOfYear(month, year || new Date().getFullYear());
    if(numberDays == day) day = 0;
    else month = month - 1;
    var date = new Date(year || new Date().getFullYear(), month, day);
    return Ext.util.Format.date(date, 'Y-m-d');
}

function getAcronymDay(date){
    var acronym = '';
    var acronymDay = [ 'D', 'L', 'M', 'M', 'J', 'V', 'S'];
    if(date != undefined && date != ''){
        var weekDay = date.getDay();
        acronym = acronymDay[weekDay];
    }
    return acronym;
}
               
function getMonthName(month){
    var name = '';
    var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre',  'Noviembre', 'Diciembre'];
    if(month != null && month != undefined && month != ''){
        name = months[month - 1];
    }
    return name;
}     

function showConfirmationMessage(title, message, execFunction){
    var result = false;
    Ext.Msg.show({
        title: title,
        msg: message,
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: execFunction
    });
}

function getStoreFields(store){
    return store.model.getFields();
}

function getTypeColumnFieldStore(store, fieldName){
    var returnValue = undefined;
    var fields = new Array();
    fields = getStoreFields(store);
    
    for(var i = 0; fields.length; i++){
        if(fields[i].name == fieldName){
            returnValue = fields[i].type.type;
            break;
        }
    };
    return returnValue;
}

function generatedFormItems(configParams, labelWidth){
    var storeList = {};
    return generatedItems(configParams, 170, storeList);
}

function generatedItems(configParams, labelWidth, storeList){
    for (var i = 0; i < configParams.length; i++){
        configParams[i].labelWidth = labelWidth;
        if(configParams[i].xtype === 'fieldset'){
            generatedItems(configParams[i].items, labelWidth, storeList)
        } else {
            if(configParams[i].xtype === 'combobox'){
                if(storeList[configParams[i].storeName] == undefined){
                    var varStore = Ext.create('sisprod.store.' + configParams[i].storeName);
                    //var response = Ext.decode(synchronousRequest("rest/workRequestStatus/listAll.htm", "GET").responseText);
                    //varStore.loadData(response.data, false);
                    varStore.loadData(configParams[i].store, false);
                    storeList[configParams[i].storeName] = varStore;                    
                }
                configParams[i].store = storeList[configParams[i].storeName];
                /**
                 * Para Combos de seleccion multiple
                 */
                if(configParams[i].multiSelect && configParams[i].value != null &&  configParams[i].value != ''){
                    var values = configParams[i].value.split(configParams[i].multiSelectSeparator);
                    if(getTypeColumnFieldStore(configParams[i].store, configParams[i].valueField) == Ext.data.Types.INT.type){
                        for(var a = 0; a < values.length; a++){
                            values[a] = parseFloat(values[a]);
                        }
                    }
                    configParams[i].value = values;
                }
            }
            if(configParams[i].xtype === 'sensitivecombo'){
                configParams[i].store = Ext.create('sisprod.store.' + configParams[i].storeName);
                configParams[i].displayTpl = Ext.create('Ext.XTemplate',
                    '<tpl for=".">',configParams[i].displayTpl,'</tpl>');
                configParams[i].stringlistConfig = configParams[i].listConfig,
                configParams[i].listConfig = {
                        getInnerTpl: function() {
                            return this.pickerField.stringlistConfig;                            
                        }
                    };
                var modelObject = {};
                modelObject[configParams[i].valueField] = configParams[i].value;
                modelObject[configParams[i].displayField] = configParams[i].displayFieldValue;
                configParams[i].value = new Ext.create(configParams[i].store.model.getName(), modelObject);
            }
        }
    }
    return configParams;
}
