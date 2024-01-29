/*
 *修改日期:2021/04/13
**/
function getdate(date) {
    var now = new Date(date),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8);
}


//获取id封装成一个函数$()方便调用
function xxx(id) {
    //如果传入的参数类型为字符串则获取当前ID元素，否则返回id
    return typeof id === "string" ? document.getElementById(id) : id;

}

//把标准时间转换成yyyy-mm-dd
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);

}


//获取采暖期年月日，格式YYYY-MM-DD
function getNowFormatDNQDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    if (month > 4 && month < 10) {
        month = "04";
    }

    if (month == 4 && strDate > 20) {
        strDate = "20";
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function getNowFormatCNQDateR() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }

    if (month > 4 && month < 10) {
        month = "04";
    }
    var currentdate = year + seperator1 + month;
    return currentdate;
}


//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}


//获取当前时间，格式YYYY-MM-DD HH:MI:SS
function getNowFormatDateTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}

//获取当前时间上一天，格式YYYY-MM-DD HH:MI:SS
function getNowFormatDateTimeS() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate() - 1;
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}


//获取前后r天的数据，格式YYYY-MM-DD
function getNowFormatDateR(date, r) {
    var myDate = new Date(date);
    myDate.setDate(myDate.getDate() + r);
    var seperator1 = "-";
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var strDate = myDate.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;

}
// ajax error方法基础
function ajaxErr(msg,callAfter,deep){
    if(!callAfter){callAfter=true;}
    if(!deep){deep=1;}  
    const after=callAfter?()=>{layer.alert("网络正忙，请稍后重试！", {icon: 2});}:()=>{}
    if (msg.responseText == "sss") {
        layer.alert("登录超时，请重新登录", {
            icon: 2
        }, function(index) {
            if(deep==1){
                window.parent.location.href="/logout/?a="+Math.random();
            }else{
                window.parent.parent.location.href="/logout/?a="+Math.random();
            }
        });
        return false;
    }
    after()
}
// 设置图表时间轴
function setChartOption(){
    Highcharts.setOptions({
        lang: {
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        global: { useUTC: false }
    });
}
// 普通导出
function export_excel(table,tableid,exportData,dataFilter){
    var tabData = layui.table.cache[tableid]; //获取table所有数据
    if (tabData.length == 0) {
        layer.alert("数据为空无法导出！", {
            icon: 2
        });
        return;
    }
    dataFilter(exportData)
    table.exportFile(tableid, exportData, 'xls');
}
// 插件导出
function export_excel2({title,datas}){
    var xlsCol=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ"];
    var excel=layui.excel;

    var dataLeng=0;
    for(let i=0;i<datas.length;i++){
        dataLeng+=layui.table.cache[datas[i].tableid].length; //获取table所有数据
    }
    if (dataLeng == 0) {
        layer.alert("数据为空无法导出！", {
            icon: 2
        });
        return false;
    }
    var export_data={};
    var export_extend={};
    for(var i=0;i<datas.length;i++){
        var data=datas[i]
        // datas:[{tableid,col,row,field,headTitle,data,sheetname,merge}]
        // 列处理
        var colW={};
        var colCommen=data.col.commen;
        delete data.col.commen;
        for (var key in data.col){
            colW[xlsCol[data.field.indexOf(key)]]=data.col[key]
        }
        data.col=excel.makeColConfig(colW,colCommen);
        // 行处理
        var rowH={};
        var rowCommen=data.row.commen;
        delete data.row.commen;
        rowH=data.row;
        data.row = excel.makeRowConfig(rowH,rowCommen);
        // 合并处理
        if(!data.merge){
            data.merge=[];
        }else{
            var merge=[];
            for(var j=0;j<data.merge.length;j++){
                var arr=data.merge[j];
                merge.push([xlsCol[data.field.indexOf(arr[0].col)]+arr[0].row,xlsCol[data.field.indexOf(arr[1].col)]+arr[1].row])
            }
            data.merge=merge;
            console.log(merge)
        }
        data.merge=excel.makeMergeConfig(data.merge)
        // 梳理前置
        if(!data.fieldSort){
            data.fieldSort=data.field;
        }else{
            var fieldSort={};
            for(var k=0;k<data.field.length;k++){
                if(!data.fieldSort[data.field[k]]){
                    fieldSort[data.field[k]]=data.field[k]
                }else{
                    fieldSort[data.field[k]]=data.fieldSort[data.field[k]]
                }
            }
            data.fieldSort=fieldSort;
        }
        //表格数据梳理
        data.data = excel.filterExportData(data.data, data.fieldSort);
        //表格数据
        data.headTitle = data.headTitle.concat(data.data);
        
        
        //批量设置单元格样式
        excel.setExportCellStyle(data.headTitle, 'A1:'+xlsCol[data.field.length-1] + data.headTitle.length, {
            s: {
                numFmt: "0", //保留原有数据，不进行保留小数点后一位操作
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                }
            }
        }, function(cell, newCell, row, config, currentRow, currentCol, fieldKey) {
            return newCell;
        })
        export_data[data['sheetname']]=data.headTitle;
        export_extend[data['sheetname']]={
            '!merges': data.merge,
            '!cols': data.col,
            '!rows': data.row
        }
    }
    //导出
    excel.exportExcel(export_data, title + '.xlsx', 'xlsx', {
        extend: export_extend
    })
}
// 插件导出样式完善
function export_excel3({title,datas}){
    var xlsCol=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","AA", "AB", "AC", "AD", "AE", "AF", "AG", "AH", "AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU", "AV", "AW", "AX", "AY", "AZ"];
    var excel=layui.excel;

    var dataLeng=0;
    for(let i=0;i<datas.length;i++){
        dataLeng+=layui.table.cache[datas[i].tableid].length; //获取table所有数据
    }
    if (dataLeng == 0) {
        layer.alert("数据为空无法导出！", {
            icon: 2
        });
        return false;
    }
    var export_data={};
    var export_extend={};
    for(var i=0;i<datas.length;i++){
        var data=datas[i]
        // datas:[{tableid,col,row,field,headTitle,data,sheetname,merge}]
        // 列处理
        var colW={};
        var colCommen=data.col.commen;
        delete data.col.commen;
        for (var key in data.col){
            colW[xlsCol[data.field.indexOf(key)]]=data.col[key]
        }
        data.col=excel.makeColConfig(colW,colCommen);
        // 行处理
        var rowH={};
        var rowCommen=data.row.commen;
        delete data.row.commen;
        rowH=data.row;
        data.row = excel.makeRowConfig(rowH,rowCommen);

        // 合并处理
        if(!data.merge){
            data.merge=[];
        }else{
            var merge=[];
            for(var j=0;j<data.merge.length;j++){
                var arr=data.merge[j];
                merge.push([xlsCol[data.field.indexOf(arr[0].col)]+arr[0].row,xlsCol[data.field.indexOf(arr[1].col)]+arr[1].row])
            }
            data.merge=merge;
        }
        data.merge=excel.makeMergeConfig(data.merge)
        // 梳理前置
        if(!data.fieldSort){
            data.fieldSort=data.field;
        }else{
            var fieldSort={};
            for(var k=0;k<data.field.length;k++){
                if(!data.fieldSort[data.field[k]]){
                    fieldSort[data.field[k]]=data.field[k]
                }else{
                    fieldSort[data.field[k]]=data.fieldSort[data.field[k]]
                }
            }
            data.fieldSort=fieldSort;
        }
        //表格数据梳理
        data.data = excel.filterExportData(data.data, data.fieldSort);
        //表格数据
        data.headTitle = data.headTitle.concat(data.data);

        //批量设置单元格样式
        
        excel.setExportCellStyle(data.headTitle,'A1:'+xlsCol[data.field.length-1] + data.headTitle.length,{
            s:{
                numFmt: "0", //保留原有数据，不进行保留小数点后一位操作
                alignment: {
                    horizontal: 'center',
                    vertical: 'center'
                }
            }
        }, function(cell, newCell, row, config, currentRow, currentCol, fieldKey) {
            return newCell;
        })

        if(data.style){
            for(let i=0;i<data.style.length;i++){
                let obj=data.style[i];
                excel.setExportCellStyle(data.headTitle,xlsCol[data.field.indexOf(obj.start.col)]+obj.start.row+':'+xlsCol[data.field.indexOf(obj.end.col)]+obj.end.row,{
                    s:obj.style
                }, function(cell, newCell, row, config, currentRow, currentCol, fieldKey) {
                    return newCell;
                })
            }
        }
    
        export_data[data['sheetname']]=data.headTitle;
        export_extend[data['sheetname']]={
            '!merges': data.merge,
            '!cols': data.col,
            '!rows': data.row
        }
    }
    //导出
    excel.exportExcel(export_data, title + '.xlsx', 'xlsx', {
        extend: export_extend
    })
}
// 时间区间校验
function timeVerify(kssj,jssj){
    var $=layui.$
    var [$kssj,$jssj]=[$(kssj).val(),$(jssj).val()];
    if ($kssj == '') {
        layer.msg('请选择开始时间！');
        return {kssj:""};
    }
    if ($jssj == '') {
        layer.msg('请选择结束时间！');
        return {kssj:""};
    }
    if ($kssj> $jssj) {
        layer.msg("开始时间不能在结束时间之后，请重新选择！");
        $(kssj).val('');
        return {kssj:""};
    }
    return {kssj:$kssj,jssj:$jssj}
}
function timeVerify2(kssj,jssj,type,attr_ks,attr_js){
    let { $, form } = layui;
    let verifyObj = {};
    verifyObj[attr_ks || 'ksrq'] = function (value) {
        let [ $kssj, $jssj ] = [ $(kssj).val(), $(jssj).val() ];
        if (!$kssj && !$jssj) {
            let tip = "请填写开始日期"
            return type == 'datetime' ? tip.replaceAll('日期', '时间') : tip;
        }
        if($jssj !== ""){
            if($kssj == ""){
                let tip = "请填写开始日期"
                return type == 'datetime' ? tip.replaceAll('日期', '时间') : tip;
            } else if ($jssj < $kssj) {
                $(kssj).val("")
                let tip = "开始日期不能在结束日期之后";
                return type == 'datetime' ? tip.replaceAll('日期', '时间') : tip;
            }
        }
    };
    verifyObj[attr_js || 'jsrq'] = function (value) {
        let [ $kssj, $jssj ] = [ $(kssj).val(), $(jssj).val() ];
        if($kssj != "") {
            if($jssj == ""){
                let tip = "请填写结束日期";
                return type == 'datetime' ? tip.replaceAll('日期', '时间') : tip;
            } else {
                let begindate = new Date($kssj)
                let enddate = new Date($jssj)
                enddate.setFullYear(enddate.getFullYear() - 1);

                if (enddate > begindate) {
                    $(jssj).val('')
                    return "查询时间间隔不能超过一年"
                }
            }
        }
    }
    form.verify(verifyObj);
}
// 下拉渲染
function getSel({url,elem,val,text,form,filter,type,initValueIdx,initValue,initText,emptyText,nullText}) {
    // 接口 | 元素 | option value | option 文字 | 表单filter | 选择类型 | 初始值index | 初始值 |  初始值展示 | 请选择等 |  无数据
    var $=layui.$
    $(elem).empty();
    $.ajax({
        type: "get",
        url: url,
        async: false,
        dataType: "json",
        error: function(msg) {
            ajaxErr(msg)
        },
        success: function(json) {
            var data = json.data;
            //向select中append、option标签
            var optionString = '';
            if(emptyText){
                optionString+='<option value="">'+emptyText+'</option>'
            }
            if(initValueIdx<0){
                initValueIdx+=data.length;
            }
            for (var i = 0; i < data.length; i++) { //遍历，动态赋值
                if (i === initValueIdx) {
                    optionString += '<option selected = "selected" value="' + data[i][val] + '">' + data[i][text] + '</option>'; //动态添加数据
                } else if (data[i][val] === initValue) {
                    optionString += '<option selected = "selected" value="' + data[i][val] + '">' + data[i][text] + '</option>'; //动态添加数据
                } else if (data[i][text] === initText) {
                    optionString += '<option selected = "selected" value="' + data[i][val] + '">' + data[i][text] + '</option>'; //动态添加数据
                } else {
                    optionString += '<option value="' + data[i][val] + '">' + data[i][text] + '</option>'; //动态添加数据
                }
            }
            if(nullText&&data.length==0){
                optionString='<option value="">无数据可供选择</option>'
            }
            $(elem).append(optionString); // 为当前name为asd的select添加数据。
            if(initValue===""){
                $(elem).val("")
            }
            form.render('select', filter);
            
        }
    });
}

