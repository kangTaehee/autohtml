
var outputSouce = ''
var radioIndex = 0
const removeAttrFilters = ['rowspan', 'colspan']
const OPTION_KEY = 'autohtml.options'
const PRESET_KEY = 'autohtml.presets'
const CHECK_NAMES = ['ptag', 'divtag', 'brtag', 'spantag', 'officeclean', 'style', 'class', 'id']
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
 * img는 src, alt를 추가로 보존 (placeholder 이미지 유지 목적)
 * @param element - `element` 매개변수는 속성을 제거하려는 HTML 요소
 */
function removeAttrs(element) {
    let _array = element.attributes
    let idx = 0
    const filters = element.tagName === 'IMG'
        ? removeAttrFilters.concat(['src', 'alt'])
        : removeAttrFilters
    try {
        do {
            let name = _array[idx]?.name
            if (filters.indexOf(name) > -1) {
                idx++
            } else {
                element.removeAttribute(name)
            }
        } while (_array.length && _array.length > idx);
    } catch (error) {

    }
}

/* 토스트 알림 */
let toastTimer = null
function showToast(msg) {
    const $t = $('#toast')
    $t.text(msg).addClass('show')
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => $t.removeClass('show'), 1800)
}

/* 클립보드 복사: navigator.clipboard 우선, 실패 시 execCommand 폴백 */
function copyOutput() {
    const text = $('#output').val()
    const fallback = () => {
        document.querySelector("#output").select();
        document.execCommand('copy');
        showToast('클립보드에 복사됨')
    }
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => showToast('클립보드에 복사됨'))
            .catch(fallback)
    } else {
        fallback()
    }
}

/* 워드/한글/PPT 붙여넣기 잔재 정리 */
function officeClean(str) {
    return str
        .replaceAll(/<\/?o:p[^>]*>/gi, '')                          // Word <o:p> 태그
        .replaceAll(/<!--\[if[\s\S]*?\[endif\]-->/gi, '')           // MSO 조건부 주석
        .replaceAll(/[\u201C\u201D]/g, '"')                         // 곡선 큰따옴표
        .replaceAll(/[\u2018\u2019]/g, "'")                         // 곡선 작은따옴표
        .replaceAll(/\u3000/g, ' ')                                 // 전각 공백
        .replaceAll(/[\u200B\u200C\u200D\uFEFF]/g, '')              // zero-width 문자
}

/* 옵션 저장/복원 (localStorage) */
function saveOptions() {
    try {
        const data = {
            todl: option.todl.value,
            className: option.className.value,
            captionText: option.captionText.value,
            rowthcols: option.rowthcols.value,
            imgmode: option.imgmode.value,
            checks: {}
        }
        CHECK_NAMES.forEach(n => data.checks[n] = option[n].checked)
        localStorage.setItem(OPTION_KEY, JSON.stringify(data))
    } catch (error) {

    }
}
function restoreOptions() {
    try {
        const data = JSON.parse(localStorage.getItem(OPTION_KEY))
        if (!data) return
        if (data.todl) $(`[name=todl][value=${data.todl}]`).prop('checked', true)
        if (data.className) option.className.value = data.className
        option.captionText.value = data.captionText || ''
        option.rowthcols.value = data.rowthcols || '1'
        option.imgmode.value = data.imgmode || 'keep'
        CHECK_NAMES.forEach(n => {
            if (data.checks && n in data.checks) option[n].checked = data.checks[n]
        })
    } catch (error) {

    }
}

/* wrapper class 프리셋 (localStorage) */
function loadPresets() {
    try {
        return JSON.parse(localStorage.getItem(PRESET_KEY)) || []
    } catch (error) {
        return []
    }
}
function renderPresets() {
    const $wrap = $('#custompresets').empty()
    loadPresets().forEach(name => {
        const $btn = $('<button type="button" class="nameoption inline btn preset"></button>')
        $btn.val(name).text(name).append('<span class="preset-del" title="프리셋 삭제">×</span>')
        $wrap.append($btn)
    })
}

/* 표 구조 검사: colspan/rowspan을 반영한 행별 열 개수와 빈 셀 확인 */
function analyzeTables() {
    const warnings = []
    $('#html table').each(function (ti) {
        let carries = []   // 이전 행에서 rowspan으로 내려온 칸 [{rows, span}]
        let expected = null
        let emptyCells = 0
        $(this).find('tr').each(function (ri) {
            let width = 0
            const next = []
            carries.forEach(c => {
                width += c.span
                if (c.rows > 1) next.push({ rows: c.rows - 1, span: c.span })
            })
            carries = next
            $(this).children('td,th').each(function () {
                const cs = parseInt($(this).attr('colspan')) || 1
                const rs = parseInt($(this).attr('rowspan')) || 1
                width += cs
                if (rs > 1) carries.push({ rows: rs - 1, span: cs })
                if ($(this).text().trim() === '' && $(this).find('img').length === 0) emptyCells++
            })
            if (expected === null) {
                expected = width
            } else if (width !== expected) {
                warnings.push(`표 ${ti + 1}: ${ri + 1}번째 행 열 개수 불일치 (기준 ${expected}칸, 실제 ${width}칸)`)
            }
        })
        if (emptyCells) warnings.push(`표 ${ti + 1}: 빈 셀 ${emptyCells}개`)
    })
    return warnings
}
function renderWarnings(list) {
    const $w = $('#warnings')
    if (!list.length) {
        $w.prop('hidden', true).empty()
        return
    }
    $w.html(list.map(m => `<li>${m}</li>`).join('')).prop('hidden', false)
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
    renderWarnings([])
    copyOutput()
})

