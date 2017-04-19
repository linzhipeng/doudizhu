# doudizhu

瞎猫的JavaScript 斗地主算法封装

## 起步 Start

```javascript
var douzizhu = require('doudizhu')
```

## 文档 Doc

### 洗牌

记录并返回1副乱序id的扑克牌数组

```javascript
doudizhu.getShuffleCards()
/*
[ 15,  43,  49,  21,  51,  40,  23,  14,  25,  5,  4,  44,  3,  32,  53,  11,  41,  27,  7,  18,  38,  28,  8,  31,  17,  36,  42,  26,  47,  45,  22,  12,  34,  16,  2,  9,  1,  35,  52,  10,  20,  30,  29,  46,  13,  0,  6,  39,  48,  24,  19,  37,  33,  50 ]
*/
```

### 查看当前洗完的扑克牌

返回上次洗牌完成后的1副扑克牌数组（未洗过牌则为空数组）

```javascript
doudizhu.getCards()
/*
[ 15,  43,  49,  21,  51,  40,  23,  14,  25,  5,  4,  44,  3,  32,  53,  11,  41,  27,  7,  18,  38,  28,  8,  31,  17,  36,  42,  26,  47,  45,  22,  12,  34,  16,  2,  9,  1,  35,  52,  10,  20,  30,  29,  46,  13,  0,  6,  39,  48,  24,  19,  37,  33,  50 ]
*/
```

### 发牌

返回1个对象记录4组牌：3组17张的随机牌、1组3张的地主牌

```javascript
doudizhu.dealCards()
/*
{
    player1: [ 15, 21, 23, 5, 3, 11, 7, 28, 17, 26, 22, 16, 1, 10, 29, 0, 48 ],
    player2: [ 43, 51, 14, 4, 32, 41, 18, 8, 36, 47, 12, 2, 35, 20, 46, 6, 24 ],
    player3: [ 49, 40, 25, 44, 53, 27, 38, 31, 42, 45, 34, 9, 52, 30, 13, 39, 19 ],
    leaveCards: [ 37, 33, 50 ]
}
*/
```

### 获取扑克牌组的类型及权重信息
接收1个扑克牌id数组（可乱序），返回1个牌信息对象
如果出牌不合规则则返回 `false`

```javascript
doudizhu.getCardType([8,12,16,20,24])
/*
{
    cardType: 'DAN_SHUN_ZI', // 牌型别名
    cardTypeWeight: 1, //牌类型权重
    groupCardsWeight: 1 // 当前扑克牌组权重
}
*/
```

### 压牌

接收2个扑克牌id数组（可乱序），返回两个牌的比较结果
若第二组牌可压第一组则返回 `true`
不可压或者牌不合法则返回 `false`

```javascript
doudizhu.beat([8,12,16,20,24], [12,16,20,24,28])
/*
true
*/
```

### 排序

对给定的数组进行排序，按照从小到大，返回排序后的数组

不限制数组元素大小，不限制数组元素不重复

注意：此排序为直接影响修改原数组

不可直接对当前的整副扑克牌数组对象进行排序，防止造成变量污染，故对此行为进行了异常抛出处理

```javascript
doudizhu.sort([34, 6, 2, 8, 22])
/*
[ 2, 6, 8, 22, 22, 34 ]
*/
```

## 牌型  Type

| 牌型 | 别名 | 权重 | 示例 |
| -------- | -------- | -------- | -------- |
| 单条     | DAN_TIAO |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)     
| 单顺子     | DAN_SHUN_ZI |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581115277.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581128313.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581137991.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581145681.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581155069.jpg)
| 王炸     | WANG_ZHA |  3   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580967977.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580975868.jpg)
| -- | -- | -- | -- |
| 对子     | DUI_ZI |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)  
| 双顺子     | SHUANG_SHUN_ZI |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581115277.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581340484.jpg) ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581128313.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581411169.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581137991.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581421177.jpg)
| -- | -- | -- | -- |
| 三条     | SAN_TIAO |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580721229.jpg)   |
| 三带一     | SAN_DAI_YI |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580721229.jpg) ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580812965.jpg) 
| 三带一对     | SAN_DAI_YI_DUI |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580721229.jpg) ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580812965.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581411169.jpg) 
| 三顺子     | SAN_SHUN_ZI |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581115277.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581340484.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581683934.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581128313.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581411169.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581723014.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581137991.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581421177.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581733711.jpg)
| 飞机带单     | FEI_JI_DAI_DAN |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581115277.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581340484.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581683934.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581128313.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581411169.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581723014.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581137991.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581421177.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581733711.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581145681.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581155069.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)     
| 飞机带对     | FEI_JI_DAI_DUI |  1   | ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581115277.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581340484.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581683934.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581128313.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581411169.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581723014.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492582048939.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492582055544.jpg)
| -- | -- | -- | -- |
| 炸弹     | ZHA_DAN |  2   |  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580721229.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580914847.jpg)   
| 四带双单     | SI_DAI_SHUANG_DAN |  1   |  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580721229.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580914847.jpg)   ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581155069.jpg)    ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581128313.jpg)
| 四带双对     | SI_DAI_SHUANG_DUI |  1   |  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580151581.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580673196.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580721229.jpg)![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492580914847.jpg)    ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581115277.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581340484.jpg)    ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581421177.jpg)  ![](http://api.blindcat.cn/static/article-image/58b9a1bd42b9792daaa1fd04/article-1492581733711.jpg)
