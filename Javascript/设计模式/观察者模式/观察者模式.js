// 观察者
var observer = {
    // 订阅集合
    subscribes: [],

    // 订阅
    subscribe: function(type, fn) {
        if (!this.subscribes[type]) {
            this.subscribes[type] = [];
        }
        this.subscribes[type].push(fn);      // 订阅的消息添加进缓存列表
    },

    // 发布
    publish: function() {
        var type = [].shift.call(arguments),
            fns = this.subscribes[type];
        
        if (!fns || fns.length === 0 ) {     // 如果没有绑定对应的消息
            return;
        }
        
        for (var i = 0, fn; fn = fns[ i++ ]; ) {
            fn.apply(this, arguments);       // arguments 是发布时携带的信息参数
        }
    },
    
    // 删除订阅
    remove: function(type, fn) {
        var fns = this.subscribes[type];    // 注意fns为引用类型

        if (!fns){     // 如果type对应的消息没有被人订阅，则直接返回
            return;
        }

        if (!fn){           // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
            fns.length = 0  // 清空type对应的消息列表
        }else{
            for (var i = 0; i < fns.length; i++) {
                if (fns[i] === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    }
};

// 订阅岗位列表
function jobListForA(jobs) {
    console.log('A', jobs);
}

function jobListForB(jobs) {
    console.log('B', jobs);
}

observer.subscribe('job', jobListForA);     // A订阅

observer.subscribe('job', jobListForB);     // B订阅


observer.publish('job', ['前端', '后端', '测试']); // 发布岗位

// A取消订阅岗位
console.log('A取消订阅');
observer.remove('job', jobListForA);

observer.publish('job', ['前端', '后端', '测试']);

// 取消所有岗位订阅
console.log('取消所有岗位订阅');
observer.remove('job');

observer.publish('job', ['前端', '后端', '测试']);