Ext.define('sisprod.view.base.ColorPickerCombo', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.colorpickercombo',
    picker: null,
    triggerTip: 'Please select a color.',
    invalidText : "Colors must be in a the hex format #FFFFFF.",
    regex: /^\#[0-9A-F]{6}$/i,
    fieldLabel: 'Color',
//    triggerCls: 'x-form-color-trigger',
    
    pickerOptions: {},
            
    setValue: function(color) {
        this.setRawValue(color);
        this.setFieldStyle(Ext.String.format('background-color: {0};background-image: none;', color));
    },
    
    onTriggerClick: function() {
        var me = this;
        if(!me.picker) {
            var pickerOptions = Ext.Object.merge(me.pickerOptions, {    
                pickerField: this,    
                ownerCt: this,
                renderTo: document.body,    
                floating: true,    
                hidden: false,
                focusOnShow: true,
                value: me.value,
                style: {
                    backgroundColor: "#fff"
                } ,
                listeners: {
                    scope:this,
                    select: function(field, value, options) {
                        me.setValue('#' + value);
//                        me.inputEl.setStyle({backgroundColor:value});
//                        me.setFieldStyle(Ext.String.format('background-color: #{0};background-image: none;', value));
                        me.picker.hide();
                    },
                    show: function(field, options){
                        field.getEl().monitorMouseLeave(500, field.hide, field);
                    }
                }
            });            
            me.picker = Ext.create('Ext.picker.Color', pickerOptions);
            me.picker.alignTo(me.inputEl, 'tl-bl?');
            me.picker.show(me.inputEl);
        }
        else {
            if(me.picker.hidden) {
                me.picker.show();
            }
            else {
                me.picker.hide();
            }
        }
    }
});