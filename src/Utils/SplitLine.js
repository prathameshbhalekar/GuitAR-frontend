const SplitLine =  (pt1, pt2, n) => {
    var ans = []
    n--;
    for(var i = 0; i <= n; i ++){
        var x = (pt1.x * (n - i)  + pt2.x * i) / n
        var y = (pt1.y * (n - i)  + pt2.y * i) / n
        ans.push({
            x : x,
            y : y
        })
    }
    return ans
}

export default SplitLine