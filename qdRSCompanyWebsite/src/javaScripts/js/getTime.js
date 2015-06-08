/**
 * Created by Administrator on 2015/6/8.
 */
function getCreateTime(){
    var day = new Date();
    var month = day.getMonth()+1;
    var createdTime = day.getFullYear() + '-' +month+'-'+day.getDate()+' '+day.getHours()+':'+day.getMinutes()+':'+day.getSeconds();
    return createdTime;
}