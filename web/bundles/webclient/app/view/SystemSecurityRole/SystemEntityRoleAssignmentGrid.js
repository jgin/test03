Ext.define('sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentGrid',{
    extend: 'Ext.grid.Panel',
    
    collapsible: true,
    
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    
    id: 'systemEntityRoleAssignmentGrid',
    
//    store: Ext.StoreManager.lookup('systemEntityRoleAssignmentStore'),
    store: Ext.create('sisprod.store.SystemEntityRoleAssignmentGridStore'),
    
    height: "100%",
    
    iconCls: 'entity',
    
    autoScroll:true,
    
    title: 'Entity Roles',
    messages:{
        headers: {
            entityName: 'Entity',
            canList: 'List',
            canInsert: 'Insert',
            canUpdate: 'Update',
            canDelete: 'Delete',
            canExport: 'Export'
        }
    },
    
    initComponent: function(){
        var me = this;
        //Checkbox Editor
        var checkBoxEditor = {
            xtype: 'checkbox'
        };
        //Renderer
        var renderer = function(value, metaData, record, rowIndex, colIndex, store, view){
            if(value) metaData.tdCls = 'checked';
            return '';
        };
        //
        me.columns= [
            {
                text: me.messages.headers.entityName,
                dataIndex: 'entityName',
                flex: 4
            },
            {
                text: me.messages.headers.canList,
                dataIndex: 'listRoleGranted',
                flex: 1,
                editor: checkBoxEditor,
                renderer: renderer
            },
            {
                text: me.messages.headers.canInsert,
                dataIndex: 'createRoleGranted',
                flex: 1,
                editor: checkBoxEditor,
                renderer: renderer
            },
            {
                text: me.messages.headers.canUpdate,
                dataIndex: 'updateRoleGranted',
                flex: 1,
                editor: checkBoxEditor,
                renderer: renderer
            },
            {
                text: me.messages.headers.canDelete,
                dataIndex: 'deleteRoleGranted',
                flex: 1,
                editor: checkBoxEditor,
                renderer: renderer
            },
            {
                text: me.messages.headers.canExport,
                dataIndex: 'exportRoleGranted',
                flex: 1,
                editor: checkBoxEditor,
                renderer: renderer
            }        
        ];
        // Row Editor
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            clicksToMoveEditor: 1,
            autoCancel: false,
            errorSummary: true
        });
//        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
//            clicksToEdit: 1
//        });
        me.plugins = [rowEditing];
//        me.plugins = [cellEditing];
        //
//        me.selModel = Ext.create('Ext.selection.CheckboxModel',{
//            checkOnly: true,
//            mode: 'SIMPLE',
//            listeners: {
//                'select': function(selectionModel, record, index, eventOptions){
//                    record.set('listRoleGranted', true);
//                    record.set('createRoleGranted', true);
//                    record.set('updateRoleGranted', true);
//                    record.set('deleteRoleGranted', true);
//                    record.set('exportRoleGranted', true);
//                },
//                'deselect': function(selectionModel, record, index, eventOptions){
//                    record.set('listRoleGranted', false);
//                    record.set('createRoleGranted', false);
//                    record.set('updateRoleGranted', false);
//                    record.set('deleteRoleGranted', false);
//                    record.set('exportRoleGranted', false);
//                }
//            }
//        });
        //
        me.store.removeAll();
        me.callParent(arguments);
    }
});

