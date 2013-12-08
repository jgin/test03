/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('sisprod.view.base.BaseGridPanel', {
    extend: 'Ext.grid.Panel',
    require: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.ux.PagingToolbarResizer',
        'sisprod.view.base.BasePageToolBar',
        'Ext.grid.column.Column',
        'Ext.grid.column.Date',
        'Ext.grid.column.Number',
        'Ext.grid.column.Template',
        'Ext.grid.column.Boolean',
        'Ext.grid.plugin.RowEditing'
    ],
    xtype: 'baseGridPanel',
//    id: 'base-grid-panel',
    
    baseGridOptions: {
        allowAdd: true,
        allowUpdate: true,
        allowDelete: true,
        allowPrint: true,
        allowList: true
    },
    
    callBackFunction: {
        addCallBack: function(){},
        updateCallBack: function(){},
        deleteCallBack: function(){}
    },
    
    deleteOptions: {
        deleteKeys: [''],
        caption: ''
    },
    
    autoGenerationOptions: {
        autoGenerateColumns: false,
        columnOptions: {},
        autoCreateFilters: true
    },
            
    topBarButtons: [],
    showPagingToolbar: true,
            
    gridMessages: {
        buttonText: {
            addText: 'Add',
            updateText: 'Update',
            deleteText: 'Delete',
            printText: 'Print List',
            activeText: 'Active',
            importDataText: 'Import data'
        },
        pageText: {
            displayMsg: 'Showing records {0} - {1} de {2}',
            emptyMsg: 'No records to display'
        }
    },
    
    conversionFormats:{
        dateFormat: 'd-m-Y',
        integerFormat: '0',
        floatFormat: '0.00'
    },
    
//    editorOptions: {},
    
    pageOptions: [5, 10, 15, 20, 25],
    title: 'List',
    columns: [],
    layout: 'fit',
//    region: 'center',
//    height: 500,
//    width: 500,
    autoScroll: true,
    reloadAtShow: true,
    
    constructor: function(config){
        var me = this;
        Ext.apply(me, config);
        me.callParent(arguments);
    },
    
    initComponent: function() {
        var me = this;
        me.createTopBarButtons();
        if(me.showPagingToolbar) me.createPagingToolbar();
        me.autoGenerateColumns();
        me.createGridEditor();
        
//        var defaultFeatures = [filters];
//        var features;
//        if(me.features.length>0) features = Ext.Array.merge(defaultFeatures, me.features);
//        else features = defaultFeatures
//        me.features = features;
        
//        me.listeners = {
//            itemcontextmenu: function(grid, record, item, index, event, options){
//                grid.getSelectionModel().select(index);
//                if(!grid.rowCtxMenu){
//                    grid.rowCtxMenu = Ext.create('sisprod.view.base.BaseGridContextMenu',
//                    {
//                        permissions: me.baseGridOptions
//                    });
//                }
//                grid.rowCtxMenu.showAt(event.getXY());
//                event.preventDefault();
//            }
//        };
        me.on('afterrender', me.afterrender, me);
        this.callParent(arguments);
    },
            
    afterrender: function(){
        var me = this;
        me.createDefaultFilters();
        if(me.reloadAtShow){
            if(Ext.isDefined(me.store) && me.store !== null) me.store.loadPage(1);
        }
        me.hideFilters();
    },
            
    createDefaultFilters: function(){
        var me = this;
        var filtersFeature = me.filters;
        if(Ext.isDefined(me.defaultFilters) && me.defaultFilters !== null){
            Ext.Array.each(me.defaultFilters, function(filter, index, itself){
                filtersFeature.addFilter(filter);
                var createdFilter = filtersFeature.getFilter(filter.dataIndex);
                if(createdFilter.type === 'date'){
                    switch(createdFilter.type){
                        case 'date':
                            var dateValue = Ext.Date.parse(filter.data.value, me.conversionFormats.dateFormat),
                                value;
                            switch (filter.data.comparison) {
                                case 'gt' : value = {after: dateValue}; break;
                                case 'lt' : value = {before: dateValue}; break;
                                case 'eq' : value = {on: dateValue}; break;
                                default: value = {on: dateValue}; break;
                            }
                            createdFilter.setValue(value);
                            createdFilter.setActive(true);
                            //
                            me.reloadAtShow = false;
                            break;
                    }
                }
            });
        }
    },
            
    hideFilters: function(){
        var me = this;
        Ext.Array.each(me.hiddenFilters, function(columnName, index, itself){
            var column = me.down('gridcolumn[dataIndex='+columnName+']');
            if(column !== null) column.setVisible(false);
        });
    },
      
    createPagingToolbar: function(){
        var me = this;
        if (me.store !== undefined) {
            me.bbar = Ext.create('Ext.PagingToolbar', {
                store: me.store,
                entityName: me.entityName,
                displayInfo: true,
                showCheckInactive: me.showCheckInactive,
                displayMsg: me.gridMessages.pageText.displayMsg,
                emptyMsg: me.gridMessages.pageText.emptyMsg,
                plugins: [{
                    ptype: 'basePageToolBar',
                    options: me.pageOptions
                }]
            });
        }
    },

    createTopBarButtons: function(){
        var me = this;
        var tbar = [];
        if(!Ext.isObject(me.baseGridOptions)){
            var value = me.baseGridOptions;
            me.baseGridOptions = {
                allowAdd: value,
                allowUpdate: value,
                allowDelete: value,
                allowPrint: value
            };
        }
        //
        if (me.baseGridOptions.allowAdd) {
            tbar.push({
                xtype: 'button',
                iconCls: 'add',
                text: me.gridMessages.buttonText.addText,
                action: 'add',
                id: 'btnAdd' + me.entityName
            });
        }

        if (me.baseGridOptions.allowUpdate) {
            tbar.push({
                xtype: 'button',
                iconCls: 'edit',
                text: me.gridMessages.buttonText.updateText,
                action: 'update',
                id: 'btnEdit' + me.entityName
            });
        }

        
        if (me.baseGridOptions.allowDelete) {
            tbar.push({
                xtype: 'button',
                iconCls: 'remove',
                text: me.gridMessages.buttonText.deleteText,
                action: 'delete',
                id: 'btnRemove' + me.entityName
            });
        }
        
        if (me.baseGridOptions.allowDelete) {
            tbar.push({
                xtype: 'button',
                iconCls: 'accept',
                text: me.gridMessages.buttonText.activeText,
                action: 'activate',
                hidden: true,
                id: 'btnActive' + me.entityName
            });
        }
        
        if (me.baseGridOptions.allowPrint) {
            tbar.push({
                xtype: 'button',
                iconCls: 'print',
                text: me.gridMessages.buttonText.printText,
                action: 'print'
            });
        }
        

        var customButtons = me.topBarButtons;
        if(Ext.isDefined(customButtons) && customButtons!==null){
            var merged = Ext.Array.union(tbar, customButtons);
        }
        me.tbar = merged;
    },
            
    autoGenerateColumns: function(){
        var me = this;
        //
        var autoGenerationOptions = {
            autoGenerateColumns: false,
            columnOptions: {},
            autoCreateFilters: true
        };
        me.autoGenerationOptions = Ext.Object.merge(autoGenerationOptions, me.autoGenerationOptions);
        // Columns Auto-generation
        var noModel = Ext.isDefined(me.autoGenerationOptions.model) === false,
            noAutoGenerate = Ext.isDefined(me.autoGenerationOptions.autoGenerateColumns) === false;
        //
        if (noModel || noAutoGenerate) return;
        if (!me.autoGenerationOptions.autoGenerateColumns) return;
        var model;
        if (Ext.isString(me.autoGenerationOptions.model)){
            model = Ext.ModelManager.getModel(me.autoGenerationOptions.model);
            if(typeof(model)==='undefined' || model === null){
                Ext.create(me.autoGenerationOptions.model);
                model = Ext.ModelManager.getModel(me.autoGenerationOptions.model);
            }
        }
        //
        if(model.prototype===undefined) return;
        var modelFields = model.prototype.fields;
        //
        var generatedColumns = new Array();
        generatedColumns.push({xtype: 'rownumberer'});
        //
        var visibleCounter = 0;
        for (var i = 0; i < modelFields.length; i++) {
            var modelField = modelFields.items[i];
            var isVisible = (Ext.isDefined(modelField.visible) && modelField.visible === true);
            if(isVisible) visibleCounter++;
            //
            var column;
            var isTemplate = false;
            if(Ext.isDefined(modelField.tpl) && modelField.tpl!==null) isTemplate = true;
            if(!isTemplate){
                column = {
                    xtype: me.getColumnXType(modelField.type.type),
                    header: modelField.name,
                    dataIndex: modelField.name,
                    flex: 1,
                    hidden: !isVisible,
                    renderer: me.getColumnRenderer(modelField.type.type)
                };
                if(me.autoGenerationOptions.autoCreateFilters) column.filter = {type: me.getColumnFilter(modelField.type.type)};
            }
            else{
                column = {
                    xtype: me.getColumnXType("template"),
                    header: modelField.name,
                    dataIndex: modelField.name,
                    flex: 1,
                    hidden: !isVisible,
                    tpl: modelField.tpl
                };
                if(me.autoGenerationOptions.autoCreateFilters) column.filter = {type: me.getColumnFilter(modelField.type.type)};
            }
            if(modelField.type.type==='boolean'||modelField.type.type==='bool'){
                column.trueText = "Yes";
                column.falseText = "No";
            }
            //
            var customcolumnOptions = me.autoGenerationOptions.columnOptions[modelField.name];
            var columnMerged = {};
            if(Ext.isDefined(customcolumnOptions) && customcolumnOptions!==null)
                columnMerged = Ext.Object.merge(column, customcolumnOptions);
            else columnMerged = column;
//            me.columns.push(column);
            generatedColumns.push(columnMerged);
        }
        me.columns = generatedColumns;
        
        if (visibleCounter === 0)
            Ext.Error.raise('No fields declared in ' + model.$className + ' with property visible set to true. Columns will not be displayed!');
        if (me.columns.length === 0)
            Ext.Error.raise('No fields declared in ' + model.$className + '. Columns will not be created!');
        
        var filters = {
            ftype: 'filters',
            // encode and local configuration options defined previously for easier reuse
            encode: true, // json encode the filter query
            local: false   // defaults to false (remote filtering)

            // Filters are most naturally placed in the column definition, but can also be
            // added here.
//            filters: [
//                {
//                    type: 'boolean',
//                    dataIndex: 'visible'
//                }
//            ]
        };
        if(me.autoGenerationOptions.autoCreateFilters){
            if(!Ext.isDefined(me.features) || me.features.length===0){
                me.features = new Array();
            }
            me.features.push(filters);
        }
    },
            
    getColumnXType: function(type){
        if(type!==null){
            switch(type){
                case "string": return "gridcolumn"; break;
                case "date": return "datecolumn"; break;
                case "int": return "numbercolumn"; break;
                case "float": return "numbercolumn"; break;
                case "bool": return "booleancolumn"; break;
                case "template": return "templatecolumn"; break;
                default: return "gridcolumn"; break;
            } 
        }
        return 'gridcolumn';
    },
    
    getColumnRenderer: function(type){
        var me = this;
        var renderFunction = function(value, metaData, record, rowIndex, colIndex, store, view){
            switch(type){
                case "string":
//                    return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value));
                    return Ext.util.Format.htmlEncode(value);
                    break;
                case "date": return Ext.util.Format.date(value, me.conversionFormats.dateFormat); break;
                case "int": 
//                    return Ext.util.Format.numberRender;
                    return Ext.util.Format.number(value, me.conversionFormats.integerFormat); break;
                case "float": return Ext.util.Format.number(value, me.conversionFormats.floatFormat); break;
                case "bool": if(value) metaData.tdCls = 'checked'; return ''; break;
                default: return Ext.util.Format.htmlEncode(Ext.util.Format.uppercase(value)); break;
            }
        };
        return renderFunction;
    },
    
    getColumnFilter: function(type){
        if(type!==null){
            switch(type){
                case "string": return "string"; break;
                case "date": return "date"; break;
                case "int": return "numeric"; break;
                case "float": return "numeric"; break;
                case "bool": return "boolean"; break;
                default: return "string"; break;
            }
        }
    },
            
    createGridEditor: function(){
        var me = this;
        if(Ext.isDefined(me.editorOptions) && me.editorOptions !== null) {
            var defaultEditorOptions = {
                clicksToMoveEditor: 2,
                autoCancel: false,
                errorSummary: true
            };
            me.editorOptions = Ext.Object.merge(defaultEditorOptions, me.editorOptions);
            var rowEditor = Ext.create('Ext.grid.plugin.RowEditing', me.editorOptions);
            me.plugins = [rowEditor];
        }
    }
});