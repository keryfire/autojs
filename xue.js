// 在控制台输出 开始
toastLog("开始");



/**
 * 视频播放
 * 优先播放5个视频，每个视频播放10秒+随机
 * 剩余一个视频播放电台
 */
function 视频播放(){
    //进入百灵
    console.info("开始视频播放")
    console.log("等待百灵出现");    
    let w = id("home_bottom_tab_button_ding").findOne(8000);
    if (w == null){
        //因不能查到百灵，虽界面存在，可能是一个BUG，需要进入学习积分后再返回才能查到
        console.log("未发现百灵，开始查找积分");
        let w1 = id("comm_head_xuexi_score").findOne(8000);
        if(w1 != null){
            console.log("发现积分，点击进入");
            sleep(随机等待(1));
            w1.click();
            console.log("开始返回");
            sleep(随机等待(1));
            back();
        }
    }
    w = id("home_bottom_tab_button_ding").findOne(8000);
    if(w !=null){
       console.log("发现百灵，开始点击进入")
       sleep(随机等待(1));
       w.click();
       sleep(随机等待(1));
       w.click();
    }
    else{
       console.error("程序出错，未发现百灵，视频无法播放！");
       return 0;
    }
    //点击第一个视频
    sleep(随机等待(5));
    // @ts-ignore
    className("android.widget.FrameLayout").depth(25).findOnce(0).click();
    for(let i = 1 ; i<7;i++){
       //每播放一个视频等待10秒+随机
       sleep(随机等待(10));
       console.log("播放下个视频"+i);
       refresh(true);
    }
    back();
     
}
//

/**
 * 1、点击电台
 * 2、播放
 * 
 */
function 播放电台(){
    console.log("开始查找电台");
    let w = id("home_bottom_tab_button_mine").findOne(8000);
    if (w == null){
        //因不能查到电台，虽界面存在，可能是一个BUG，需要进入学习积分后再返回才能查到
        console.log("未发现电台，开始查找积分");
        let w1 = id("comm_head_xuexi_score").findOne(8000);
        if(w1 != null){
            console.log("发现积分，点击进入");
            sleep(随机等待(1));
            w1.click();
            console.log("开始返回");
            sleep(随机等待(1));
            back();
        }
        else{
            console.error("未发现积分，请手动点击积分后再返回。");
        }
    }
    w = id("home_bottom_tab_button_mine").findOne(8000);
    if(w !=null){
       console.log("发现电台，开始点击进入")
       sleep(随机等待(1));
       w.click();
       sleep(随机等待(1));
       w.click();
    }
    else{
       console.error("程序出错，未发现电台，无法播放电台！");
       return false;
    }
    //点击指定电台
    sleep(随机等待(5));
    console.log("查找听广播");
    let text_w = className("android.widget.TextView").text("听广播").findOne(8000);
    if(text_w != null){
        console.log("发现听广播，开始进入");
        sleep(随机等待(1));
        // @ts-ignore
        text_w.parent().click();
        sleep(随机等待(1));
        console.log("点击播放！");
        let w2 = id("lay_state_icon").findOne(8000);
        sleep(随机等待(1));
        if(w2 != null){
            // @ts-ignore
            w2.parent().parent().click();
            sleep(随机等待(1));
            back();
            sleep(随机等待(1));
        }
        else{
            console.error("未发现播放按钮");
            return false;
        }
    }
}


