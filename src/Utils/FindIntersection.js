const FindIntersection = (A, B, C, D) => {
    var a1 = B.y - A.y;
    var b1 = A.x - B.x;
    var c1 = a1*(A.x) + b1*(A.y);
       
    var a2 = D.y - C.y;
    var b2 = C.x - D.x;
    var c2 = a2*(C.x)+ b2*(C.y);
       
    var determinant = a1*b2 - a2*b1;
       
    if (determinant === 0)
    {
        return {x: -1, y: -1}
    }
    else
    {
        var x = (b2 * c1 - b1 * c2) / determinant;
        var y = (a1 * c2 - a2 * c1) / determinant;
        return {x: x, y: y};
    }
}

export default FindIntersection