/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('login.view.Login', {
    autoShow: true,
    closable: false,
    resizable: false,
    iconCls: 'login',
//    height: 250,//with recaptcha
    maxHeight: 180,
    maxWidth: 420,
    extend: 'Ext.window.Window',
    widget: 'widget.loginView',
    title: 'EXPLORATION AND PRODUCTION SYSTEM',
    loginMessages: {
        labels: {
            fieldSet: 'Log In',
            username: 'Username',
            password: 'Password',
            lot: 'Lot'
        },
        buttons: {
            signIn: 'Sign In',
            clear: 'Reset'
        }
    },
    layout: 'fit',
    activeItem: 'username',
    
    initComponent: function(){
        var me = this;
        me.items = [
            Ext.create('Ext.form.Panel', {
                id: 'login-panel',
                border: false,
                url: 'j_spring_security_check',
                standardSubmit: true,
                defaultType: 'textfield',
                fieldDefaults: {
                    labelWidth: 70,
                    width: 260
                },
                bodyPadding: 5,

                layout: {
                    type: 'table',
                    columns: 3
                },

                items: [
                    {
                        xtype: 'label',
                        html: '<div id="loginLogo"></div>',
                        rowspan: 3
                    },
                    {
                        xtype: 'fieldset',
                        columnWidth: 0.5,
                        title: me.loginMessages.labels.fieldSet,
                        defaultType: 'textfield',
                        defaults: {
                            anchor: '100%'
                        },
                        items:[
                            {
                                fieldLabel: me.loginMessages.labels.username,
                                name: 'j_username',
                                itemId: 'txtUsername',
                                emptyText: 'admin',
                                allowBlank: false,
                                enableKeyEvents:true,
                                listeners: {
                                    keypress: function(src, keyEvent) {
                                        me.inputKeypressAction(src, keyEvent);
                                    }
                                }
                            },
                            {
                                fieldLabel: me.loginMessages.labels.password,
                                name: 'j_password',
                                itemId: 'txtPassword',
                                inputType: 'password',
                                emptyText: '*******',
                                allowBlank: false,
                                enableKeyEvents:true,
                                listeners: {
                                    keypress: function(src, keyEvent) {
                                        me.inputKeypressAction(src, keyEvent);
                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: me.loginMessages.labels.lot,
                                name: 'envLotId',   // enviroment Lot Id
                                store: Ext.create('login.store.LotAll'),
                                queryMode: 'local',
                                displayField: 'lotName',
                                valueField: 'idLot',
                                allowBlank: false,
                                editable: false,
                                enableKeyEvents:true,
                                listeners: {
                                    keypress: function(src, keyEvent) {
                                        me.inputKeypressAction(src, keyEvent);
                                    }
                                }
                            }/*,
                             Ext.create('Login.Recaptcha', {
                             name: 'recaptcha',
                             recaptchaId: 'recaptcha',
                             publickey: '6Lf_i9kSAAAAAJTpxC6mFv3s3hicRrFiUVN28i84',
                             theme: 'white',
                             lang: 'en'
                             })*/
                        ]
                    }
                ],
                buttons: [
                    {
                        text: me.loginMessages.buttons.signIn,
                        iconCls: 'signIn',
                        listeners: {
                            click: function(){
                                me.loginAction.apply(me.controller, [this.up('form')]);
                            }
                        }
                    },
                    {
                        text: me.loginMessages.buttons.clear,
                        iconCls: 'clear',
                        handler: function() {
                            this.up('form').getForm().reset();
                        }
                    }
                ]
            })
        ];        
        me.callParent(arguments);
    },
    
    inputKeypressAction: function(src, keyevent) {
        if (keyevent.keyCode==13) {
            this.loginAction(src.up("form"));
        }
    },
    
    loginAction: function(form) {
        if (form.isValid()) {
            form.submit();
        }
    },
});