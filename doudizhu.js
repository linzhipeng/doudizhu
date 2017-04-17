var Card = function () {
    // 约定：
    // 扑克牌54张，分别包含普通牌52张：A、2-10、J、Q、K （以上每种牌4个花色）小王大王：Swang、Bwang
    // 普通牌4种花色：黑桃、梅花、红心、方块，分别对应花色id 0-3，用于手牌花色排序，小王大王的花色是Swang、Bwang
    // id从0-53，按照每张牌4种花色排序，如：黑桃A、梅花A、红心A、方块A、黑桃2....

    // 获取牌的点数 2-10 A Q K Swang Bwang
    this.getPoint = function (id) {
        id = parseInt(id)
        var point = Math.ceil(id / 4)

        if (id >= 0 && id <= 51) {
            if (point >= 0 && point <= 1) {
                return 'A'
            } else if (point >= 2 && point <= 10) {
                return point.toString()
            } else {
                switch (point) {
                    case 11:
                        return 'J'
                        break
                    case 12:
                        return 'Q'
                        break
                    case 13:
                        return 'K'
                        break
                    default:
                        throw '牌id不合法'
                }
            }
        } else if (id === 52) {
            return 'Swang'
        } else if (id === 53) {
            return 'Bwang'
        } else {
            throw '牌id不合法'
        }
    }
    // 获取牌的花色 0-3
    this.getSuits = function (id) {
        id = parseInt(id)
        var suits = Math.ceil(id % 4)

        if (id >= 0 && id <= 51) {
            return suits.toString()
        } else if (id === 52) {
            return 'Swang'
        } else if (id === 53) {
            return 'Bwang'
        } else {
            throw '牌id不合法'
        }
    }
    // 获取牌权重 1-15
    this.getWeight = function (id) {
        id = parseInt(id)

        if (id >= 0 && id <= 7) {
            return Math.ceil((id + 1) / 4) + 11
        } else if (id >= 8 && id <= 51) {
            return Math.ceil((id + 1) / 4) - 2
        } else if (id == 52) {
            return 14
        } else if (id == 53) {
            return 15
        } else {
            throw '牌id不合法'
        }
    }
}