/**
*阅读文章
*1、定位到省
*2、界面固定元素：切换地区
*/
function 阅读文章(){
    console.log("等待界面出现！");
    let w = id("comm_head_xuexi_score").findOne(15000);//判断积分是否出现，如果出现表示界面正常
    if( w != null){
        console.log("当前界面正常！");
    }
    else return false;
    //从积分进入阅读文章
    let w_score = id("comm_head_xuexi_score").findOne(8000);
    if(w_score != null){
        console.log("发现积分，点击进入");
        sleep(随机等待(1));
        w_score.click();
        console.log("点击我要选读文章");
        sleep(随机等待(1));
        let w_wz = className("android.widget.ListView").depth(23).findOne(8000);
        if(w_wz!=null){
            console.log("点击去看看");
            sleep(随机等待(1));
            // @ts-ignore
            w_wz.child(1).child(4).click();
            sleep(随机等待(1));
        }
    }
    else{
        console.error("未发现积分，请手动点击积分后再返回。");
    }

    //切换到省，这个容易出错，固定位置时是正确，改变位置后会失效
    // @ts-ignore
    className("android.view.ViewGroup").depth(15).findOnce(2).child(5).click(); 
    console.log("判断“切换地区”是否出现？");
    w = text("切换地区").findOne(20000);
    if( w != null){
        console.log("“切换地区”已出现");
        sleep(随机等待(4));
        //获取文章数量
        let w1 = null;
        let num_ = 0;//设置获取页面文章数量初始数量
        let count = 0;//设置文章起始数量
        while(count < 6){
            w1 = id("general_card_title_id").find();
            num_ = w1.length;
            console.log("当前页面文章数量"+num_);
            if(num_ == 0){
                refresh(true);
                continue;
            }
            for(let i = 0; i < num_; i++){
                count = count + 1;
                console.log("开始阅读文章" + count + ":" + w1[i].text());                
                // @ts-ignore
                w1[i].parent().parent().parent().click();//点击文章
                if(count == 6){
                    //第6篇文章时，增加阅读时间每篇60秒，共360秒                    
                    let time_num = 360+random(3, 20);
                    let rest_num = 0;//用于计数，与随机数相等时，相等时向上滑动
                    let random_num_if = random(5,12);//随机5-12之间的数字
                    for(let j = 0; j<time_num; j++){
                        console.clear();
                        console.info("已阅读时间"+j+"秒,总阅读时长"+time_num+"秒");
                        sleep(1000);
                        //以下用于随机
                        rest_num = rest_num + 1;
                        if(rest_num == random_num_if){
                            滑动(true);
                            random_num_if = random(5,12);//随机5-12之间的数字
                            rest_num = 0;
                        }
                    }   
                    back();//返回
                    console.log("阅读结束！");
                    sleep(随机等待(2));
                }
                else{
                    sleep(随机等待(10));
                    back();//返回
                    sleep(随机等待(2));
                }
            }
            refresh(true);
            sleep(随机等待(2));
        }
        console.log("读取更多文章，开始上滑");
        //阅读第一篇文章
        refresh(true);
        
        // @ts-ignore
        console.log(w1.length);
    }
}



//className("android.view.ViewGroup").depth(15).findOnce(2).child(5).click(); 
//console.log(className("android.view.ViewGroup").depth(15).findOnce(2).child(5).child(0).text());
function 随机等待(time) {
    return time*1000 + random(300, 3000);
}

/**
 * 刷新页面
 * @param {boolean} orientation 方向标识 true表示从下至上 false表示从上至下
 */
function refresh(orientation) {
    if (orientation)
        swipe(device.width / 2, (device.height * 13) / 15,
            device.width / 2, (device.height * 2) / 15,
            500);
    else
        swipe(device.width / 2, (device.height * 6) / 15,
            device.width / 2, (device.height * 12) / 15,
            500);
    sleep(随机等待(0.5));
}

/**
 * 刷新页面
 * @param {boolean} orientation 方向标识 true表示从下至上 false表示从上至下
 */
function 滑动(orientation) {
    if (orientation)
        swipe(device.width / 2, (device.height * 13) / 15,
            device.width / 2, (device.height * 12) / 15,
            500);
    else
        swipe(device.width / 2, (device.height * 10) / 15,
            device.width / 2, (device.height * 12) / 15,
            500);    
}
function 关闭程序(app_name){
    let app_pack = getPackageName(app_name);
    if(app_pack == null){return false;};//如果没有该应用，则直接退出
    console.log("应用名称："+app_pack);
    app.openAppSetting(app_pack);//打开当前应用设置
    text(app.getAppName(app_pack)).waitFor();  //等待当前应用设置页面是否出现
    let is_sure = textMatches(/(.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) { //判断按钮能否点击，能表示程序正在运行
        //开始结束程序
        sleep(1500)
        let qz = textMatches(/(.*停.*|.*结.*|.*行.*)/).clickable(true).findOne(2000);
        if(qz!=null){
            //console.log(qz.bounds());
            qz.click();
            qz=null;
            }
        else{
            console.error("代码01，结束程序失败");
            return false;
            }
        qz = textMatches(/(.*停.*|.*确.*|.*定.*)/).clickable(true).findOne(2000);
        if(qz!=null){
            //console.log(qz.bounds());
            qz.click();
            console.info(app.getAppName(app_pack) + "应用已被关闭");
            sleep(1000);
            }
        else{
            console.error("代码02，结束程序失败");
            return false;
            }
        
        //back();
        }
    else{
        log(app.getAppName(app_pack) + "应用不能被正常关闭或不在后台运行");
        //back();
        }
    }

关闭程序("学习强国");
sleep(随机等待(3));
//启动学习强国
launchApp("学习强国");
sleep(随机等待(5));
视频播放();
播放电台();
阅读文章();
console.log("程序结束,5秒后关闭。");
let loopCount = 5;
for (let i = loopCount; i > 0; i--) {
    sleep(1000);
    console.log(i);
}