function rowClickToChecked(){
    var $=layui.$,
        table=layui.table;
        //点击行checkbox选中
    $(document).on("click", ".layui-table-body table.layui-table tbody tr td", function() {
        if ($(this).attr("data-field") === 'cz') {
            return;
        }
        var index = $(this).parent().attr('data-index');
        var tableBox = $(this).parent().parents('.layui-table-box');
        //存在固定列
        if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length > 0) {
            tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
        } else {
            tableDiv = tableBox.find(".layui-table-body.layui-table-main");
        }
        var checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
        if (checkCell.length > 0) {
            checkCell.click();
        }
        var checkCell2 = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-radio div.layui-form-radio I");
        if (checkCell2.length > 0) {
            checkCell2.click();
        }
    });

    $(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox,td div.laytable-cell-radio div.layui-form-radio", function(e) {
        e.stopPropagation();
    });
}

function geUTCDateTime(date) {
    if(!date){return '';}
    var date = new Date(date);
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var strDate = date.getUTCDate();
    var hour = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    var minute = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    var second = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + minute + seperator2 + second;
    return currentdate;
}
//获取UTC时间，格式Y年M月D日H时M分s秒
function geUTCDateTimeCh(date,type) {
    if(!date){return '';}
    var currentdate='';
    var date = new Date(date);
    var year = date.getUTCFullYear();
    currentdate+=year+'年';
    if(type!="年"){
        var month = date.getUTCMonth() + 1;
        currentdate+=month+'月';
        if(type!="月"){
            var strDate = date.getUTCDate();
            currentdate+=strDate+'日';
            if(type!="日"){
                var hour = date.getUTCHours();
                currentdate+=hour+'时';
                if(type!="时"){
                    var minute = date.getUTCMinutes();
                    currentdate+=minute+'分';
                    if(type!="分"){
                        var second = date.getUTCSeconds();
                        currentdate+=second+'秒';
                    }
                }
            }
        }
    }
    return currentdate;
}
function down(url,name){
    var a = document.createElement("a");
    if (!name) {
        name = url.split("/");
        name = name[name.length-1];
    }
    a.download = name;
    a.href = url;
    $("body").append(a); // 修复firefox中无法触发click
    a.click();
    $(a).remove();
}
function mul_sel_render(obj) {
    var xmSelect = layui.xmSelect;
    // url,value,name,obj,elem,search
    obj.search = obj.search || false;
    obj.sel.value = xmSelect.render({
        toolbar: { show: true },
        el: obj.elem,
        data: [],
        initValue:[],
        filterable: obj.search,
    })
    $.ajax({
        type: 'get',
        url: obj.url,
        dataType: 'json',
        success: function(json) {
            if(json.success == true) {
                var beanList=json.data;

                for (var i = 0; i < beanList.length; i++) {
                    beanList[i].value=beanList[i][obj.value];
                    beanList[i].name=beanList[i][obj.name];
                }

                obj.sel.value.update({
                    data:beanList,
                })
            }
        },
        error: function(msg) {
            ajaxErr(msg)
        }
    });
}