/**  
 * @param {String} name  
 */  
function Aninmal(name) {}   
Aninmal.prototype =    
{   
    /**  
     * eat amount food  
     * @param {Number} amount  
     */  
    _eat: function(amount) {},   
  
    /**  
     * @param {String} message  
     */    
    _say: function(message) {}   
}   
  
/**  
 * @extends {Aninmal} 加上这句，Aptana就知道继承 Aninmal 的属性和方法  
 * @param {Object} name  
 */  
function Cat(name) {}   
Cat.prototype =    
{   
    /**  
     * @param {Number} amount  
     * @param {Boolean} isNotify  
     */  
    _eat: function(amount, isNotify) {}   
}   
  
Ext.Class.extend(Cat, Aninmal, {});  // 伪代码，可以参考 Ext.extend，实现子类对父类的继承   
  
var obj = new Cat("");   
// 对 obj 就可以用上代码提示了 
//obj.