# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

HTML 소스(주로 워드/한글 문서에서 붙여넣은 표)를 웹 접근성에 맞는 정제된 마크업으로 변환하는 단일 페이지 도구("autohtml"). 네이버 SmartEditor2에 원본을 붙여넣고 옵션을 선택하면 변환된 HTML이 출력 textarea에 생성되고 자동으로 클립보드에 복사된다.

## 실행 방법

- 빌드 시스템, 패키지 매니저, 테스트가 없는 순수 정적 프로젝트. `index.html`을 로컬 서버로 열면 된다.
- VS Code Live Server 사용 시 포트 5502로 설정되어 있음(`.vscode/settings.json`). SmartEditor2가 iframe으로 로드되므로 `file://`이 아닌 HTTP 서버로 실행해야 한다.
- `scss/default.scss` → `css/default.css`는 별도 SCSS 컴파일러(Live Sass Compiler 등)로 생성. CSS를 수정할 땐 SCSS를 수정한다.

## 구조

핵심 코드는 두 파일뿐이다:

- `index.html` — UI 레이아웃, 변환 옵션 폼(`form[name=option]`), SmartEditor2 초기화, Google Analytics 태그.
- `goddamTransforce.js` — 모든 변환 로직. jQuery 기반.

나머지는 벤더/보조 파일:

- `smarteditor/` — 네이버 SmartEditor2 (벤더, 수정 금지). `oEditors.getById["nttCn"].getIR()`로 에디터 내용을 읽는다.
- `ckeditor/` — CKEditor 4 (벤더). 메인 페이지에서는 쓰지 않고 `_index.html` 테스트 페이지에서만 사용.
- `sample.js` — 테스트용 샘플 HTML 상수.
- `editor.zip` — 배포용 아카이브(git 미추적).

## 변환 동작 방식 (goddamTransforce.js)

1. 에디터 내용을 숨겨진 `#input` textarea → 숨겨진 `#html` div에 넣고, 그 DOM을 jQuery로 직접 조작해 변환한다.
2. `removeAttrs()`가 모든 요소의 속성을 제거하되 `removeAttrFilters`(현재 `rowspan`, `colspan`)에 있는 것만 보존한다. `col` 요소는 예외로 width가 %로 재계산되어 유지된다.
3. `option.todl` 라디오 값에 따라 테이블 변환 모드가 갈린다:
   - `merge` — 여러 table을 첫 table의 tbody로 병합 후 thead/caption 생성
   - `col`(default) — 첫 행을 thead/th로 승격, caption·colgroup 정리
   - `dl` — table을 `dl > dt + dd` 구조로 치환 (col/colgroup, rowspan/colspan 제거)
   - `rowtable` — "th 열 번호" 입력(쉼표 구분, 예: `1,3,5`)에 지정된 열의 td를 `th scope="row"`로 변환
4. 접근성 처리: caption 입력값이 `<caption>`으로 삽입되고, thead의 th에는 `scope="col"`, rowtable의 th에는 `scope="row"`가 자동 부여된다.
5. 후처리: `*` 문자를 필수입력 표시 span으로, `●`/`○`는 radio로, `■`/`□`는 checkbox로 치환(`generrator.toRadio/toCheckbox`). "오피스 잔재 정리" 옵션은 `officeClean()`으로 `<o:p>`·MSO 주석·곡선따옴표·전각공백·zero-width 문자를 정규화한다. 최종 결과는 `html_beautify`(CDN 로드)로 정렬 후 클립보드에 복사(`copyOutput()`: navigator.clipboard 우선, execCommand 폴백, 토스트 표시).
6. 결과는 항상 `<div class="{wrapper class}">`로 감싸진다(기본 `bd-list`).
7. 변환 시 `analyzeTables()`가 원본 표를 검사해 행별 열 개수 불일치(colspan/rowspan 반영)·빈 셀·이미지 발견을 `#warnings`에 표시하고, 결과는 `#outputhtml` 미리보기 패널에 스타일 적용되어 렌더링된다.
8. 이미지 옵션: 유지(기본, 표 안 이미지는 텍스트 변환에서 제거됨)/삭제/빈 placeholder(`<img src="" alt="">`, 셀 안에서도 보존). `removeAttrs()`는 img에 한해 src·alt를 추가 보존한다.

옵션 상태와 wrapper class 프리셋은 localStorage에 저장된다(키: `autohtml.options`, `autohtml.presets`) — 페이지 로드 시 `restoreOptions()`/`renderPresets()`로 복원.

주의: 옵션 체크박스·라디오·select 변경이나 wrapper class 변경 시 변환 버튼이 자동으로 재트리거된다. 전역 변수(`outputSouce`, `option`, `oEditors`)에 의존하는 구조이므로 함수 분리 시 주의. 프리셋 버튼은 동적 생성이라 `.nameoption`/`.preset-del` 클릭은 document에 위임 바인딩되어 있다.

## 커밋 컨벤션

커밋 메시지는 한국어로 짧게 작성한다 (예: "table merge 기능 추가", "속성삭제 추가").
