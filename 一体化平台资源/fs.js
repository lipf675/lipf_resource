
var fs_obj = {
	socket : null,
	// no_fs_auth: false,
	isConnect: false,
	kf: '',
	real_name: '',
	calls: [],
	curCalls: [],
	bridgeList: [],
	insertList: [],
	eavesdropList: [],
	curUserList: [],
	connectionNum: 0,
	connect: function(win,callback){
		fs_obj.win = win;
		if(fs_obj.socket){
            console.log("返回用户接待页面")
			callback()
			return false;
		}
		var socket_fs;
	    var calls = fs_obj.calls;
	    var curCalls = fs_obj.curCalls; 
	    var bridgeList = fs_obj.bridgeList;
	    var insertList = fs_obj.insertList;
	    var eavesdropList = fs_obj.eavesdropList;
	    var curUserList = fs_obj.curUserList;
	    // var connectionNum = fs_obj.connectionNum;
	    connectPhone();
	    function connectPhone(){
	    	$.ajax({
	    		type: 'get',
	    		url: '/get_acds/',
	    		dataType: 'json',
	    		async: false,
	    		success: function(res){
	    			var html = '<form class="layui-form" lay-filter="sel_phoneChair"><div class="layui-input-block" style="margin:10px;"><select id="sel_phoneChair">'
	    			for (var i = 0; i < res.data.length; i++) {
	    				html += '<option value="' + res.data[i].username + '">' + res.data[i].username + '</option>';
	    			}
	    			html += '</select></div></form>';
	    			fs_obj.win.layui.layer.open({
	    				type: 1,
	    				title: '选取座席',
	    				content: html,
	    				btn: ['确认'],
	    				area: ['300px','160px'],
	    				success: function (){
	    					fs_obj.win.layui.form.render('select',"sel_phoneChair");
	    				},
	    				yes: function(index){
	    					var agent = $(fs_obj.win.document.body).find("#sel_phoneChair").val();
	    					if(!agent){
	    						fs_obj.win.layui.layer.msg("请选择坐席");
	    						return false;
	    					}
	    					$.ajax({
	    						type: 'get',
					    		url: '/insert_acd_usr/'+agent,
					    		dataType: 'json',
					    		async: false,
					    		success:function(res){
					    			if(!res.success){
					    				fs_obj.win.layui.layer.msg(res.msg);

					    			}else{
					    				fs_obj.win.layui.layer.close(index);

					    				fs_obj.kf = agent;
							            console.log("选取坐席成功",fs_obj.kf,fs_obj.real_name)
							            connect()
					    			}
					    		}
	    					})
	    				}
	    			})
	    		}
	    	})
			function connect(){
                var url = (location.protocol === "https:" ? "wss:" : "ws:") + '//' + document.domain;
                // var url = 'ws://socket.vaiwan.com'
                if(location.port){
                    url += ':' + location.port;
                    // url += ':9034'
                }
                url += '/monitor/' + fs_obj.kf;
                // 创建一个Socket实例
                fs_obj.socket = new WebSocket(url);
                socket_fs = fs_obj.socket;
                // 打开Socket
                socket_fs.onopen = function(event) {
                	fs_obj.isConnect = true;
                    callback()  
                    console.log("fs连接成功");

                  //   if(win.location.href.slice(-11) === "customer_fs") {
                  //   	$(fs_obj.win.document.body).find('#state').html('');
	                 //    var telToolContainer = $(fs_obj.win.document.body).find(".div-voice-aio").parent();
	                 //    telToolContainer.next().show();
	                 //    $(fs_obj.win.document.body).find(".div-voice-aio").show();
	                 //    $(fs_obj.win.document.body).find("#sipno").text(fs_obj.kf);
	                 //    $(fs_obj.win.document.body).find("#realname").text(fs_obj.real_name)
	                 //    var msg = {
	                 //        operation: "状态",
	                 //        destination: fs_obj.kf
	                 //    }
	                 //    console.log(JSON.stringify(msg))
	                 //    socket_fs.send(JSON.stringify(msg))
                  //   }else{
                  //   	console.log("AI回访通道连接成功");
	                	// $(fs_obj.win.document.body).find("[lay-event=btn_callback_ai]").show();
                  //   }  
                    return false;
                };
                socket_fs.onerror = function(e) {
                    console.log("error!",e);
                }
                socket_fs.onmessage = function(msg) {
                    
                    var data = JSON.parse(msg.data);

                    var type = data.type;
                    if(type!=="heartbeatTimer"){
                        console.log("收到消息：" + msg.data);
                    }
                    switch (type) {
                        case "call_in":
                            if(calls.length >= 2) {//只显示2个元素
                                calls.splice(0, 1);
                            }
                            calls.push(data);
                            console.log('call_in calls:',calls)
                            break;
                        case "ep_change":
                            fs_obj.connectionNum = data.epNum;
                            break;
                        case "answer":
                            switch (data.answerType) {
                                case 'common':
                                    data.count = 0;
                                    // that.countTime(data);
                                    curCalls.push(data);
                                    console.log("answer_commen curCalls:",curCalls)

                                    var callee = data.callee;
                                    if(callee === fs_obj.kf){
                                        var oriCaller = data.oriCaller || data.caller;

                                        console.log("answer_commen called:" + oriCaller);
                                        curUserList.push(data)
                                        console.log("answer_commen curUserList:",curUserList)
                                        
                                        tel = oriCaller;
                                        // if(curUserList.length==1){
                                            $(fs_obj.win.document.body).find("#tel").val(oriCaller);
                                            //电话查询
                                            $.ajax({
                                                type: 'get',
                                                url: '/customer/yhyw/get_jl_dhcx/' + tel,
                                                dataType: 'json',
                                                success: function(json) {
                                                    if (!json.success) {
                                                        fs_obj.win.layui.layer.alert(json.msg, {
                                                            icon: 2
                                                        });
                                                        return;
                                                    }
                                                    fs_obj.win.layui.table.reload('tableid1', {
                                                        id: 'tableid1',
                                                        size: 'sm',
                                                        data: json.data // 调用table.reload 重新渲染显示加载追加了数据的表格
                                                            ,
                                                        page: {
                                                            curr: 1 //重新从第 1 页开始
                                                        }
                                                    });
                                                },
                                                error: function(msg) {
                                                    win.ajaxErr(msg)
                                                }

                                            });
                                        // }
                                    }
                                    break;
                                case 'bridge': //强拆
                                    var oriCaller = data.oriCaller||caller;
                                    console.log("answer_bridge called:" + oriCaller);
                                    curUserList.push(data);
                                    console.log("answer_bridge curUserList:",curUserList)
                                    tel = oriCaller;
                                    // if(curUserList.length==1){
                                        $(fs_obj.win.document.body).find("#tel").val(oriCaller);
                                        //电话查询
                                        $.ajax({
                                            type: 'get',
                                            url: '/customer/yhyw/get_jl_dhcx/' + tel,
                                            dataType: 'json',
                                            success: function(json) {
                                                if (!json.success) {
                                                    fs_obj.win.layui.layer.alert(json.msg, {
                                                        icon: 2
                                                    });
                                                    return;
                                                }
                                                fs_obj.win.layui.table.reload('tableid1', {
                                                    id: 'tableid1',
                                                    size: 'sm',
                                                    data: json.data // 调用table.reload 重新渲染显示加载追加了数据的表格
                                                        ,
                                                    page: {
                                                        curr: 1 //重新从第 1 页开始
                                                    }
                                                });
                                            },
                                            error: function(msg) {
                                                win.ajaxErr(msg)
                                            }

                                        });
                                    // }
                                    console.log("answer_bridge:" + data.oriCaller)
                                    bridgeList.push(data);
                                    console.log("answer_bridge bridgeList:",bridgeList)
                                    // var oriCaller = data.oriCaller;
                                    for(var index in curCalls) {
                                        var item = curCalls[index];
                                        if(item.caller == oriCaller) {
                                            item.bridge = true;
                                        }   
                                    }
                                    break;
                                case 'insert': //强插
                                    var oriCaller = data.oriCaller||caller;
                                    console.log("answer_insert called:" + oriCaller);
                                    curUserList.push(data);
                                    console.log("answer_insert curUserList:",curUserList)
                                    tel = oriCaller;
                                    // if(curUserList.length==1){
                                        $(fs_obj.win.document.body).find("#tel").val(oriCaller);
                                        //电话查询
                                        $.ajax({
                                            type: 'get',
                                            url: '/customer/yhyw/get_jl_dhcx/' + tel,
                                            dataType: 'json',
                                            success: function(json) {
                                                if (!json.success) {
                                                    fs_obj.win.layui.layer.alert(json.msg, {
                                                        icon: 2
                                                    });
                                                    return;
                                                }
                                                fs_obj.win.layui.table.reload('tableid1', {
                                                    id: 'tableid1',
                                                    size: 'sm',
                                                    data: json.data // 调用table.reload 重新渲染显示加载追加了数据的表格
                                                        ,
                                                    page: {
                                                        curr: 1 //重新从第 1 页开始
                                                    }
                                                });
                                            },
                                            error: function(msg) {
                                                win.ajaxErr(msg)
                                            }

                                        });
                                    // }
                                    console.log("answer_insert:" + data.oriCaller)
                                    insertList.push(data);
                                    console.log("answer_insert insertList:",insertList)
                                    var oriCaller = data.oriCaller;
                                    for(var index in curCalls) {
                                        var item = curCalls[index];
                                        if(item.caller == oriCaller) {
                                            item.insert = true;
                                        }
                                    }
                                    break;
                                case 'eavesdrop': //监听
                                    console.log("answer_eavesdrop:" + data.oriCaller)
                                    eavesdropList.push(data);
                                    console.log("answer_eavesdrop eavesdropList:",eavesdropList)
                                    var oriCaller = data.oriCaller;
                                    for(var index in curCalls) {
                                        var item = curCalls[index];
                                        if(item.caller == oriCaller) {
                                            item.eavesdrop = true;
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                            break;
                        case "hang_up":
                            var caller = data.caller; //来电人
                            var callee = data.callee; //接电人
                            console.log("hang_up callee:",callee);
                            for(var index in curCalls) {
                                var item = curCalls[index];
                                if(callee == item.callee) {//定位到当前通话,并删掉该条
                                    clearInterval(item.countFunc);
                                    curCalls.splice(index, 1);
                                    console.log("hang_up curCalls:",curCalls)
                                }
                            }
                            // //处理其余三种情况
                            for(var index in bridgeList) {
                                var item = bridgeList[index];
                                if(item.callee == callee) {
                                    for(var i in curCalls) {
                                        var call = curCalls[i];
                                        if(call.caller == item.oriCaller) {
                                            call.bridge = false;
                                        }
                                    }
                                    bridgeList.splice(index, 1);
                                    console.log("hang_up bridgeList:",bridgeList)
                                }
                            }
                            for(var index in insertList) {
                                var item = insertList[index];
                                if(item.callee == callee) {
                                    for(var i in curCalls) {
                                        var call = curCalls[i];
                                        if(call.caller == item.oriCaller) {
                                            call.insert = false;
                                        }
                                    }
                                    insertList.splice(index, 1);
                                    console.log("hang_up insertList:",insertList)
                                }
                            }
                            for(var index in eavesdropList) {
                                var item = eavesdropList[index];
                                if(item.callee == callee) {
                                    for(var i in curCalls) {
                                        var call = curCalls[i];
                                        if(call.caller == item.oriCaller) {
                                            call.eavesdrop = false;
                                        }
                                    }
                                    eavesdropList.splice(index, 1);
                                    console.log("hang_up eavesdropList:",eavesdropList)
                                }
                            }
                            for(var index in curUserList) {
                                var item = curUserList[index];
                                if(item.callee == callee && item.caller == caller) {
                                    curUserList.splice(index, 1);
                                    console.log("hang_up curUserList:",curUserList)
                                }
                            }
                            break;
                        case 'push_to_callee_answer':
                            // var oriCaller = data.oriCaller||caller;
                            // if(oriCaller == "bridge" || oriCaller == "insert"){
                            //     return false;
                            // }
                            // console.log("push_to_callee_answer called:" + oriCaller);
                            // curUserList.push(data);
                            // console.log("push_to_callee_answer curUserList:",curUserList)
                            // tel = oriCaller;
                            // if(curUserList.length==1){
                            //     $(fs_obj.win.document.body).find("#tel").val(oriCaller);
                            //     //电话查询
                            //     $.ajax({
                            //         type: 'get',
                            //         url: '/customer/yhyw/get_jl_dhcx/' + tel,
                            //         dataType: 'json',
                            //         success: function(json) {
                            //             if (!json.success) {
                            //                 fs_obj.win.layui.layer.alert(json.msg, {
                            //                     icon: 2
                            //                 });
                            //                 return;
                            //             }
                            //             fs_obj.win.layui.table.reload('tableid1', {
                            //                 id: 'tableid1',
                            //                 size: 'sm',
                            //                 data: json.data // 调用table.reload 重新渲染显示加载追加了数据的表格
                            //                     ,
                            //                 page: {
                            //                     curr: 1 //重新从第 1 页开始
                            //                 }
                            //             });
                            //         },
                            //         error: function(msg) {
                            //             win.ajaxErr(msg)
                            //         }

                            //     });
                            // }
                            break;
                        case 'acd_state':
                            $('#state').html('');
                            var telToolContainer = $(fs_obj.win.document.body).find(".div-voice-aio").parent();
                            telToolContainer.next().show();
                            $(fs_obj.win.document.body).find(".div-voice-aio").show();
                            $(fs_obj.win.document.body).find(".div-user").show();
                            $(fs_obj.win.document.body).find("#sipno").text(fs_obj.kf);
                            $(fs_obj.win.document.body).find("#realname").text(fs_obj.real_name)
                    		if(data.username == fs_obj.kf){
                    			if(data.state){
                    				$(fs_obj.win.document.body).find('#state').html('工作中');
                    				fs_obj.win.layui.layer.msg('坐席已开启工作模式');
                    			}else{
                    				$(fs_obj.win.document.body).find('#state').html('小休中');
                    				fs_obj.win.layui.layer.msg('坐席已开启小休模式');
                    			}
                    		}
                    		break;
                    	case 'satisfaction_gdhf':
                    		if(!data.success) {
                    			fs_obj.win.layui.layer.msg(data.taskid + '工单AI回访失败');
                    			break;
                    		}
                    		if(data.loginName == login_name) {
                    			fs_obj.win.layui.layer.msg(data.taskid + '工单AI回访已完成，用户' + data.satisfaction);
                    		}
                    		break;
                        case 'disconnect':
                            // if(data.username == fs_obj.kf){
                            //     console.log(fs_obj.kf+'close')
                            //     socket_fs.close()
                            // }
                            break;
                        case 'heartbeatTimer':
                            if(data.username == fs_obj.kf){
                                socket_fs.send("hb_client")
                            }
                            break;
                        default:
                            // console.log("default.." + type);
                            break;
                    }
                };
                // 监听Socket的关闭
                socket_fs.onclose = function(event) {
                    console.log(event)
                    fs_obj.socket = null
                    if(!fs_obj.isConnect){
                        $.ajax({
                            url:"/delete_acd_usr/"+fs_obj.kf,
                            method: "get",
                            dataType:'json',
                            success:function(res){
                                console.log('delete_acd_usr',fs_obj.kf)
                            }
                        })
                        

                    }
                	fs_obj.isConnect = false;
                    $(fs_obj.win.document.body).find('#state').html('断开连接，请刷新页面');
                    var telToolContainer =  $(fs_obj.win.document.body).find(".div-voice-aio").parent();
                    telToolContainer.next().hide();
                    $(fs_obj.win.document.body).find(".div-voice-aio").hide();
                    $(fs_obj.win.document.body).find(".div-user").hide();
                    $(fs_obj.win.document.body).find("[lay-event=btn_callback_ai]").hide();
                    reconnect&&clearTimeout(reconnect);
                    reconnect = setTimeout(function(){
                        if(!fs_obj.isConnect){
                            connectPhone()
                        }
                    },30000)
                    return false;
                };
                
                var reconnect;
                
            }
		}
		
	}
};
$.ajax({
    type: 'get',
    url: '/session/user/',
    dataType: 'json',
    async: false,
    cache: false,
    success: function(json) {
        fs_obj.real_name = json.real_name
    }
});