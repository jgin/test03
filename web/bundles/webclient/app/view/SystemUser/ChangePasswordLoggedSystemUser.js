Ext.define('sisprod.view.SystemUser.ChangePasswordLoggedSystemUser', {
    extend: 'sisprod.view.base.TabPanelItem',
    alias: 'widget.changePasswordLoggedSystemUser',
    require: [
        'sisprod.view.base.BaseDataWindow'
    ],
    closable: true,
    layout:{
        type: 'vbox',
        align: 'center'
    },
    padding: '50 0 0 0',
    initComponent: function(){
       var me = this;
       
       me.items = new Array();
       
       var form = Ext.create('Ext.form.Panel', {
//           title: 'Reporte',
           frame: true,
           width:400,
           layout:'anchor',
           defaults: {
                labelWidth: 200,
                anchor:'100%',
                xtype:'textfield',
                inputType: 'password'
           },
           items:[
                {
                    fieldLabel: me.messages.labels.currentPassword,
                    name: 'currentPassword'
                },
                {
                    fieldLabel: me.messages.labels.newPassword,
                    name: 'newPassword',
                    allowBlank: false,
                    vtype:'password'
                },
                {
                    fieldLabel: me.messages.labels.confirmNewPassword,
                    name: 'confirmNewPassword',
                    allowBlank: false,
                    vtype:'password'
                }
            ],
            buttons:[
                {
                    action:'changePassword',
                    text:me.messages.labels.btnChangePassword
                }
            ]
        });
       me.items.push(form);
       me.callParent(arguments);
    }
});