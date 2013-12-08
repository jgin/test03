/* 
 * Base Controller
 */
Ext.define('sisprod.controller.Base', {
    extend: 'Ext.app.Controller',
    entityName: '',
    checkOutPermissions: true,
    
    controllerMessages: {
        updateText: 'Updating',
        deleteText: 'Deleting',
        activateText: 'Activating',
        selectRecordMessage: 'First, select a record please...',
        deleteRecorConfirmationMessage: 'Are you sure you want to delete {0}?',
        alertMessage: 'Message',
        confirmText: 'Confirm Operation',
        activateRecordConfirmationMessage: 'Are you sure to activate {0}'
    },
    
    deleteOptions: {
        deleteKeys: undefined,//array of keys
        caption: undefined//string or function
    },
    
    autoMappingFunction: {},
    
            
//    onItemContextMenu: function(view, record, item, index, event, options){
//        var me = this;
//        var grid = me.getGridForEntity();
//        if(grid===null) return;
//        grid.getSelectionModel().select(index);
//        if(!grid.baseGridContextMenu){
//            grid.baseGridContextMenu = Ext.create('sisprod.view.base.BaseGridContextMenu',
//            {
//                permissions: grid.baseGridOptions,
//                controller: me,
//                functions: {
//                    onAdd: function(){me.showAdd.apply(me);},
//                    onUpdate: function(){me.showUpdate.apply(me,[grid, record]);},
//                    onDelete: function(){me.destroy.apply(me);}
//                }
//            });
//        }
//        grid.baseGridContextMenu.showAt(event.getX(), event.getY());
//        event.preventDefault();
//    },        
    
    /*
     * muestra el formulario de registro
     */
    showAdd: function (button, event, options, singleAddition){
        var me = this;
        var single = Ext.isDefined(singleAddition)?singleAddition:false;
        var form = Ext.create('sisprod.view.'+ this.entityName + '.Add' + this.entityName,{
            singleAddition: single,
            controller: me
        });
        form.show();
    },

    /*
     * muestra el formulario de modificacion, con los datos
     */
    showUpdate: function(grid, record){
        var chkInactive = Ext.getCmp('chk' + this.entityName);
        if(Ext.isDefined(chkInactive) && chkInactive.getValue()) return;
        var me = this;
        if(Ext.isDefined(record)){
            if(this.beforeShowUpdate(grid, record)){
                var window = Ext.create('sisprod.view.'+ this.entityName + '.Update' + this.entityName, {
                    controller: me,
                    record: record
                });
                if(Ext.isDefined(me.autoMappingFunction) && typeof(me.autoMappingFunction)==='function'){
                    me.autoMappingFunction.apply(me, [grid, window, record]);
                }
                else{
                    window.down('form').loadRecord(record);
                }
                if(window.isHidden) window.show();
            }
        }
        else Ext.Msg.alert(me.controllerMessages.updateText, me.controllerMessages.selectRecordMessage);
    },
    
    showUpdateOnButton: function(button, event){
        var grid = this.getGridForEntity();
        if(grid === undefined || grid === null){
            Ext.Error.raise('There´s no grid for this view. Redefined getGridForEntity for ' + this.$className +'!');
            return;
        }
    	var record = grid.getSelectionModel().getSelection()[0];
        this.showUpdate(grid, record);
    },
            
    /*
     * Elimina un registro 
     */        
    destroy: function(button){
        var me = this;
        var grid = me.getGridForEntity();
        
        if(grid === undefined || grid === null) return;
        
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
    	var record = selection.raw;
        var store = this.getStore(sisprod.getApplication().getStoreName(this.entityName));
        //
        var caption = '';
        if(Ext.isDefined(me.deleteOptions.caption)){
            if(typeof(me.deleteOptions.caption)==='function') caption = me.deleteOptions.caption(record);
            else{
                var value = me.searchInRecord(record, me.deleteOptions.caption);
                caption = value;
            }
        }
        else{
            Ext.Error.raise('No caption declared in ' + me.$className +' to show at delete option!');
            return;
        }
        //
        var values = {};
        if(!Ext.isDefined(me.deleteOptions.deleteKeys)){
            Ext.Error.raise('No deleteOptions{deleteKeys} attribute declared in ' + me.$className +'!');
            return;
        }
        var deleteKeys = me.deleteOptions.deleteKeys;
        for(var i = 0; i<deleteKeys.length; i++){
            var key = deleteKeys[i];
            values[key] = me.searchInRecord(record, key);
        }
        Ext.Msg.show({
            title: me.controllerMessages.deleteText,
            msg: Ext.String.format(me.controllerMessages.deleteRecorConfirmationMessage, caption),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button){
                if(button==="yes"){
                    var urlDestroy;
                    if(Ext.isDefined(store.proxy) && Ext.isDefined(store.proxy.api) &&
                            Ext.isDefined(store.proxy.api.destroy)){
                        urlDestroy = store.proxy.api.destroy;
                        //
                        Ext.BaseAjax.request({
                            url: urlDestroy,
                            method: "POST",
                            params: values,
                            success: function(response){
                                var objResponse = Ext.decode(response.responseText);
                                if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                    if(Ext.isDefined(store) && store !== null) store.reload();
                                    var selectionModel = me.getGridForEntity().getSelectionModel();
                                    selectionModel.deselectAll();
                                }
                                else{
                                    Ext.MessageBox.show({
                                        title: me.controllerMessages.alertMessage,
                                        msg: objResponse.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                }
                            }
                        });
                    }
                    else Ext.Error.raise('No proxy{api:{destroy}} attribute declared in ' + me.store.$className +'!');
                }
            }
        });
    },
    
    /*
     * Función que guarda los datos ingresados,
     * sirve para registrar y  moifica
     * @param button 
     */
    saveEntity: function(button){
        var me = this;
        var window = button.up('window');
        var form = window.down('form');
        var singleAddition = Ext.isDefined(window.singleAddition)?window.singleAddition:false;
//        if(!form.isValid() || !me.extraValid()) return;
        if(!form.isValid()) return;
        
        var values= form.getValues();
        var store = me.getStore(sisprod.getApplication().getStoreName(me.entityName));
        var model = me.getModel(sisprod.getApplication().getModelName(me.entityName));
        var idProperty;
        if(Ext.isDefined(model.prototype) && Ext.isDefined(model.prototype.idProperty)){
            idProperty = model.prototype.idProperty;
        } else{
            Ext.Error.raise('No idProperty attribute declared in ' + model.$className +'!');
            return;
        }
        var url;
        var idPropertyInput = form.down(Ext.String.format("#{0}", idProperty));
        var idProperyValue = values[idProperty];
        //
        if(((Ext.isDefined(idProperyValue) && idProperyValue !== null) || (Ext.isDefined(idPropertyInput) && idPropertyInput !== null))
            && (values[idProperty] > 0 || idPropertyInput.getValue() > 0) ){
            url = store.proxy.api.update;
            if(!Ext.isDefined(url)){
                Ext.Error.raise('No proxy:{api:{update}} attribute declared in ' + store.$className +'!');
                return;
            }
        }
        else{
            url = store.proxy.api.create;
            if(!Ext.isDefined(url)){
                Ext.Error.raise('No proxy:{api:{create}} attribute declared in ' + store.$className +'!');
                return;
            }
        }
        var jsonData = {};
        if(!this.beforeSaveEntity(window, form, values, jsonData)) return;
        
        Ext.BaseAjax.request({
            url: url,
            method: "POST",
            params: values,
            success: function(response, options){
                if(me.afterReceivingResponse(window, form, response, options)){
                    me.afterSaveEntity(window, form, response, options);
                    store.reload();
                    if(!singleAddition){
                        var selectionModel = me.getGridForEntity().getSelectionModel();
                        selectionModel.deselectAll();
    //                    me.afterSaveEntity(window, form, response, options);
                    }
                }
            },
            failure: function(response, options){
            }
        });
    },   
    
    showPrint: function(button, event, options){
        var me = this;
        var grid = this.getGridForEntity();
        var columns = new Array();
        Ext.each(grid.columns, function(column, index){
            if(Ext.isDefined(column.dataIndex) && column.dataIndex!==null && column.dataIndex!==""){
                if(!Ext.isDefined(column.excludeForExport) || !column.excludeForExport){
                    if(!column.isHidden()) columns.push({
                        name: column.dataIndex,
                        text: column.text,
                        align: column.align
                    });
                }
            }
        });
        var store = grid.getStore();
        var sortersFeatures = store.getSorters();
        var proxy = store.getProxy();
        var sorters;
        if(sortersFeatures.length>0) sorters = proxy.encodeSorters(sortersFeatures);
        var filtersFeature = grid.filters;
        var filters = filtersFeature.buildQuery(filtersFeature.getFilterData()).filter;
//        if(!Ext.isDefined(filters) && filters !== null) filters = '[]';
        var printWindow = Ext.create('sisprod.view.base.ExportDataWindow', {
            controller: me,
            formData: {
                url: Ext.String.format('export/{0}.htm', this.entityName),
                fields: JSON.stringify(columns),
                filters: filters,
                sorters: sorters,
                pageSize: store.pageSize
            }
        });
        printWindow.show();
    },
    
    onPrint: function(button, event, options){
        var form = button.up('form');
        var window = form.up('window');
        if(form.isValid()){
            form.submit({
                params: {
                    reportFormat : "xls"
                },
                target: '_blank'
            });
        }
    },
    
    /*
     * retorna la grilla donde se muestran los registros,
     * debe implementarse en la subclases 
     */
    getGridForEntity: function(){
        return null;
    },
    
    beforeSaveEntity: function(){
        return true;
    },
    
    afterSaveEntity: function(window, form, response, options){
        window.close();
        return true;
    },
            
    afterReceivingResponse: function(window, form, response, options){
        var objResponse = Ext.decode(response.responseText);
        if(objResponse.success == false){
            showAlertMessage(objResponse.message);
        }
        return objResponse.success;
    },
            
            
    searchInRecord: function(record, searchKey){
        var returnValue;
        if((Ext.isDefined(record) && record===null)||(Ext.isDefined(searchKey) && searchKey===null)) return returnValue; 
        returnValue = record[searchKey];
        if(Ext.isDefined(returnValue) && returnValue!==null) return returnValue;
        //
        Ext.Object.each(record, function(key, value, myself){
            if(Ext.isObject(value)){
                Ext.Object.each(value, function(skey, svalue, smyself){
                    if(skey==searchKey){
                        returnValue = svalue;
                        return false;
                    }
                });
                if(returnValue!==null) return false;//breaks each function callback
            }
            else{
                if(key==searchKey){
                    returnValue = value;
                    return false;
                }
            }
        });
        return returnValue;
    },
    
    setDataInForm: function(form, data){
        if(Ext.isObject(data)){
            Ext.Object.each(data, function(key, value, myself){
                var input;
                var queryResult = form.query('[name='+key+']');
                if(queryResult.length>0) input = queryResult[0];
                if(!Ext.isDefined(input) && input===null) input = form.queryById(key);
                if(Ext.isDefined(input) && input!==null){
                    if(Ext.isDefined(input.setValue) && Ext.typeOf(input.setValue)==='function'){
                        input.setValue(value);
                    }
                }
            });
        }
    },
            
    showSingleAdditonWindow: function(entityName){
        var controllerName = sisprod.getApplication().getControllerName(entityName);
        var controller = this.application.getController(controllerName);
        if(Ext.isDefined(controller) && controller!==null)
            controller.showAdd(null, null, null, true);
    },
      
    getController: function(entityName){
        var controllerName = sisprod.getApplication().getControllerName(entityName);
        var controller = this.application.getController(controllerName);
        return controller;
    },
            
    beforeShowInitialView: function(data, tabPanel, tabId){
        return true;
    },
    
    showCheckingOutPermissions: function(data, tabPanel, tabId, tabOptions, initialViewName) {
        var me = this;
        if(me.checkOutPermissions){
            var parentEntityName = me.parentEntityName;
            var entityName = me.entityName;
            if(Ext.isDefined(parentEntityName) && parentEntityName !== null) entityName = parentEntityName;
            //
            Ext.BaseAjax.request({
               url: 'rest/systemSecurityRole/getGrantedEntityRoles.htm',
               method: 'GET',
               params: { entityName: entityName },
               success: function(response){
                   var responseData = Ext.decode(response.responseText);
                   if(responseData.success) {
                       var data = responseData.data;
                        var defaultPermissions = {
                            baseGridOptions: {
                                allowAdd: data['create']['checked'],
                                allowUpdate: data['update']['checked'],
                                allowDelete: data['delete']['checked'],
                                allowPrint: data['export']['checked']
                            }
                        };
                        tabOptions['defaultPermissions'] = defaultPermissions;
                        me.createInitialView(data, tabPanel, tabId, tabOptions, initialViewName);
                   }
               }
            });
        } else me.createInitialView(data, tabPanel, tabId, tabOptions, initialViewName);
    },
    
    createInitialView: function(data, tabPanel, tabId, tabOptions, initialViewName){
        var tab = Ext.create(initialViewName, tabOptions);
        tabPanel.add(tab);
        tabPanel.setActiveTab(tab);
    },
            
    activate: function(){
        var me = this;
        var grid = me.getGridForEntity();
        
        if(grid === undefined || grid === null) return;
        
        var selection = grid.getSelectionModel().getSelection()[0];
        if(!Ext.isDefined(selection)){
            Ext.Msg.alert(me.controllerMessages.alertMessage, me.controllerMessages.selectRecordMessage);
            return;
        }
    	var record = selection.raw;
        var store = this.getStore(sisprod.getApplication().getStoreName(this.entityName));
        //
        var caption = '';
        if(Ext.isDefined(me.deleteOptions.caption)){
            if(typeof(me.deleteOptions.caption)==='function') caption = me.deleteOptions.caption(record);
            else caption = record[me.deleteOptions.caption];
        }
        else{
            Ext.Error.raise('No caption declared in ' + me.$className +' to show at delete option!');
            return;
        }
        //
        var values = {};
        if(!Ext.isDefined(me.deleteOptions.deleteKeys)){
            Ext.Error.raise('No deleteOptions{deleteKeys} attribute declared in ' + me.$className +'!');
            return;
        }
        var deleteKeys = me.deleteOptions.deleteKeys;
        for(var i = 0; i<deleteKeys.length; i++){
            var key = deleteKeys[i];
            values[key] = me.searchInRecord(record, key);
        }
        Ext.Msg.show({
            title: me.controllerMessages.activateText,
            msg: Ext.String.format(me.controllerMessages.activateRecordConfirmationMessage, caption),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(button){
                if(button==="yes"){
                    var urlActivate;
                    if(Ext.isDefined(store.proxy) && Ext.isDefined(store.proxy.api) &&
                            Ext.isDefined(store.proxy.api.activate)){
                        urlActivate = store.proxy.api.activate;
                        //
                        Ext.BaseAjax.request({
                            url: urlActivate,
                            method: "POST",
                            params: values,
                            success: function(response){
                                var objResponse = Ext.decode(response.responseText);
                                if(Ext.isDefined(objResponse.success) && objResponse.success === true){
                                    if(Ext.isDefined(store) && store !== null) store.reload();
                                    var selectionModel = me.getGridForEntity().getSelectionModel();
                                    selectionModel.deselectAll();
                                }
                                else{
                                    Ext.MessageBox.show({
                                        title: me.controllerMessages.alertMessage,
                                        msg: objResponse.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.Msg.INFO
                                    });
                                }
                            }
                        });
                    }
                    else Ext.Error.raise('No proxy{api:{activate}} attribute declared in ' + me.store.$className +'!');
                }
            }
        });
    },
    
    beforeShowUpdate: function(grid, record){
        var me = this;
        return true;
    }
});

