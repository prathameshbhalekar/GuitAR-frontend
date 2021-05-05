const CheckParallel = (corners) => {
    const len1 = Math.pow(corners[0].x - corners[1].x, 2) + Math.pow(corners[0].y - corners[1].y, 2)
    const len2 = Math.pow(corners[1].x - corners[2].x, 2) + Math.pow(corners[1].y - corners[2].y, 2)
    
    return Math.abs((len1 - len2)) < 500
}

export default CheckParallel