$('.generrator').on('click', function () {
    outputSouce = ''
    radioIndex = 0
    const warnings = []
    const captionText = option.captionText.value.trim()
    $('#input').val(oEditors.getById["nttCn"].getIR())


    $('#html').html($('#input').val())

    // 이미지 처리
    const imgCount = $('#html img').length
    if (imgCount) {
        if (option.imgmode.value === 'remove') {
            $('#html img').remove()
        } else if (option.imgmode.value === 'placeholder') {
            $('#html img').replaceWith('<img src="" alt="">')
        }
        if (option.imgmode.value !== 'remove') {
            warnings.push(`이미지 ${imgCount}개 발견 — 별도 업로드/경로 지정 필요`
                + (option.imgmode.value === 'keep' ? ' (표 안 이미지는 텍스트 변환 과정에서 제거됨)' : ''))
        }
    }

    // 불필요한 소스정리
    $('colgroup')
        .each(function (index, element) {
            // element == this
            let totalWidth = 0
            $(this).find('col').each(function (index, element) {
                // element == this
                totalWidth += $(this).width()
            })
            $(this).find('col').each(function (index, element) {
                // element == this
                let w = ($(this).width() / totalWidth * 100).toFixed(2) + '%'
                $(this).width(w)
                $(this).removeAttr('width')
            })
        });

    $('#html').find('*').not('col').each(function (index, element) {
        // element == this
        removeAttrs(element)
    });
    $('#html').find('td').each(function (index, element) {
        // element == this
        // placeholder 모드면 셀 안 이미지 보존, 그 외에는 텍스트만 남김(기존 동작)
        const imgs = $(element).find('img').clone()
        $(element).html($(element).text())
        if (option.imgmode.value === 'placeholder' && imgs.length) {
            $(element).append(imgs)
        }
    });
    // option 처리
    let _val = $('#html').html()
    _val = _val.replaceAll(/\&nbsp\;/g, ' ')
    if (option.officeclean.checked) {
        _val = officeClean(_val)
    }
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

    // 변환 전 원본 표 구조 검사
    warnings.push(...analyzeTables())
    if (option.todl.value === 'dl' && $('#html').find('[rowspan],[colspan]').length) {
        warnings.push('dl 모드: 병합 셀(rowspan/colspan)이 있어 구조가 틀어질 수 있음 (속성은 제거됨)')
    }

    if (option.todl.value === 'merge') {
        let tables = $('#html table')
        if (tables.length > 1) {
            let firstTable = $(tables[0])
            if (firstTable.find('tbody').length === 0) {
                let rows = firstTable.find('tr')
                firstTable.append('<tbody></tbody>')
                firstTable.find('tbody').append(rows)
            }
            let target = firstTable.find('tbody')
            tables.each(function (index) {
                if (index > 0) {
                    target.append($(this).find('tr').not(':first'))
                    $(this).remove()
                }
            })
        }
    }

    $('#html table').each(function (index, element) {
        // element == this
        // 초기화

        element = $(element)
        if (option.todl.value === 'rowtable') {
            // th 열 번호 입력(쉼표 구분)에 지정된 열을 th scope=row로 변환
            const cols = (option.rowthcols.value || '1').split(',')
                .map(s => parseInt(s.trim(), 10))
                .filter(n => n > 0)
            element.find('tr').each(function () {
                const cells = $(this).children('td,th')
                cols.forEach(n => {
                    const cell = cells.eq(n - 1)[0]
                    if (cell && cell.tagName === 'TD') {
                        cell.outerHTML = cell.outerHTML
                            .replace(/^<td/i, '<th scope="row"')
                            .replace(/<\/td>$/i, '</th>')
                    }
                })
            })
            if (captionText) element.prepend(`<caption>${captionText}</caption>`)
            outputSouce += `<div class="${option.className.value}">${element[0].outerHTML}</div>`

        } else if (option.todl.value === 'dl') {
            $('#html').find('col,colgroup').remove()
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
            outputSouce += `<div class="${option.className.value}">${head}</div>`
        } else {
            // merge / default(col) 공통: caption + thead(th scope=col) 생성
            element.prepend('<thead>')
            let item = element.find('colgroup')
            element.find('colgroup').remove()
            element.prepend(item)
            element.prepend(captionText ? `<caption>${captionText}</caption>` : '<caption>')
            var head = element.find('tr:first')[0].outerHTML
            head = head.replaceAll('<td', '<th scope="col"')
            head = head.replaceAll('</td>', '</th>')
            element.find('thead').prepend(head)
            element.find('tbody tr:first').remove()
            // $('#output').val($('#html').html())
            outputSouce += `<div class="${option.className.value}">${element[0].outerHTML}</div>`
        }

    });


    outputSouce = outputSouce.replaceAll(/\*/g, '<span class=req aria-label=필수입력 role=img></span>')
    outputSouce = generrator.toRadio(outputSouce, ['●', '○'])
    outputSouce = generrator.toCheckbox(outputSouce, ['■', '□'])

    outputSouce = html_beautify(outputSouce, opts)

    $('#output').val(outputSouce)
    $('#outputhtml').html(outputSouce)
    renderWarnings(warnings)
    copyOutput()
    saveOptions()


});

