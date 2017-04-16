var doudizhu = function () {}

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
                        return '牌id不合法'
                }
            }
        } else if (id === 52) {
            return 'Swang'
        } else if (id === 53) {
            return 'Bwang'
        } else {
            return '牌id不合法'
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
            return '牌id不合法'
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
            return '牌id不合法'
        }
    }
}

var cardInfo = new Card()

doudizhu.prototype = {
    cardInfo: cardInfo,
    // 洗牌算法，返回乱序的扑克id数组
    getShuffleCardsId: function () {
        var arr = new Array(),
            i = 1

        arr[0] = 0
        while (i <= 53) {
            var rnd = Math.floor(Math.random() * (i + 1))
            arr[i] = arr[rnd]
            arr[rnd] = i
            i++
        }
        return arr
    }
}