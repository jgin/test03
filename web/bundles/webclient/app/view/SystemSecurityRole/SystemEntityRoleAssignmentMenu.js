Ext.define('sisprod.view.SystemSecurityRole.SystemEntityRoleAssignmentMenu',{
    extend: 'Ext.tree.Panel',
    requires:[
        'Ext.tree.Panel'
    ],
    autoScroll: true,
    rootVisible: false,
    
    id: 'systemEntityRoleAssignmentMenu',
//    store: Ext.create('sisprod.store.SystemEntityRoleAssignmentMenuStore'),
    height: "100%",
    
    iconCls: 'menu',
    
    title: 'Menu Permissions',
    
//    constructor: function(config){
//        var me = this;
//        me.callParent([config]);
//    },
    
    initComponent: function(){
        var me = this;
//        
//        me.store = store;
//        me.selModel = Ext.create('Ext.selection.CheckboxModel');
        //
        //
        me.on('checkchange', me.onCheckChange, me);
        //
        me.callParent(arguments);
        //
//        var store = Ext.create('sisprod.store.SystemEntityRoleAssignmentMenuStore').load({
//            callback: function(record, options){
//                me.setRootNode(store.getRootNode());
//            }
//        });
    },
            
    onCheckChange: function(node, checked, options){
//        node.parentNode.cascadeBy(function(n){n.set('checked', checked);});
        node.cascadeBy(function(n) {
            n.set('checked', checked);
        });
    }
});

