
export default function Map  (origin_x, origin_y , x_axis_x, x_axis_y, m_ratio, n_ratio) {
    
    const theta =  Math.atan((x_axis_y - origin_y) / (x_axis_x - origin_x + 0.000000001))
    const m = Math.sqrt(Math.pow((origin_x - x_axis_x), 2) + Math.pow((origin_y - x_axis_y), 2)) * m_ratio
    const n = Math.sqrt(Math.pow((origin_x - x_axis_x), 2) + Math.pow((origin_y - x_axis_y), 2)) * n_ratio
    var x_val = origin_x + m * Math.cos(theta) + n * Math.sin(theta)
    
    if(origin_x - x_axis_x > 0){
        x_val = origin_x - m * Math.cos(theta) - n * Math.sin(theta)
    }
    
    var y_val = origin_y + m * Math.sin(theta) - n * Math.cos(theta)
    
    if(origin_x - x_axis_x > 0){
        y_val = origin_y - m * Math.sin(theta) + n * Math.cos(theta)
    }

    return {
        x : x_val,
        y : y_val
    }

    
}