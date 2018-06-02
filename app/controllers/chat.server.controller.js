'use strict';

module.exports = (io, socket) => {
    // 通过io.emit()方法向所有已连接的socket客户端发出新用户加入的通知 该事件是由通过触发chatMessage事件来完成的 
    // 然后向其中传入了一个对象 该对象包括了 用户信息 消息体 事件类型
    // 在socket的配置中 已经实现了对用户身份的验证 因此通过socket.request.user即可获取用户信息
    io.emit('chatMessage', {
        type: 'status',
        text: 'conneted',
        created: Date.now(),
        username: socket.request.user.username
    });

    socket.on('chatMessage', message => {
        // 该函数负责处理由socket客户端发过来的消息
        // 事件处理程序接收到来自客户端的消息后，会添加消息类型，用户信息 
        // 然后再通过io.emit()方法发送给所有已连接到服务器的socket客户端
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        io.emit('chatMessage', message);
    });

    socket.on('disconnect', message => {
        // 该程序负责处理系统事件disconnect
        // 当某个用户与服务器之间断开连接之后
        // 该事件处理程序便会通过io.emit()方法通知所有已连接的客户端
        // 这便可以在聊天界面中显示出有人断开连接的信息
        io.emit('chatMessage', {
            type: 'status',
            text: 'conneted',
            created: Date.now(),
            username: socket.request.user.username
        });
    });


};