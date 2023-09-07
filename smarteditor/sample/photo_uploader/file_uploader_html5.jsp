<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"  errorPage="/cmmn/error.jsp" %>
<%@page import="site.unp.core.util.WebUtil"%>
<%@page import="java.util.Map"%>
<%@page import="java.io.File"%>
<%@page import="java.util.UUID"%>
<%@page import="java.io.InputStream" %>
<%@page import="java.io.OutputStream" %>
<%@page import="java.io.FileOutputStream" %>
<%@page import="java.util.Iterator"%>
<%@page import="org.apache.commons.fileupload.FileItem"%>
<%@page import="java.util.List"%>

<%@page import="org.apache.commons.fileupload.servlet.ServletFileUpload"%>
<%@page import="org.apache.commons.fileupload.disk.DiskFileItemFactory"%>

<%@ taglib uri="http://bibeault.org/tld/ccc" prefix="ccc" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<spring:eval expression="@prop['sftp.server.trnsmisAt']" var="trnsmisAt" scope="request" />
<%--
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
--%>
<%

org.springframework.context.ApplicationContext context =
org.springframework.web.context.support.WebApplicationContextUtils.getWebApplicationContext(getServletContext());

site.unp.core.conf.GlobalsProperties globalsProperties = (site.unp.core.conf.GlobalsProperties)context.getBean("globalsProperties");
site.unp.core.dao.SqlDAO sqlDAO = (site.unp.core.dao.SqlDAO)context.getBean("SqlDAO");
site.unp.core.ZValue zvl = new site.unp.core.ZValue();
//System.out.println(globalsProperties.getFileStorePath());


//파일 기본경로 _ 상세경로
String path = globalsProperties.getFileStorePath() + "/" + "editorUpload" + File.separator;

String sFileInfo = "";
//파일명 - 싱글파일업로드와 다르게 멀티파일업로드는 HEADER로 넘어옴
String name = request.getHeader("file-name");
String ext = name.substring(name.lastIndexOf(".")+1);

long fileSize = new Long(request.getContentLength());

//System.out.println("ext::" + ext.toLowerCase());
//[보안취약점]-2019-01-25 수정-start
if (!"jpg".equals(ext.toLowerCase()) && !"gif".equals(ext.toLowerCase()) && !"png".equals(ext.toLowerCase()) && !"bmp".equals(ext.toLowerCase())){
	out.println("NOTALLOW_" + name);
	return;
}
//3MB 보다 큰지 체크
else if (fileSize > 3000000) {
	out.println("LIMITFILESIZE_" + "3MB");
	return;
}
//[보안취약점]-2019-01-25 수정-end

path = WebUtil.filePathBlackList(path);
File file = new File(path);
if(!file.exists()) {
	if (!file.mkdirs()){
		//System.out.println(file + " :: Unable to create path!!");
	}
}
String editrFileId = UUID.randomUUID().toString();
String realname = editrFileId + "." + ext;
InputStream is = request.getInputStream();
OutputStream os=new FileOutputStream(WebUtil.filePathBlackList(path + realname));

zvl.put("editrFileId", editrFileId);
zvl.put("streFileNm", realname);
zvl.put("fileStreCours", path);
zvl.put("orignlFileNm", name);
zvl.put("fileSize", fileSize);

try{
	int numRead;
	//파일쓰기
	byte b[] = new byte[Integer.parseInt(request.getHeader("file-size"))];
	//System.out.println(is.read(b,0,b.length));
	while((numRead = is.read(b,0,b.length)) != -1){
	  os.write(b,0,numRead);
	}
	if(is != null) {
	  is.close();
	}
	os.flush();
	os.close();
	//sFileInfo += "&bNewLine=false&sFileName="+ name+"&sFileURL="+"/editorUpload/"+realname;
	sFileInfo += "&bNewLine=true&sFileName="+ name+"&sFileURL="+"/cmmn/file/editorImage.do?filename||" + realname;
	System.out.println(sFileInfo);
	out.println(sFileInfo);

	// sftp 전송이 Y인 경우 전송
	site.unp.cms.util.SFTPSender sftpSender = (site.unp.cms.util.SFTPSender)context.getBean("sftpSender");
	//System.out.println(sftpSender.getTrnsmisAt());
	if (sftpSender.getTrnsmisAt().equals("Y")){
		sftpSender.sendFileToOtherServer(path + realname, "/webapp/editorUpload", realname);
	}

	sqlDAO.save("saveEditrFile", zvl);

} catch (Exception e){
	System.out.println(e.toString());
} finally {
	if (is!=null){ try { is.close();} catch (Exception e) {	e.printStackTrace();}}
	if (os!=null){ try { os.flush(); os.close();} catch (Exception e) {	e.printStackTrace();}}
}
%>
<%--
</body>
</html>
--%>