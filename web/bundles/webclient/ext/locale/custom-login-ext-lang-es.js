Ext.define('locale.es.login.Base', {
    override : 'Ext.form.field.Base',
    initComponent : function(){
        if(this.allowBlank!==undefined && !this.allowBlank){
            if(!this.labelSeparator){this.labelSeparator = "";}
            this.labelSeparator += '<span class="required">*</span>';
        }
        this.callParent(arguments);
    }
});

Ext.define('locale.es.login.view.Login',{
    override: 'login.view.Login',
    title: 'SISTEMA DE PRODUCCIÓN Y EXPLORACIÓN',
    loginMessages: {
        labels: {
            fieldSet: 'Inicio de Sesión',
            username: 'Usuario',
            password: 'Contraseña',
            lot: 'Lote'
        },
        emptyText: {
            username: 'admin',
            password: '******'
        },
        buttons: {
            signIn: 'Iniciar',
            clear: 'Limpiar'
        }
    }
});

Ext.define('locale.es.login',{
    override: 'login.Application',
    messages: {
        messageText: 'Mensaje',
        browserCompatibilityText: 'La aplicación no funcionará correctamente con el navegador actual. Por favor, use Internet Explorer 9, Google Chrome o Mozilla Firefox!'
    }
});