
// (c) Marcel Timm, RhinoDevel, 2018

(function() // IIFE
{
    'use strict';

    var f = {}, // Functions
        v = {}; // Variables

    f.obj = {};
    f.ele = {};
    f.ele.tbl = {};
    f.ele.input = {};
    f.str = {};

    f.obj.isObj = function(obj)
    {
        return typeof obj==='object' && obj!==null && !Array.isArray(obj);
    };
    f.obj.forEach = function(obj, func)
    {
        var key = null;

        for(key in obj)
        {
            if(obj.hasOwnProperty(key))
            {
                func(obj[key], key, obj);
            }
        }
        return obj;
    };
    f.obj.setKeysAndValues = function(objDest, objSrc)
    {
        f.obj.forEach(
            objSrc,
            function(val, key)
            {
                objDest[key] = val;
            });
    };

    f.str.isStr = function(str)
    {
        return typeof str==='string';
    };
    f.str.isNonEmpty = function(str)
    {
        return f.str.isStr(str) && str.length > 0;
    };
    f.str.isNonWhiteSpace = function(str)
    {
        return f.str.isStr(str) && str.trim().length > 0;
    };

    f.ele.applyStyles = function(ele, styles)
    {
        if(!f.obj.isObj(styles))
        {
            return;
        }
        f.obj.setKeysAndValues(ele.style, styles);
    };
    f.ele.createDiv = function(styles, html, id)
    {
        var retVal = document.createElement('DIV');

        f.ele.applyStyles(retVal, styles);

        if(f.str.isNonWhiteSpace(html))
        {
            retVal.innerHTML = html;
        }

        if(f.str.isNonWhiteSpace(id))
        {
            retVal.id = id;
        }

        return retVal;
    };

    f.ele.tbl.createHtml = function(rows)
    {
        var retVal = '<table>';

        rows.forEach(
            function(cols)
            {
                retVal += '<tr>';
                cols.forEach(
                    function(col, index)
                    {
                        retVal += '<td style="' + (index % 2 == 0 ? 'background-color: lightblue;' : 'background-color: darkturquoise;') + '">';
                        retVal += col;
                        retVal += '</td>';
                    });
                retVal += '</tr>';
            });
        retVal += '</table>';

        return retVal;
    };

    f.ele.input.createHtml = function(val, type, id)
    {
        var retVal = '<input type="' + type
            + '" id="' + id
            + '" value="' + String(val) + '"';

        if(type === 'number')
        {
            retVal += ' step="any"';
        }

        retVal += ' />';

        return retVal;
    };

    f.createEles = function()
    {
        var style = {
                title: {'font-weight': 'bolder'},
                topTitle: { 'font-weight': 'bold' },
                percent: { 'text-align': 'right'},
                val: { 'text-align': 'right' },
                count: { 'text-align': 'right' },
                copyright: {'font-style': 'italic', 'font-size': 'small'}
            },
            mainEle = f.ele.createDiv(),
            titleEle = f.ele.createDiv(style.title, document.title),
            tableEle = f.ele.createDiv(
                null,
                f.ele.tbl.createHtml([
                    [
                        f.ele.createDiv(style.topTitle, 'Bezeichnung').outerHTML,
                        f.ele.createDiv(style.topTitle, 'Prozent').outerHTML,
                        f.ele.createDiv(style.topTitle, 'Betrag').outerHTML,
                        f.ele.createDiv(style.topTitle, 'Anzahl').outerHTML
                    ],

                    [
                        'Kaufpreis',
                        f.ele.createDiv(style.percent, null, 'percent_price').outerHTML,
                        f.ele.input.createHtml(0, 'number', 'val_price'),
                        ''
                    ],

                    [
                        'Maklerprovision',
                        f.ele.input.createHtml(0, 'number', 'percent_realtor'),
                        f.ele.createDiv(style.val, null, 'val_realtor').outerHTML,
                        ''
                    ],

                    [
                        'Notargeb&uuml;hren',
                        f.ele.input.createHtml(0, 'number', 'percent_notary'),
                        f.ele.createDiv(style.val, null, 'val_notary').outerHTML,
                        ''
                    ],

                    [
                        'Gerichtskosten / Grundbuchamt',
                        f.ele.input.createHtml(0, 'number', 'percent_courtandregistry'),
                        f.ele.createDiv(style.val, null, 'val_courtandregistry').outerHTML,
                        ''
                    ],

                    [
                        'Grunderwerbsteuer',
                        f.ele.input.createHtml(0, 'number', 'percent_taxes'),
                        f.ele.createDiv(style.val, null, 'val_taxes').outerHTML,
                        ''
                    ],

                    [
                        'Weitere Kosten',
                        f.ele.createDiv(style.percent, null, 'percent_additionalcosts').outerHTML,
                        f.ele.input.createHtml(0, 'number', 'val_additionalcosts'),
                        ''
                    ],

                    [
                        'Gesamtkosten',
                        f.ele.createDiv(style.percent, null, 'percent_total').outerHTML,
                        f.ele.createDiv(style.val, null, 'val_total').outerHTML,
                        ''
                    ],

                    [
                        'Eigenkapital',
                        f.ele.createDiv(style.percent, null, 'percent_equity').outerHTML,
                        f.ele.input.createHtml(0, 'number', 'val_equity'),
                        ''
                    ],

                    [
                        'Fremdkapital',
                        f.ele.createDiv(style.percent, null, 'percent_borrowing').outerHTML,
                        f.ele.createDiv(style.val, null, 'val_borrowing').outerHTML,
                        ''
                    ],

                    [
                        'Zinssatz',
                        f.ele.input.createHtml(0, 'number', 'percent_interest'),
                        f.ele.createDiv(style.val, null, 'val_interest').outerHTML,
                        ''
                    ],

                    [
                        'Anfangstilgung',
                        f.ele.input.createHtml(0, 'number', 'percent_redemption'),
                        f.ele.createDiv(style.val, null, 'val_redemption').outerHTML,
                        ''
                    ],

                    [
                        'Monatliche Rate',
                        '',
                        f.ele.createDiv(style.val, null, 'val_rate').outerHTML,
                        f.ele.createDiv(style.count, null, 'count_rate').outerHTML
                    ],

                    [
                        'Summe monatlicher Raten',
                        '',
                        f.ele.createDiv(style.val, null, 'val_ratesum').outerHTML,
                        ''
                    ],

                    [
                        'Laufzeit in Jahren',
                        '',
                        '',
                        f.ele.createDiv(style.count, null, 'count_years').outerHTML
                    ],

                    [
                        'Gesamtzinsen',
                        '',
                        f.ele.createDiv(style.val, null, 'val_totalinterest').outerHTML,
                        ''
                    ],

                    [
                        'Durchschnittszinsen pro Jahr',
                        '',
                        f.ele.createDiv(style.val, null, 'val_avgyearinterest').outerHTML,
                        ''
                    ]
                ])),
            copyrightEle = f.ele.createDiv(
                style.copyright,
                '2018'
                + ', '
                + '<a href="http://rhinodevel.com/" title="RhinoDevel Website">'
                +   '(c) Marcel Timm, RhinoDevel'
                + '</a>'
                + ' / Alle Angaben und Berechnungsergebnisse ohne Gew\u00E4hr.');

        mainEle.appendChild(titleEle);
        mainEle.appendChild(tableEle);
        mainEle.appendChild(copyrightEle);
        document.body.appendChild(mainEle);
    };
    f.configureEles = function()
    {
        v.ele = {};

        v.ele.price = {};
        //
        v.ele.price.percent = document.getElementById('percent_price');
        v.ele.price.percent.textContent = String(100);
        //
        v.ele.price.val = document.getElementById('val_price');
        v.ele.price.val.value = String(300000);

        v.ele.realtor = {};
        //
        v.ele.realtor.percent = document.getElementById('percent_realtor');
        v.ele.realtor.percent.value = String(3.57);
        //
        v.ele.realtor.val = document.getElementById('val_realtor');

        v.ele.notary = {};
        //
        v.ele.notary.percent = document.getElementById('percent_notary');
        v.ele.notary.percent.value = String(1.5);
        //
        v.ele.notary.val = document.getElementById('val_notary');

        v.ele.courtandregistry = {};
        //
        v.ele.courtandregistry.percent = document.getElementById('percent_courtandregistry');
        v.ele.courtandregistry.percent.value = String(0.5);
        //
        v.ele.courtandregistry.val = document.getElementById('val_courtandregistry');

        v.ele.taxes = {};
        //
        v.ele.taxes.percent = document.getElementById('percent_taxes');
        v.ele.taxes.percent.value = String(6.5);
        //
        v.ele.taxes.val = document.getElementById('val_taxes');

        v.ele.additionalcosts = {};
        v.ele.additionalcosts.percent = document.getElementById('percent_additionalcosts');
        v.ele.additionalcosts.val = document.getElementById('val_additionalcosts');

        v.ele.total = {};
        v.ele.total.percent = document.getElementById('percent_total');
        v.ele.total.val = document.getElementById('val_total');

        v.ele.equity = {};
        //
        v.ele.equity.percent = document.getElementById('percent_equity');
        //
        v.ele.equity.val = document.getElementById('val_equity');
        v.ele.equity.val.value = String(50000);

        v.ele.borrowing = {};
        v.ele.borrowing.percent = document.getElementById('percent_borrowing');
        v.ele.borrowing.val = document.getElementById('val_borrowing');

        v.ele.interest = {};
        //
        v.ele.interest.percent = document.getElementById('percent_interest');
        v.ele.interest.percent.value = String(1.8);
        //
        v.ele.interest.val = document.getElementById('val_interest');

        v.ele.redemption = {};
        //
        v.ele.redemption.percent = document.getElementById('percent_redemption');
        v.ele.redemption.percent.value = String(2.5);
        //
        v.ele.redemption.val = document.getElementById('val_redemption');

        v.ele.rate = {};
        v.ele.rate.val = document.getElementById('val_rate');
        v.ele.rate.count = document.getElementById('count_rate');

        v.ele.ratesum = {};
        v.ele.ratesum.val = document.getElementById('val_ratesum');

        v.ele.years = {};
        v.ele.years.count = document.getElementById('count_years');

        v.ele.totalinterest = {};
        v.ele.totalinterest.val = document.getElementById('val_totalinterest');

        v.ele.avgyearinterest = {};
        v.ele.avgyearinterest.val = document.getElementById('val_avgyearinterest');
    };
    f.calc = function()
    {
        var percentPrice = parseFloat(v.ele.price.percent.textContent),
            percentRealtor = parseFloat(v.ele.realtor.percent.value),
            percentNotary = parseFloat(v.ele.notary.percent.value),
            percentCourtandregistry = parseFloat(v.ele.courtandregistry.percent.value),
            percentTaxes = parseFloat(v.ele.taxes.percent.value),
            percentInterest = parseFloat(v.ele.interest.percent.value),
            percentRedemption = parseFloat(v.ele.redemption.percent.value),

            valPrice = parseFloat(v.ele.price.val.value),
            valAdditionalcosts = parseFloat(v.ele.additionalcosts.val.value),
            valEquity = parseFloat(v.ele.equity.val.value),

            valRealtor = valPrice * percentRealtor / 100.0,
            valNotary = valPrice * percentNotary / 100.0,
            valCourtandregistry = valPrice * percentCourtandregistry / 100.0,
            valTaxes = valPrice * percentTaxes / 100.0,
            valTotal = valPrice
                + valRealtor
                + valNotary
                + valCourtandregistry
                + valTaxes
                + valAdditionalcosts,
            valBorrowing = valTotal - valEquity,
            valInterest = percentInterest * valBorrowing / 100.0,
            valRedemption = percentRedemption * valBorrowing / 100.0,
            valRate = (valInterest + valRedemption) / 12.0,

            percentAdditionalcosts = 100.0 * valAdditionalcosts / valPrice,
            percentTotal = percentPrice
                + percentRealtor
                + percentNotary
                + percentCourtandregistry
                + percentTaxes
                + percentAdditionalcosts,
            percentEquity = 100.0 * valEquity / valTotal,
            percentBorrowing = 100.0 - percentEquity,

            countRate = Math.log(1 + percentInterest / percentRedemption) / Math.log(1 + (percentInterest / 100.0) / 12),
            countYears = countRate / 12.0,

            valRatesum = countRate * valRate,
            valTotalinterest = valRatesum - valBorrowing,
            valAvgyearinterest = valTotalinterest / countYears;

        v.ele.realtor.val.textContent = String(valRealtor.toFixed(2));
        v.ele.notary.val.textContent = String(valNotary.toFixed(2));
        v.ele.courtandregistry.val.textContent = String(valCourtandregistry.toFixed(2));
        v.ele.taxes.val.textContent = String(valTaxes.toFixed(2));
        v.ele.total.val.textContent = String(valTotal.toFixed(2));
        v.ele.borrowing.val.textContent = String(valBorrowing.toFixed(2));
        v.ele.interest.val.textContent = String(valInterest.toFixed(2));
        v.ele.redemption.val.textContent = String(valRedemption.toFixed(2));
        v.ele.rate.val.textContent = String(valRate.toFixed(2));
        v.ele.ratesum.val.textContent = String(valRatesum.toFixed(2));
        v.ele.totalinterest.val.textContent = String(valTotalinterest.toFixed(2));
        v.ele.avgyearinterest.val.textContent = String(valAvgyearinterest.toFixed(2));

        v.ele.rate.count.textContent = String(countRate.toFixed(1));
        v.ele.years.count.textContent = String(countYears.toFixed(1));

        v.ele.additionalcosts.percent.textContent = String(percentAdditionalcosts.toFixed(4));
        v.ele.total.percent.textContent = String(percentTotal.toFixed(4));
        v.ele.equity.percent.textContent = String(percentEquity.toFixed(4));
        v.ele.borrowing.percent.textContent = String(percentBorrowing.toFixed(4));
    };
    f.configureEvents = function()
    {
        var eles = [
                v.ele.price.val,

                v.ele.realtor.percent,
                v.ele.notary.percent,
                v.ele.courtandregistry.percent,
                v.ele.taxes.percent,

                v.ele.additionalcosts.val,

                v.ele.equity.val,

                v.ele.interest.percent,
                v.ele.redemption.percent
        ];

        eles.forEach(
            function(ele)
            {
                ele.addEventListener('blur', f.calc);
            });
    }

    document.title = 'Immobilienfinanzierung per Annuit\u00E4tendarlehen';
    f.createEles();
    f.configureEles();
    f.calc();
    f.configureEvents();
}());
