/*
    U svijetu postoje 4 baze u koje se upisuju podaci o ulasku
    nebeskih tijela u naš sunčev sustav. Podaci od kojih se sastoje baze su:
    - dur: (duration of the meteor)
    - H1: beginning height
    - H2: terminal height
    - Q : (observed trajectory angle)
    - lat: (observatory latitude)
    - lng: (observatory longitude)
    - date: (date of observation)
    - month: (month of observation)
    - year: (year of observation)
    - time:  (hh:mm:ss of observation)

    No baze nemaju sve iste podatke, već su one strukturirane kako slijedi:
    * EU data * dur, Q, H1, time, date, month, year, lat, lng
    * US data * H1, H2, date, month, year, lat, lng, dur, Q
    * JP data * year, month, date, time, dur, lat, lng, dur, Q
    * SA data * Q, H1, H2, dur, time, date, month, year, lat, lng
    Potrebno je implementirati funkciju koja za svaku bazu 
    pojedinačno pronalazi top 3 dana u godini 
    u kojima se pojavljuju komete za zadanu godinu
    za svaku od data
*/

//dur, Q, H1, time, date, month, year, lat, lng
const eu_db = [
	[1, 30, 20000, "12:13:54", 7, 6, 2019, 34, 44],
    [2, 40, 15000, "19:10:50", 5, 3, 2019, 31, 45],
    [3, 50, 24000, "20:11:50", 12, 4, 2018, 32, 45],
    [2, 40, 9000, "18:10:50", 8, 8, 2019, 31, 43],
    [6, 60, 10000, "19:30:01", 21, 6, 2018, 33, 44],
    [2, 40, 15000, "19:10:50", 5, 3, 2018, 31, 45]
];
//H1, H2, date, month, year, lat, lng, dur, Q
const us_db = [
	[2000, 100, 4, 4, 2019, 41, 45, 10, 45],
    [4200, 103, 3, 4, 2018, 34, 27, 4, 76],
    [3200, 93, 14, 8, 2018, 36, 30, 6, 80],
    [2500, 96, 24, 5, 2019, 40, 35, 11, 60],
    [4000, 100, 10, 7, 2018, 39, 42, 8, 53],
    [3200, 93, 14, 8, 2019, 36, 30, 6, 80]
];
//year, month, date, time, dur, lat, lng, dur, Q
const jp_db = [
    [2019, 3, 5, "19:10:05", 3, 402, 324, 10, 8],
    [2019, 5, 2, "20:15:21", 2, 398, 323, 7, 9],
    [2018, 5, 3, "19:06:50", 2, 400, 315, 12, 10],
    [2019, 2, 1, "21:21:35", 4, 402, 305, 9, 10],
    [2018, 5, 2, "17:23:36", 2, 396, 312, 7, 9],
    [2018, 7, 1, "20:15:21", 2, 398, 323, 7, 9]
];
//Q, H1, H2, dur, time, date, month, year, lat, lng
const sa_db = [
    [10, 31, 30, 63, "20:19:25", 5, 8, 2019, 3451, 3450 ],
    [12, 32, 34, 59, "18:21:50", 2, 9, 2018, 3448, 3446 ],
    [11, 30, 31, 62, "19:10:10", 21, 8, 2018, 3457, 3453 ],
    [11, 32, 34, 62, "19:15:15", 3, 9, 2019, 3456, 3451 ],
    [12, 29, 33, 61, "20:30:05", 4, 9, 2018, 3440, 3445 ],
    [13, 29, 34, 64, "21:20:30", 1, 6, 2019, 3452, 3441 ]
];

// FORMATIRANJE //
function format_eu(data){
    return data.map((element) =>{
        return {
            date: parseFloat(`${element[4]}.${element[5]}`),
            year: element[6],
            params: element
        }
    })
}
function format_us(data){
    return data.map((element) =>{
        return {
            date: parseFloat(`${element[2]}.${element[3]}`),
            year: element[4],
            params: element
        }
    })
}
function format_jp(data){
    return data.map((element) =>{
        return {
            date: parseFloat(`${element[2]}.${element[1]}`),
            year: element[0],
            params: element
        }
    })
}
function format_sa(data){
    return data.map((element) =>{
        return {
            date: parseFloat(`${element[5]}.${element[6]}`),
            year: element[7],
            params: element
        }
    })
}


function sort_databases(filtered_dbs){
    let sorted_db = Object.keys(filtered_dbs).map((element) =>{
        return {
            date: element, 
            num: filtered_dbs[element]
        }
    })
    
    sorted_db = sorted_db.sort((a, b) =>{
        return b.num.length - a.num.length
    })
    
    sorted_db = sorted_db.map((el) =>{
        return el.date
    })

    return sorted_db.splice(0, 3)
}

function reduce_data(result, {date, params}){
    (result[date] = (result[date] || [])).push(params)
    return result
}
function filter_database(databases, filter_Year){
    let temp = databases.filter(({year}) => { return year === filter_Year })
    return temp.reduce(reduce_data, {})
}

function get_top_data(databases, year){
    let filter = filter_database(databases, year)
    return sort_databases(filter)
}


function analyse_dbs(databases, year){
    function reduce_dbs(result, cur){
        result[cur] = get_top_data(databases[cur], year);
        return result;
    }

    return Object.keys(databases).reduce(reduce_dbs, {})
}
    
function findMaxCommets(eu_db, us_db, jp_db, sa_db, year) {    
    let formated_dbs = {
        "us": format_us(us_db),
        "eu": format_eu(eu_db),
        "jp": format_jp(jp_db),
        "sa": format_sa(sa_db)
    }

    return analyse_dbs(formated_dbs, year);
}

let top_18 = findMaxCommets(eu_db, us_db, jp_db, sa_db, 2018)
let top_19 = findMaxCommets(eu_db, us_db, jp_db, sa_db, 2019)

console.log("Top Data for 2018:\n", top_18)
console.log("Top Data for 2019:\n", top_19)