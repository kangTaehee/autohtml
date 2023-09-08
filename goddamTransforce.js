var outputSouce = ''

$('.generrator').on('click', function () {
    $('#input').val(oEditors.getById["nttCn"].getIR())
    let v = $('#input').val()

    $('#html').html($('#input').val())
    $('colgroup').remove()
    $('col').remove()
    $('#html').find('*').removeAttr('class')
    $('#html').find('*').removeAttr('style')
    $('#html').find('*').removeAttr('height')
    $('#html').find('*').removeAttr('width')
    $('#html').find('*').removeAttr('border')
    $('#html').find('*').removeAttr('cellpadding')
    $('#html').find('*').removeAttr('cellspacing')
    $('#html').find('*').removeAttr('width')
    $('#html').find('*').removeAttr('valign')
    $('#html').find('td').each(function (index, element) {
        // element == this
        $(element).html($(element).text())
    });
    // option 처리 
    let _val = $('#html').html()
    _val = _val.replaceAll(/\&nbsp\;/g, ' ')
    if (option.ptag.checked) {
        _val = _val.replaceAll('<p>', '')
        _val = _val.replaceAll('</p>', '')
    }
    if (option.divtag.checked) {
        _val = _val.replaceAll('<div>', '')
        _val = _val.replaceAll('</div>', '')
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
        outputSouce = ''
        element = $(element)

        if (option.todl.checked) {
            $(element).find('tr').find('td:first').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll('td>', 'dt>')
            })
            $(element).find('tr').find('*:first+*').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll('td>', 'dd>')
            })
            $(element).find('tr').find('*:first+*+*').each(function (index, firsttd) {
                firsttd.outerHTML = firsttd.outerHTML.replaceAll('td>', 'dt>')
            })
            $(element).find('tr').find('*:first+*+*+*').each(function (index, firsttd) {
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
            head = head.replaceAll('td>', 'th>')
            element.find('thead').prepend(head)
            element.find('tbody tr:first').remove()
            // $('#output').val($('#html').html())
            outputSouce += `<div class=${option.className.value}>${element[0].outerHTML}</div>`
        }

    });
    opts = {
        "indent_size": "4",
        "indent_char": " ",
        "max_preserve_newlines": "5",
        "preserve_newlines": true,
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

    // const options = { indent_size: 2, space_in_empty_paren: true }
    // const dataObj = { completed: false, id: 1, title: "delectus aut autem", userId: 1, }
    // const dataJson = JSON.stringify(dataObj)
    outputSouce = outputSouce.replaceAll(/\*/g, '<span class=req aria-label=필수입력 role=img></span>')
    // outputSouce = `<div class=${option.className.value}>${$('#output').val()}</div>`


    outputSouce = html_beautify(outputSouce, opts)
    /* OUTPUT
    {
      "completed": false,
      "id": 1,
      "title": "delectus aut autem",
      "userId": 1,
    }
    */


    $('#output').val(outputSouce)
    document.querySelector("#output").select();
    document.execCommand('copy');


});
$('[type=checkbox]').on('click', function () {
    $('.generrator').trigger('click')

});