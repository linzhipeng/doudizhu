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
    // 牌类型（DAN_TIAO, DUI_ZI, SAN_TIAO, SAN_DAI_YI, SAN_DAI_YI_DUI, SI_DAI_SHAUNG_DAN, FEI_JI_DAI_SHUANG_DAN, SI_TIAO_DAI_SHUANG_DUI, FEI_JI_DAI_SHUANG_DUI, DAN_SHUN, SAN_SHUN, SHUANG_SHUN, ZHA_DAN, WANG_ZHA）
    // 牌类型权重（1-3）
    // 当前组合牌权重（最小权重为 1）
    this.getCardType = function (arr) {

        var arrLength = arr.length,
            cardType, cardTypeWeight, groupCardsWeight

        // 出牌数限制
        if (arrLength <= 0 || arrLength >= 17) {
            return false
        }
        // 过滤掉非正整数id、重复id
        var arr1 = arr.filter(function (id, index, self) {
            return (self.indexOf(id) === index && Math.abs(parseInt(id)) === id)
        })
        if (arr1.length !== arrLength) {
            return false
        }
        
        // 对牌进行排序
        arr = this.sort(arr)

        if (arrLength <= 4) {
            switch (arrLength) {
                case 1:
                    return { // 单条
                        cardType: 'DAN_TIAO',
                        cardTypeWeight: 1,
                        groupCardsWeight: this.cardInfo.getWeight(arr[0])
                    }
                    break
                case 2:
                    if (arr[0] === 52 && arr[1] === 53) {
                        return { // 王炸
                            cardType: 'WANG_ZHA',
                            cardTypeWeight: 3,
                            groupCardsWeight: 1
                        }
                    } else if (this.cardInfo.getWeight(arr[0]) === this.cardInfo.getWeight(arr[1])) {
                        return { // 对子
                            cardType: 'DUI_ZI',
                            cardTypeWeight: 1,
                            groupCardsWeight: this.cardInfo.getWeight(arr[0])
                        }
                    } else {
                        return false
                    }
                    break
                // 三条
                case 3:
                    cardType = 'SAN_TIAO'
                    break
                // 三带一、炸弹
                case 4:
                    break
            }
        }
    }
}