Ext.define('sisprod.view.base.MonthYearField', {
    extend: 'Ext.form.field.Date',
    alias: 'widget.monthYearField',
    requires: ['Ext.picker.Month'],
    selectMonth: null,
    month: null,
    year: null,
    createPicker: function () {
        var me = this,
            format = Ext.String.format;
        return Ext.create('Ext.picker.Month', {
            pickerField: me,
            height: 200,
            ownerCt: me.ownerCt,
            renderTo: document.body,
            floating: true,
            hidden: true,
            focusOnShow: true,
            minDate: me.minValue,
            maxDate: me.maxValue,
            disabledDatesRE: me.disabledDatesRE,
            disabledDatesText: me.disabledDatesText,
            disabledDays: me.disabledDays,
            disabledDaysText: me.disabledDaysText,
            format: me.format,
            showToday: me.showToday,
            startDay: me.startDay,
            minText: format(me.minText, me.formatDate(me.minValue)),
            maxText: format(me.maxText, me.formatDate(me.maxValue)),
            listeners: {
                select: { scope: me, fn: me.onSelect },
                monthdblclick: { scope: me, fn: me.onOKClick },
                yeardblclick: { scope: me, fn: me.onOKClick },
                OkClick: { scope: me, fn: me.onOKClick },
                CancelClick: { scope: me, fn: me.onCancelClick }
            },
            keyNavConfig: {
                esc: function () {
                    me.collapse();
                }
            }
        });
    },
    onCancelClick: function () {
        var me = this;
        me.collapse();
    },
    onOKClick: function () {
        var me = this;
        if (me.selectMonth) {
            me.setValue(me.selectMonth);
            this.year = me.selectMonth.getYear() + 1900;
            this.month = me.selectMonth.getMonth() + 1;
            me.fireEvent('select', me, me.selectMonth);
        }
        me.collapse();
    },
    onSelect: function (m, d) {
        var me = this;
        me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
    }
});