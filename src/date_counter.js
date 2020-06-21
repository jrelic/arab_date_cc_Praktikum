function get_months(year){
    let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)){
        months[1] = 29
    }    

    return months
}

function dayOfYear(year, month, day) {//sva 3 argumenta su cijeli brojevi
    let months = get_months(year)
    let result = 0

    for(let i = 0; i < month - 1; i++){
        result += months[i]
    }

    result += day

    return result
}

module.exports = dayOfYear;