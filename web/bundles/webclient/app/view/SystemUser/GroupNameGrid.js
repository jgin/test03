/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('sisprod.view.SystemUser.GroupNameGrid',{
    extend: 'Ext.grid.Panel',
    messages:{
        msgTitle: 'Group',
        msgGroupName: 'Name'
    },
    constructor: function(config){
            var me = this;
            me.callParent([config]);
    },
    id: 'groupNameGrid',
    store:null,
    height: 120,
    autoScroll:true,
    forceFit:true,
    initComponent: function(){
        var me = this;
        me.columns= [
            {
                text: 'Id',
                dataIndex: 'idSystemUser',
                hidden:true,
                flex:1
            },
            {
                height: 120,
                title: me.messages.msgTitle,
                xtype: 'gridpanel',
                id: 'gridSystemUserGroupSelector',
                store: Ext.create('sisprod.store.SystemUserGroupAll').load({
                    callback : function(record, options, success) {
                        var idUser = me.record.data['id'];
                        me.controller.getSystemUserGroupMember.apply(me.controller, [idUser]);
                    }
                }),
                collapsible: true,
                frame: true,
                autoScroll: true,
                name: 'gridSystemUserGroupSelector',
                selModel: me.selectorModel,
                columns: [
                    {
                        text: 'id',
                        dataIndex: 'id',
                        flex: 1,
                        hidden:true
                    },
                    {
                        text: me.messages.formFields.msgGroupName,
                        dataIndex: 'groupName',
                        flex: 2
                    }
                ]
            }
        ];
    me.callParent(arguments);
    }
});


