const Song = (s) => {
    const LYRICS = 'LYRICS'
    const TAB = 'TAB'
    
    const list = []

    const getNext = (pos) => {
        pos += 5;
        var tab = ""
        var n = s.length;
        while(pos < n){
            if(s.charAt(pos) === '<')
                break;
            tab += s.charAt(pos)
            pos++;
        }
        return {
            pos : pos + 5,
            tab : tab
        }
    }

    var text = ""
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if(c === '<'){
            if(text !=="")
                list.push({
                    data: text,
                    type: LYRICS
                })
            var tab;
            var res = getNext(i);
            tab = res.tab
            i = res.pos
            text = ""
            list.push({
                type: TAB,
                data: tab
            })
        } else
            text += s.charAt(i)
    }

    if(text !== '')
        list.push({
            type:LYRICS,
            data:text
        })
    return list

}

export default Song