$('#removestyle').on('click', function () {
    $('#input').val(oEditors.getById["nttCn"].getIR())
    $('#html').html($('#input').val())
    if (option.style.checked) {
        $('#html *').removeAttr('style')
    }
    if (option.class.checked) {
        $('#html *').removeAttr('class')
    }
    if (option.id.checked) {
        $('#html *').removeAttr('id')
    }
    outputSouce = $('#html').html()
    $('#output').val(outputSouce)
    $('#outputhtml').html(outputSouce)
    renderWarnings([])
    copyOutput()
    saveOptions()
});

/* 옵션 변경 시 자동 재변환 */
$('[type=checkbox]').not('.att').on('click', function () {
    $('.generrator').trigger('click')
});
$('[name=todl], [name=imgmode]').on('change', function () {
    $('.generrator').trigger('click')
});
$('#className, #captionText, #rowthcols').on('keydown', function (e) {
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
                item = item.replace(legex, `<label for="sr-checkbox-${idx}"><input type="checkbox" name="" id="sr-checkbox-${idx}"> $1</label>\n`)
            }
        })
        return item
    }
}

/* wrapper class 선택 (프리셋 버튼은 동적 생성이라 위임 바인딩) */
$(document).on('click', '.preset-del', function (e) {
    e.stopPropagation()
    const name = $(this).closest('button').val()
    const presets = loadPresets().filter(p => p !== name)
    try {
        localStorage.setItem(PRESET_KEY, JSON.stringify(presets))
    } catch (error) { }
    renderPresets()
    showToast(`프리셋 "${name}" 삭제됨`)
});
$(document).on('click', '.nameoption', function () {
    option.className.value = $(this).val()
    $('.generrator').trigger('click')
});
$('#addpreset').on('click', function () {
    const v = option.className.value.trim()
    if (!v) return
    const presets = loadPresets()
    if (presets.includes(v) || ['bd-list', 'bd-reg', 'bd-view'].includes(v)) {
        showToast('이미 있는 프리셋')
        return
    }
    presets.push(v)
    try {
        localStorage.setItem(PRESET_KEY, JSON.stringify(presets))
    } catch (error) { }
    renderPresets()
    showToast(`프리셋 "${v}" 추가됨`)
});

/* 초기화 */
restoreOptions()
renderPresets()
