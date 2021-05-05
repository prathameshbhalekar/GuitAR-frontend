
const Plot = (origin_x, origin_y , x_axis_x, x_axis_y, x_val, y_val) => {

    const theta =  Math.atan((x_axis_y - origin_y) / (x_axis_x - origin_x + 0.000000001))

    let a , b;
    if(origin_x - x_axis_x > 0){
        a = origin_x - x_val
        b = origin_y - y_val        
    } else {
        a = x_val - origin_x
        b = y_val - origin_y
    }

    const sin = Math.sin(theta)
    const cos = Math.cos(theta)

    const m = a * cos - b * sin
    const n = a * sin - b * cos

    const len =Math.sqrt((Math.pow((origin_x - x_axis_x), 2) + Math.pow((origin_y - x_axis_y), 2)))

    return {
        m_ratio : m / len,
        n_ratio : n / len
    }
}

export default Plot