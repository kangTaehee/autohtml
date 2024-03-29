
var outputSouce = ''
var radioIndex = 0
const removeAttrFilters = ['rowspan', 'colspan']
const opts = {
    "max_preserve_newlines": "-1",
    "preserve_newlines": false,
    "indent_size": "4",
    "indent_char": " ",
    "keep_array_indentation": false,
    "break_chained_methods": false,
    "indent_scripts": "normal",
    "brace_style": "collapse",
    "space_before_conditional": true,
    "unescape_strings": false,
    "jslint_happy": false,
    "end_with_newline": false,
    "wrap_line_length": "0",
    "indent_inner_html": false,
    "comma_first": false,
    "e4x": false,
    "indent_empty_lines": false
}
/**
 * `removeAttrs` 함수는 `removeAttrFilters` 배열에 지정된 속성을 제외하고 HTML 요소에서 속성을 제거
 * @param element - `element` 매개변수는 속성을 제거하려는 HTML 요소
 */
function removeAttrs(element) {
    let _array = element.attributes
    let idx = 0
    try {
        do {
            let name = _array[idx]?.name
            if (removeAttrFilters.indexOf(name) > -1) {
                idx++
            } else {
                element.removeAttribute(name)
            }
        } while (_array.length && _array.length > idx);
    } catch (error) {

    }
}
$('.styleclear').on('click', function () {
    $('#input').val(oEditors.getById["nttCn"].getIR())
    $('#html').html($('#input').val())
    $('#html').find('*').removeAttr('class')
    $('#html').find('*').each(function (index, element) {

        // console.log(element.style.cssText)
        let styles = element.style.cssText.split(';')
        a = styles.filter((word) => {
            return word.indexOf('back') > -1 ||
                // word.indexOf('font') > -1 ||
                word.indexOf('width') > -1 ||
                // word.indexOf('border') > -1 ||
                word.indexOf('height') > -1
        })
        element.style = a.join(';')
    });
    outputSouce = document.querySelector('#html').innerHTML
    outputSouce = html_beautify(outputSouce, opts)

    $('#output').val(outputSouce)
    $('#outputhtml').html(outputSouce)
    document.querySelector("#output").select();
    document.execCommand('copy');
})
// setTimeout(() => {
//     $('.styleclear').trigger('click')
// }, 500);
$('.generrator').on('click', function () {
    outputSouce = ''
    radioIndex = 0
    $('#input').val(oEditors.getById["nttCn"].getIR())


    $('#html').html($('#input').val())

    // 강조스타일 텍스트

    // 불필요한 소스정리
    $('colgroup').remove()
    $('col').remove()
    $('#html').find('*').each(function (index, element) {
        // element == this
        removeAttrs(element)
    });
    $('#html').find('td').each(function (index, element) {
        // element == this
        $(element).html($(element).text())
    });
    // option 처리 
    let _val = $('#html').html()
    _val = _val.replaceAll(/\&nbsp\;/g, ' ')
    if (option.ptag.checked) {
        _val = _val.replaceAll(/<p[^>]*>/g, '')
        _val = _val.replaceAll(/<\/p[^>]*>/g, '')
    }
    if (option.divtag.checked) {
        _val = _val.replaceAll(/<div[^>]*>/g, '')
        _val = _val.replaceAll(/<\/div[^>]*>/g, '')
    }
    if (option.brtag.checked) {
        _val = _val.replaceAll('<br>', '')
        _val = _val.replaceAll('<br/>', '')
    }
    if (option.spantag.checked) {
        _val = _val.replaceAll('<span>', '')
        _val = _val.replaceAll('</span>', '')
    }
    $('#html').html(_val)
    $('#html table').each(function (index, element) {
        // element == this
        // 초기화

        element = $(element)
        if (option.todl.value === 'rowtable') {
            element.find('tr').find('td:first').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll(/\<td([^>]*)>/g, '<th$1>')
                // firsttd.outerHTML = firsttd.outerHTML.replaceAll(/<\/td[^>]*>/g, '<\/th>')
            })
            if (option.rowtitles.checked) {
                element.find('tr').find('>*:first+*+*').each(function (index, firsttd) {
                    firsttd.outerHTML = firsttd.outerHTML.replaceAll(/\<td([^>]*)>/g, '<th$1>')
                    // firsttd.outerHTML = firsttd.outerHTML.replaceAll(/<\/td[^>]*>/g, '</th>')
                })
                element.find('tr').find('>*:first+*+*+*+*').each(function (index, firsttd) {
                    firsttd.outerHTML = firsttd.outerHTML.replaceAll(/\<td([^>]*)>/g, '<th$1>')
                })
                element.find('tr').find('>*:first+*+*+*+*+*+*').each(function (index, firsttd) {
                    firsttd.outerHTML = firsttd.outerHTML.replaceAll(/\<td([^>]*)>/g, '<th$1>')
                })
            }
            outputSouce += `<div class=${option.className.value}>${element[0].outerHTML}</div>`

        } else if (option.todl.value === 'dl') {
            $('#html').find('*').removeAttr('rowspan')
            $('#html').find('*').removeAttr('colspan')

            element.find('tr').find('td:first').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll('td>', 'dt>')
            })
            element.find('tr').find('*:first+*').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll('td>', 'dd>')
            })
            element.find('tr').find('*:first+*+*').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll('td>', 'dt>')
            })
            element.find('tr').find('*:first+*+*+*').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll('td>', 'dd>')
            })

            head = element[0].outerHTML
            head = head.replaceAll(/<table[^>]*>/g, '')
            head = head.replaceAll(/<\/table[^>]*>/g, '')
            head = head.replaceAll(/<thead[^>]*>/g, '')
            head = head.replaceAll(/<\/thead[^>]*>/g, '')
            head = head.replaceAll(/<tbody[^>]*>/g, '')
            head = head.replaceAll(/<\/tbody[^>]*>/g, '')
            head = head.replaceAll(/<tr[^>]*>/g, '<dl>')
            head = head.replaceAll(/<\/tr[^>]*>/g, '</dl>')
            outputSouce += `<div class=${option.className.value}>${head}</div>`
        } else {
            element.prepend('<thead>')
            element.prepend('<caption>')
            var head = element.find('tr:first')[0].outerHTML
            head = head.replaceAll('<td', '<th')
            head = head.replaceAll('</td>', '</th>')
            element.find('thead').prepend(head)
            element.find('tbody tr:first').remove()
            // $('#output').val($('#html').html())
            outputSouce += `<div class="${option.className.value}">${element[0].outerHTML}</div>`
        }

    });


    outputSouce = outputSouce.replaceAll(/\*/g, '<span class=req aria-label=필수입력 role=img></span>')
    outputSouce = generrator.toRadio(outputSouce, ['●', '○'])
    outputSouce = generrator.toRadio(outputSouce, ['■', '□'])

    outputSouce = html_beautify(outputSouce, opts)

    $('#output').val(outputSouce)
    $('#outputhtml').html(outputSouce)
    document.querySelector("#output").select();
    document.execCommand('copy');


});
$('[type=checkbox]').on('click', function () {
    $('.generrator').trigger('click')
});
$('#className').on('keydown', function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $('.generrator').trigger('click')
    }
});

const generrator = {
    /**
     * 
     * @param {string} item 
     * @param {Array} c ['●'] 치환할 문자열 리스트
     * @returns 
     */
    toRadio: (item, c) => {
        let idx = 0
        let legex = new RegExp(`[${c.join('')}]([^${c.join('')}<]*)`)
        c.forEach(el => {
            while (item.indexOf(el) > -1) {
                ++idx
                item = item.replace(legex, `<label for="sr-radio-${idx}"><input type="radio" name="" id="sr-radio-${idx}"> $1</label>\n`)
            }
        })
        return item
    },
    toCheckbox: (item, c) => {
        let idx = 0
        let legex = new RegExp(`[${c.join('')}]([^${c.join('')}<]*)`)
        c.forEach(el => {
            while (item.indexOf(el) > -1) {
                ++idx
                item = item.replace(legex, `<label for="sr-checkbox-${idx}"><input type="radio" name="" id="sr-checkbox-${idx}"> $1</label>\n`)
            }
        })
        return item
    }
}
$('.nameoption').on('click', function () {
    option.className.value = $(this).val()
    $('.generrator').trigger('click')
});