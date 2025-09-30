const SAMPLEHTML = `<p></p><table class="__se_tbl_ext" border="0" cellpadding="0" cellspacing="0" width="626" style="border-collapse:
 collapse;width:470pt;mso-yfti-tbllook:1056">
 <colgroup><col width="45" style="mso-width-source:userset;width:34pt">
 <col width="197" style="mso-width-source:userset;width:148pt">
 <col width="55" style="mso-width-source:userset;width:42pt">
 <col width="156" style="mso-width-source:userset;width:117pt">
 <col width="69" style="mso-width-source:userset;width:52pt">
 <col width="103" style="mso-width-source:userset;width:78pt">
 </colgroup><tbody><tr height="33" style="mso-height-source:userset;height:24.51pt">
  <td height="33" class="oa1" width="45" style="border-top:1.0pt solid black;
	border-right:1px solid black;
	border-bottom:1px solid black;
	border-left:1px solid black;
	background:#D9D9D9;
	mso-pattern:auto none;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; height:24.51pt;width:34pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 9pt; font-family: 나눔고딕; font-weight: bold;">번호</span></p>
  </td>
  <td class="oa1" width="197" style="height:24.51pt; border-top:1.0pt solid black;
	border-right:1px solid black;
	border-bottom:1px solid black;
	border-left:1px solid black;
	background:#D9D9D9;
	mso-pattern:auto none;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:148pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 9pt; font-family: 나눔고딕; font-weight: bold;">신청사업명</span></p>
  </td>
  <td class="oa1" width="55" style="height:24.51pt; border-top:1.0pt solid black;
	border-right:1px solid black;
	border-bottom:1px solid black;
	border-left:1px solid black;
	background:#D9D9D9;
	mso-pattern:auto none;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:42pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 9pt; font-family: 나눔고딕; font-weight: bold;">회차</span></p>
  </td>
  <td class="oa1" width="156" style="height:24.51pt; border-top:1.0pt solid black;
	border-right:1px solid black;
	border-bottom:1px solid black;
	border-left:1px solid black;
	background:#D9D9D9;
	mso-pattern:auto none;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:117pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 9pt; font-family: 나눔고딕; font-weight: bold;">신청기간</span></p>
  </td>
  <td class="oa1" width="69" style="height:24.51pt; border-top:1.0pt solid black;
	border-right:1px solid black;
	border-bottom:1px solid black;
	border-left:1px solid black;
	background:#D9D9D9;
	mso-pattern:auto none;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:52pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 9pt; font-family: 나눔고딕; font-weight: bold;">신청상태</span></p>
  </td>
  <td class="oa1" width="103" style="height:24.51pt; border-top:1.0pt solid black;
	border-right:1px solid black;
	border-bottom:1px solid black;
	border-left:1px solid black;
	background:#D9D9D9;
	mso-pattern:auto none;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:78pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 9pt; font-family: 나눔고딕; font-weight: bold;">상호의무약정서</span></p>
  </td>
 </tr>
 <tr height="33" style="mso-height-source:userset;height:24.51pt">
  <td height="33" class="oa2" width="45" style="border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; height:24.51pt;width:34pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">3</span></p>
  </td>
  <td class="oa2" width="197" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:148pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><u><span style="font-size:8.0pt;font-family:나눔고딕;mso-ascii-font-family:
  나눔고딕;mso-fareast-font-family:나눔고딕;color:#0070C0;mso-font-kerning:12.0pt;
  language:ko;font-weight:bold;mso-style-textfill-type:solid;mso-style-textfill-fill-color:
  #0070C0;mso-style-textfill-fill-alpha:100.0%">중소기업청년노동자지원사업</span></u></p>
  </td>
  <td class="oa2" width="55" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:42pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">11</span><span style="font-size: 8pt; font-family: 나눔고딕;">차</span></p>
  </td>
  <td class="oa2" width="156" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:117pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">2024-11-11
  ~ 2024-11-27</span></p>
  </td>
  <td class="oa2" width="69" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:52pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">순위선발</span></p>
  </td>
  <td class="oa2" width="103" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:78pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"></p>
  </td>
 </tr>
 <tr height="33" style="mso-height-source:userset;height:24.51pt">
  <td height="33" class="oa2" width="45" style="border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; height:24.51pt;width:34pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">2</span></p>
  </td>
  <td class="oa2" width="197" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:148pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><u><span style="font-size:8.0pt;font-family:나눔고딕;mso-ascii-font-family:
  나눔고딕;mso-fareast-font-family:나눔고딕;color:#0070C0;mso-font-kerning:12.0pt;
  language:ko;font-weight:bold;mso-style-textfill-type:solid;mso-style-textfill-fill-color:
  #0070C0;mso-style-textfill-fill-alpha:100.0%">청년복지포인트</span></u></p>
  </td>
  <td class="oa2" width="55" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:42pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">28</span><span style="font-size: 8pt; font-family: 나눔고딕;">차</span></p>
  </td>
  <td class="oa2" width="156" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:117pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; letter-spacing: 0pt; vertical-align: baseline;">2024-11-11 ~ 2024-11-27</span></p>
  </td>
  <td class="oa2" width="69" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:52pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; letter-spacing: 0pt; vertical-align: baseline;">순위선발</span></p>
  </td>
  <td class="oa2" width="103" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:78pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"></p>
  </td>
 </tr>
 <tr height="33" style="mso-height-source:userset;height:24.51pt">
  <td height="33" class="oa2" width="45" style="border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; height:24.51pt;width:34pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">1</span></p>
  </td>
  <td class="oa2" width="197" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:148pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><u><span style="font-size:8.0pt;font-family:나눔고딕;mso-ascii-font-family:
  나눔고딕;mso-fareast-font-family:나눔고딕;color:#0070C0;mso-font-kerning:12.0pt;
  language:ko;font-weight:bold;mso-style-textfill-type:solid;mso-style-textfill-fill-color:
  #0070C0;mso-style-textfill-fill-alpha:100.0%">청년연금</span></u></p>
  </td>
  <td class="oa2" width="55" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:42pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">2</span><span style="font-size: 8pt; font-family: 나눔고딕;">차</span></p>
  </td>
  <td class="oa2" width="156" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:117pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕; font-variant-numeric: normal; font-variant-east-asian: normal; font-variant-alternates: normal; font-variant-position: normal; font-variant-emoji: normal; letter-spacing: 0pt; vertical-align: baseline;">2024-11-11 ~ 2024-11-27</span></p>
  </td>
  <td class="oa2" width="69" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:52pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">정상</span></p>
  </td>
  <td class="oa2" width="103" style="height:24.51pt; border:1px solid black;
	text-align:center;
	vertical-align:middle;
	padding-bottom:3.6pt;
	padding-left:7.2pt;
	padding-top:3.6pt;
	padding-right:7.2pt; width:78pt">
  <p style="language:ko;margin-top:0pt;margin-bottom:0pt;margin-left:0in;
  text-align:center;direction:ltr;unicode-bidi:embed;mso-line-break-override:
  none;word-break:break-hangul;punctuation-wrap:hanging"><span style="font-size: 8pt; font-family: 나눔고딕;">-</span></p>
  </td>
 </tr>
</tbody></table><p><br></p>`