var doudizhu = function () {
    // ================  私有  ==================
    var cardsArr = new Array()

    // 扑克牌排序（快速排序）
    var cardsSort = function (arr) {
        // 直接对整副牌进行排序时报错，防止造成变量污染
        if (arr === cardsArr) {
            throw '请勿直接对整副牌进行排序，防止造成变量污染'
        }
        quick(arr, 0, arr.length - 1)
        return arr
        
        // 切割数组
        function quick (arrCut, left, right) {
            if (arrCut.length > 1) {
                var index = partition(arrCut, left, right)

                if (left < index - 1) {
                    quick(arrCut, left, index - 1)
                }

                if (index < right) {
                    quick(arrCut, index, right)
                }
            }
        }
        // 排序数组
        function partition (arrSort, leftSort, rightSort) {
            var pivot = arrSort[Math.floor((leftSort + rightSort) / 2)]

            while (leftSort <= rightSort) {
                while (arrSort[leftSort] < pivot) {
                    leftSort++
                }

                while (arrSort[rightSort] > pivot) {
                    rightSort--
                }

                if (leftSort <= rightSort) {
                    var aux = arrSort[leftSort]
                    arrSort[leftSort] = arrSort[rightSort]
                    arrSort[rightSort] = aux

                    leftSort++
                    rightSort--
                }
            }
            return leftSort
        }
    }

    // ================  公有  ==================
    // 获取当前的扑克牌id数组
    this.getCards = function () {
        return cardsArr
    }

    // 单张牌对象
    this.cardInfo = new Card()

    // 洗牌算法，返回乱序的扑克id数组
    this.getShuffleCards = function () {
        var i = 1
        cardsArr = []

        cardsArr[0] = 0
        while (i <= 53) {
            var rnd = Math.floor(Math.random() * (i + 1))
            cardsArr[i] = cardsArr[rnd]
            cardsArr[rnd] = i
            i++
        }
        return true
    }

    // 快速排序方法
    this.sort = function (arr) {
        return cardsSort(arr)
    }

    // 发牌，返回一个对象记录发牌情况，分别是：3组17张的随机牌、1组3张的地主牌
    // 为使牌更加随机，三人轮流发牌，剩下3张为地主牌
    this.dealCards = function () {
        var player1 = new Array()
        var player2 = new Array()
        var player3 = new Array()
        var leaveCards = new Array()
        cardsArr.forEach(function(card, index) {
            if (index <= 50) {
                switch (index % 3) {
                    case 0:
                        player1.push(card)
                        break;
                    case 1:
                        player2.push(card)
                        break;
                    default:
                        player3.push(card)
                        break;
                }
            } else {
                leaveCards.push(card)
            }
        });
        return {
            'player1': player1,
            'player2': player2,
            'player3': player3,
            'leaveCards': leaveCards
        }
    }

    // 出牌类型判断，接收出牌的id数组
    // 返回一个对象，用来表示：
    // 牌类型（DAN_TIAO, DUI_ZI, SAN_TIAO, SAN_DAI_YI, SAN_DAI_YI_DUI, SI_DAI_SHAUNG_DAN, FEI_JI_DAI_SHUANG_DAN, SI_TIAO_DAI_SHUANG_DUI, FEI_JI_DAI_SHUANG_DUI, DAN_SHUN_ZI, SAN_SHUN_ZI, SHUANG_SHUN_ZI, ZHA_DAN, WANG_ZHA）
    // 牌类型权重（1-3）
    // 当前组合牌权重（最小权重为 1）
    this.getCardType = function (arr) {
        // 字典存储牌信息
        function Dictionary () {
            var items = {}
            // 检查字典是否存在该key
            this.has = function (key) {
                return key in items
            }
            // 为字典添加一个新值
            this.set = function (key, value) {
                items[key] = value
            }
            // 移除字典中某一个元素
            this.remove = function (key) {
                if (this.has(key)) {
                    delete items[key]
                    return true
                }
                return false
            }
            // 获取指定key的值
            this.get = function (key) {
                return this.has(key) ? items[key] : undefined
            }
            // 清除字典
            this.clear = function () {
                items = {}
            }
            // 获取字典对象
            this.getDictionaryItems = function () {
                return items
            }
        }
        // 牌数组长度
        var arrLength = arr.length
        // 出牌数限制
        if (arrLength <= 0 || arrLength >= 17) {
            return false
        }
        // 过滤掉重复id、非正整数id、大于53的id
        var arr1 = arr.filter(function (id, index, self) {
            return (self.indexOf(id) === index && Math.abs(parseInt(id)) === id && index <= 53)
        })
        // 过滤完毕，若数组长度有变，则说明数组不合法
        if (arr1.length !== arrLength) {
            return false
        }
        // 定义变量
        var dictionary = new Dictionary(),
            cardType, cardTypeWeight, groupCardsWeight
        // 将牌数组的id装换成单张牌对应的牌权重，并通过 字典 存储该权重牌的张数
        arr.forEach(function (card, index) {
            var cardWeight = this.cardInfo.getWeight(card)
            arr[index] = cardWeight
            if (dictionary.has(cardWeight)) {
                dictionary.set(cardWeight, dictionary.get(cardWeight) + 1)
            } else {
                dictionary.set(cardWeight, 1)
            }
        }, this)
        // 对牌权重数组进行排序
        arr = this.sort(arr)
        console.log(arr)
        // 字典所存的牌对象
        var dictionaryItems = dictionary.getDictionaryItems()
        // 计算最多牌数最多的同权重牌
        var cardMaxNum = 0, // 同权重牌最多张的有几张
            muchCardWeight // 最多牌的牌权重数

        for (var card in dictionaryItems) {
            if (dictionaryItems[card] > cardMaxNum) {
                cardMaxNum = dictionaryItems[card]
                muchCardWeight = card
            }
        }
        switch (cardMaxNum) {
            case 1: // 单条（1）、王炸（2）、单顺子（5-12）
                if (arrLength === 1) {
                    return { // 单条
                        cardType: 'DAN_TIAO',
                        cardTypeWeight: 1,
                        groupCardsWeight: arr[0]
                    }
                } else if (arr[0] === 14 && arr[1] === 15) {
                    return { // 王炸
                        cardType: 'WANG_ZHA',
                        cardTypeWeight: 3,
                        groupCardsWeight: 1
                    }
                } else if (arrLength >= 5 && arrLength <= 12) {
                    // 顺子最大只能到A
                    if (arr[arrLength - 1] <= 12) {
                        // 最大权重减最小权重加1 等于数组长度，则为单顺子
                        if (arr[arrLength - 1] - arr[0] + 1 === arrLength) {
                            return { // 单顺子
                                cardType: 'DAN_SHUN_ZI',
                                cardTypeWeight: 1,
                                groupCardsWeight: arr[0]
                            }
                        }
                        return false
                    }
                    return false
                } else {
                    return false
                }
                break
            case 2: // 对子（2）、双顺子（6-16）
                if (arrLength === 2) {
                    if (arr[0] === arr[1]) {
                        return { // 对子
                            cardType: 'DUI_ZI',
                            cardTypeWeight: 1,
                            groupCardsWeight: arr[0]
                        }
                    } else {
                        return false
                    }
                } else if (arrLength >= 6 && arrLength <= 16 && arrLength % 2 === 0) {
                    // 判断数组去重后是否为顺子（至少3张顺子）
                    var simpleArr = arr.filter(function (value, index, self) {
                        return self.indexOf(value) === index
                    })
                    if (simpleArr.length * 2 !== arrLength) {
                        return false
                    }
                    // 顺子最大只能到A
                    if (arr[arrLength - 1] <= 12) {
                        if (simpleArr[simpleArr.length - 1] - simpleArr[0] + 1 === simpleArr.length) {
                            return { // 双顺子
                                cardType: 'SHUANG_SHUN_ZI',
                                cardTypeWeight: 1,
                                groupCardsWeight: simpleArr[0]
                            }
                        }
                        return false
                    }
                    return false
                }
                return false
                
            case 3: // 三条（3）、三带一（4）、三带一对（5）、飞机带翅膀（8-16）、三顺（6-15）
                break
            case 4: // 炸弹（4）、四条带双单（6）、四条带双对（8）
                break
            default:
                break
        }
    }
}