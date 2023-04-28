// 显示控制台
if (SHOW_CONSOLE) {
    console.show();
    sleep(300);
    // 修改控制台位置
    console.setPosition(0, 100);
    // 修改控制台大小
    console.setSize(device.width, device.height / 4);
}

// 在控制台输出 Hello Hamibot
toastLog("Hat");