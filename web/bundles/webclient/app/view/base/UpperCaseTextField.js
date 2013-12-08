Ext.define('sisprod.view.base.UpperCaseTextField', {
    extend: 'Ext.form.field.Text',
    alias: ['widget.uppercasetextfield', 'widget.uppertextfield'],
    
    fieldStyle: {
        textTransform: 'uppercase'
    },
    initComponent: function(){
        this.callParent(arguments);
    },
//    enableKeyEvents:true,
//    onKeyUp: function (event, options){
//        var value = this.getValue().toUpperCase();
//        this.setValue(value);
//        this.fireEvent('keyup', this, event);
//    }
    listeners: {
        change: function (input, newValue) {
            input.setRawValue(newValue.toUpperCase());
        }
     }
});
