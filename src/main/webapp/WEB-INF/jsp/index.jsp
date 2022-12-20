<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Test</title>

    <script src="https://code.jquery.com/jquery-3.6.2.js" integrity="sha256-pkn2CUZmheSeyssYw3vMp1+xyub4m+e+QK4sQskvuo4=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<c:url value="/WEB-INF/js/main.js"/>" ></script>

    <link rel="stylesheet" type="text/css" href="<c:url value="/WEB-INF/css/reset.css"/>">
</head>
<body>

    큐브 테스트

    <form name="api_form">
        <label>Key <input type="text" name="api_key"></label>
        <label>Count <input type="text" name="api_count" value="100"></label>
        <label>Date <input type="text" name="api_date"></label>
        <label>Cursor <input type="text" name="api_cursor"></label>
    </form>

    <button id="btn1">전송</button>

    <span id="total_cnt"></span>
    <div id="view_area"></div>

</body>
</html>